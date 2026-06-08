const WAHA_URL = process.env.WAHA_URL!;
const WAHA_API_KEY = process.env.WAHA_API_KEY || "";

export async function sendWAHAMessage(chatId: string, text: string) {
  const res = await fetch(`${WAHA_URL}/api/sendText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(WAHA_API_KEY ? { "X-Api-Key": WAHA_API_KEY } : {}),
    },
    body: JSON.stringify({ chatId, text, session: "default" }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WAHA error: ${err}`);
  }
  return res.json();
}
