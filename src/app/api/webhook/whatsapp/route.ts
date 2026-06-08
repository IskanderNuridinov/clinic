import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAIReply } from "@/lib/claude";
import { sendWAHAMessage } from "@/lib/waha";
import { transcribeAudio, downloadWAHAMedia } from "@/lib/transcribe";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 2000;

const AUDIO_TYPES = new Set(["ptt", "audio"]);

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (process.env.WAHA_WEBHOOK_SECRET && secret !== process.env.WAHA_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();

    if (body.event !== "message") return NextResponse.json({ ok: true });

    const msg = body.payload;
    if (!msg || msg.fromMe) return NextResponse.json({ ok: true });

    const chatId: string = msg.from;
    let text = "";

    if (msg.hasMedia && AUDIO_TYPES.has(msg.type)) {
      // Voice message — download and transcribe
      const mediaUrl: string | undefined = msg.mediaUrl || msg._data?.mediaUrl;

      if (mediaUrl) {
        const audioBuffer = await downloadWAHAMedia(mediaUrl);
        if (audioBuffer) {
          const mimetype = (msg.mimetype || "audio/ogg").split(";")[0].trim();
          const transcribed = await transcribeAudio(audioBuffer, mimetype);
          if (transcribed) {
            text = transcribed;
          }
        }
      }

      // If transcription failed or no key — ask to type
      if (!text) {
        await sendWAHAMessage(chatId, "Голосовое сообщение получено, но расшифровка недоступна. Пожалуйста, напишите текстом.");
        return NextResponse.json({ ok: true });
      }
    } else if (msg.hasMedia) {
      // Other media (images, documents) — skip
      return NextResponse.json({ ok: true });
    } else {
      text = (msg.body || "").trim();
    }

    if (!text) return NextResponse.json({ ok: true });

    // Truncate to avoid excessive Claude token usage
    text = text.slice(0, MAX_MESSAGE_LENGTH);

    const phone = chatId.replace("@c.us", "");
    const supabase = await createSupabaseServerClient();

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
      await supabase.from("conversations")
        .update({ last_message: reply, updated_at: new Date().toISOString() })
        .eq("id", conv.id);
    }
  } catch (err) {
    console.error("WAHA webhook error:", err);
  }

  return NextResponse.json({ ok: true });
}
