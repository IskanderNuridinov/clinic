import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAIResponse } from "@/lib/claude";
import { sendWAHAMessage } from "@/lib/waha";
import { transcribeAudio, downloadWAHAMedia } from "@/lib/transcribe";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 2000;
const HISTORY_LIMIT = 20; // last 20 messages for context
const AUDIO_TYPES = new Set(["ptt", "audio"]);

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (process.env.WAHA_WEBHOOK_SECRET && secret !== process.env.WAHA_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    // WAHA sends text as "message", voice/media as "message.any"
    if (body.event !== "message" && body.event !== "message.any") return NextResponse.json({ ok: true });

    const msg = body.payload;
    if (!msg || msg.fromMe) return NextResponse.json({ ok: true });

    // Normalize msg.type — in message.any events it's in _data.type
    const msgType: string = msg.type || msg._data?.type || "";

    // message.any fires for ALL messages (including text already handled by "message").
    // Only use message.any for media/voice to avoid duplicate responses.
    if (body.event === "message.any" && !msg.hasMedia) return NextResponse.json({ ok: true });

    const chatId: string = msg.from;
    let incomingText = "";

    if (msg.hasMedia && AUDIO_TYPES.has(msgType)) {
      const mediaUrl: string | undefined = msg.media?.url || msg.mediaUrl || msg._data?.mediaUrl;
      if (mediaUrl) {
        const audioBuffer = await downloadWAHAMedia(mediaUrl);
        if (audioBuffer) {
          const mimetype = (msg.mimetype || "audio/ogg").split(";")[0].trim();
          const transcribed = await transcribeAudio(audioBuffer, mimetype);
          if (transcribed) incomingText = transcribed;
        }
      }
      if (!incomingText) {
        await sendWAHAMessage(chatId, "Голосовое сообщение получено. Пожалуйста, напишите текстом — я отвечу сразу.");
        return NextResponse.json({ ok: true });
      }
    } else if (msg.hasMedia && !AUDIO_TYPES.has(msgType)) {
      return NextResponse.json({ ok: true });
    } else {
      incomingText = (msg.body || "").trim();
    }

    if (!incomingText) return NextResponse.json({ ok: true });
    incomingText = incomingText.slice(0, MAX_MESSAGE_LENGTH);

    const phone = chatId.replace("@c.us", "");
    const supabase = await createSupabaseServerClient();

    // Upsert conversation
    const { data: conv } = await supabase
      .from("conversations")
      .upsert(
        { channel: "whatsapp", contact_id: phone, last_message: incomingText, updated_at: new Date().toISOString() },
        { onConflict: "channel,contact_id" }
      )
      .select("id")
      .single();

    if (!conv?.id) return NextResponse.json({ ok: true });

    // Save incoming message
    await supabase.from("messages").insert({ conversation_id: conv.id, direction: "in", body: incomingText });

    // Load recent conversation history for context
    const { data: historyRows } = await supabase
      .from("messages")
      .select("direction, body")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: false })
      .limit(HISTORY_LIMIT);

    const history = (historyRows ?? [])
      .reverse()
      .map((m) => ({
        role: (m.direction === "in" ? "user" : "assistant") as "user" | "assistant",
        content: m.body as string,
      }));

    // Get AI response with full context
    const aiResult = await getAIResponse(history);
    const reply = aiResult.text;

    // Handle booking
    if (aiResult.booking) {
      const b = aiResult.booking;
      await supabase.from("appointments").insert({
        patient_name: b.patient_name,
        doctor: b.service,
        datetime: new Date().toISOString(), // placeholder — admin confirms exact time
        notes: [b.preferred_datetime, b.notes].filter(Boolean).join(" | "),
      });
    }

    // Handle escalation
    if (aiResult.escalated) {
      await supabase
        .from("conversations")
        .update({ escalated: true, updated_at: new Date().toISOString() } as Record<string, unknown>)
        .eq("id", conv.id);
    }

    // Send reply and save
    await sendWAHAMessage(chatId, reply);
    await supabase.from("messages").insert({ conversation_id: conv.id, direction: "out", body: reply });
    await supabase.from("conversations")
      .update({ last_message: reply, updated_at: new Date().toISOString() })
      .eq("id", conv.id);

  } catch (err) {
    console.error("WAHA webhook error:", err);
  }

  return NextResponse.json({ ok: true });
}
