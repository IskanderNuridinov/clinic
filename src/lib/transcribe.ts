const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

export async function transcribeAudio(audioBuffer: Buffer, mimetype: string): Promise<string | null> {
  if (!GROQ_API_KEY) return null;

  // Determine file extension - Groq requires a filename with extension
  let ext = "ogg";
  if (mimetype.includes("mp4")) ext = "mp4";
  else if (mimetype.includes("mpeg") || mimetype.includes("mp3")) ext = "mp3";
  else if (mimetype.includes("webm")) ext = "webm";
  else if (mimetype.includes("wav")) ext = "wav";

  const form = new FormData();
  const ab = audioBuffer.buffer as ArrayBuffer;
  const slice = ab.slice(audioBuffer.byteOffset, audioBuffer.byteOffset + audioBuffer.byteLength);
  form.append("file", new Blob([slice], { type: mimetype }), `voice.${ext}`);
  form.append("model", "whisper-large-v3-turbo");
  // No language specified — auto-detects Russian, Kazakh, English

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${GROQ_API_KEY}` },
    body: form,
  });

  if (!res.ok) {
    console.error("Groq transcription error:", await res.text());
    return null;
  }

  const data = await res.json();
  return data.text?.trim() || null;
}

export async function downloadWAHAMedia(mediaUrl: string): Promise<Buffer | null> {
  try {
    // mediaUrl from WAHA payload may be absolute or relative
    // If relative, prepend WAHA_URL
    const url = mediaUrl.startsWith("http")
      ? mediaUrl
      : `${process.env.WAHA_URL}/${mediaUrl.replace(/^\//, "")}`;

    const res = await fetch(url, {
      headers: process.env.WAHA_API_KEY ? { "X-Api-Key": process.env.WAHA_API_KEY } : {},
    });

    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}
