import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAIReply } from "@/lib/claude";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body?.entry?.[0]?.changes?.[0]?.value;
    const msgs = entry?.messages;
    if (!msgs?.length) return new Response("ok", { status: 200 });

    const msg = msgs[0];
    const fromPhone: string = msg.from;
    const text: string = msg.text?.body ?? "";
    if (!text) return new Response("ok", { status: 200 });

    const supabase = await createSupabaseServerClient();

    // Upsert conversation
    const { data: conv } = await supabase
      .from("conversations")
      .upsert({ channel: "whatsapp", contact_id: fromPhone, last_message: text, updated_at: new Date().toISOString() }, { onConflict: "channel,contact_id" })
      .select()
      .single();

    if (conv) {
      await supabase.from("messages").insert({ conversation_id: conv.id, direction: "in", body: text });
    }

    const aiReply = await getAIReply(text);

    // Send reply via Meta
    await fetch(`https://graph.facebook.com/v18.0/${process.env.META_WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.META_WHATSAPP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: fromPhone,
        type: "text",
        text: { body: aiReply },
      }),
    });

    if (conv) {
      await supabase.from("messages").insert({ conversation_id: conv.id, direction: "out", body: aiReply });
      await supabase.from("conversations").update({ last_message: aiReply, updated_at: new Date().toISOString() }).eq("id", conv.id);
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("whatsapp webhook error", err);
    return new Response("ok", { status: 200 });
  }
}
