export async function sendWhatsAppMessage(to: string, text: string) {
  const url = `https://graph.facebook.com/v18.0/${process.env.META_WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.META_WHATSAPP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`WhatsApp API error: ${JSON.stringify(err)}`);
  }
  return res.json();
}

export async function sendInstagramMessage(recipientId: string, text: string) {
  const url = `https://graph.facebook.com/v18.0/${process.env.META_INSTAGRAM_PAGE_ID}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.META_INSTAGRAM_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Instagram API error: ${JSON.stringify(err)}`);
  }
  return res.json();
}
