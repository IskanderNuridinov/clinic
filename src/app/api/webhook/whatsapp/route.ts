import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAIReply } from "@/lib/claude";
import { sendWAHAMessage } from "@/lib/waha";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // WAHA sends { event, session, payload }
    if (body.event !== "message") return NextResponse.json({ ok: true });

    const msg = body.payload;
    if (!msg || msg.fromMe || msg.hasMedia) return NextResponse.json({ ok: true });

    const chatId: string = msg.from; // "77001234567@c.us"
    const text: string = msg.body || "";
    if (!text.trim()) return NextResponse.json({ ok: true });

    const phone = chatId.replace("@c.us", "");

    const supabase = await createSupabaseServerClient();

    // Upsert conversation
    const { data: conv } = await supabase
      .from("conversations")
      .upsert(
        { channel: "whatsapp", contact_id: phone, last_message: text, updated_at: new Date().toISOString() },
        { onConflict: "channel,contact_id" }
      )
      .select("id")
      .single();

    if (conv?.id) {
      await supabase.from("messages").insert({ conversation_id: conv.id, direction: "in", body: text });

      const reply = await getAIReply(text);
      await sendWAHAMessage(chatId, reply);

      await supabase.from("messages").insert({ conversation_id: conv.id, direction: "out", body: reply });
      await supabase.from("conversations").update({ last_message: reply, updated_at: new Date().toISOString() }).eq("id", conv.id);
    }
  } catch (err) {
    console.error("WAHA webhook error:", err);
  }

  return NextResponse.json({ ok: true });
}
