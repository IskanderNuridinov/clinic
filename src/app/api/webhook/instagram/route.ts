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
    const messaging = body?.entry?.[0]?.messaging;
    if (!messaging?.length) return new Response("ok", { status: 200 });

    const event = messaging[0];
    const senderId: string = event.sender?.id;
    const text: string = event.message?.text ?? "";

    // Skip our own messages and empty texts
    if (!text || senderId === process.env.META_INSTAGRAM_PAGE_ID) {
      return new Response("ok", { status: 200 });
    }

    const supabase = await createSupabaseServerClient();

    const { data: conv } = await supabase
      .from("conversations")
      .upsert({ channel: "instagram", contact_id: senderId, last_message: text, updated_at: new Date().toISOString() }, { onConflict: "channel,contact_id" })
      .select()
      .single();

    if (conv) {
      await supabase.from("messages").insert({ conversation_id: conv.id, direction: "in", body: text });
    }

    const aiReply = await getAIReply(text);

    await fetch(`https://graph.facebook.com/v18.0/${process.env.META_INSTAGRAM_PAGE_ID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.META_INSTAGRAM_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        recipient: { id: senderId },
        message: { text: aiReply },
      }),
    });

    if (conv) {
      await supabase.from("messages").insert({ conversation_id: conv.id, direction: "out", body: aiReply });
      await supabase.from("conversations").update({ last_message: aiReply, updated_at: new Date().toISOString() }).eq("id", conv.id);
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("instagram webhook error", err);
    return new Response("ok", { status: 200 });
  }
}
