import Anthropic from "@anthropic-ai/sdk";
import { PRICE_LIST } from "./prices";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Вы — Айгуль, старший администратор медицинской клиники "МедПрайм". Общаетесь с пациентами в WhatsApp.

ПРАЙС-ЛИСТ:
${PRICE_LIST}

О КЛИНИКЕ:
- Многопрофильная клиника с опытными специалистами
- Режим работы: Пн–Пт 8:00–20:00, Сб 9:00–17:00, Вс 9:00–14:00
- Адрес: уточняйте у пациента удобный филиал
- Запись: через вас (WhatsApp), по телефону или через сайт

ВАША ЗАДАЧА — ПОЛНОЦЕННОЕ ВЕДЕНИЕ ПАЦИЕНТА:
1. Тепло приветствуйте и выясните запрос
2. Рекомендуйте подходящего специалиста или услугу
3. Называйте точные цены из прайс-листа (не говорите "уточните у администратора", если цена есть в прайсе)
4. Записывайте на приём, собирая: имя, номер телефона, желаемый день и время
5. После сбора всех данных вызовите инструмент create_appointment
6. Работайте с возражениями профессионально

РАБОТА С ВОЗРАЖЕНИЯМИ:
- "Дорого" → расскажите о скидках, пакетах, ценности ранней диагностики
- "Нет времени" → предложите вечерние слоты (до 20:00) или субботу
- "Подожду" → объясните риски откладывания, предложите быстрый формат (только анализы + онлайн-результат)
- "Буду думать" → предложите предварительно забронировать время без обязательств

КОГДА ПЕРЕДАВАТЬ АДМИНИСТРАТОРУ (вызвать escalate_to_admin):
- Жалобы на качество лечения или конфликтные ситуации
- Вопросы о возврате средств или юридические вопросы
- Срочные медицинские ситуации (боль в груди, потеря сознания и др.)
- Пациент явно недоволен и требует живого общения
- Сложные вопросы о страховке или корпоративных договорах

ПРАВИЛА ОБЩЕНИЯ:
- Ответы 1–4 предложения, без лишней воды
- Не ставьте диагнозы, не рекомендуйте препараты
- Обращайтесь на "Вы" / "Сіз"
- Определяйте язык пациента и отвечайте на нём (русский / казахский / английский)
- Будьте заботливы, но не навязчивы

ФОРМАТИРОВАНИЕ (WhatsApp):
- Жирный текст: *одна звёздочка*, НЕ **две**
- Курсив: _подчёркивание_
- Не используйте # заголовки, --- разделители, markdown-списки с **
- Списки оформляйте через дефис: "- пункт" или цифры "1. пункт"`;

const TOOLS: Anthropic.Tool[] = [
  {
    name: "create_appointment",
    description: "Записать пациента на приём. Вызывайте только когда собраны: имя пациента, желаемая услуга/специалист, предпочтительная дата/время И номер телефона.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_name: { type: "string", description: "Имя пациента" },
        service: { type: "string", description: "Услуга или специалист" },
        preferred_datetime: { type: "string", description: "Желаемая дата и время, например: 'среда утром', '12 июня в 10:00'" },
        phone: { type: "string", description: "Номер телефона пациента" },
        notes: { type: "string", description: "Дополнительные пожелания или жалобы" },
      },
      required: ["patient_name", "service", "preferred_datetime", "phone"],
    },
  },
  {
    name: "escalate_to_admin",
    description: "Передать разговор живому администратору. Вызывайте при жалобах, конфликтах, срочных ситуациях или когда пациент явно хочет говорить с человеком.",
    input_schema: {
      type: "object" as const,
      properties: {
        reason: { type: "string", description: "Причина передачи администратору" },
      },
      required: ["reason"],
    },
  },
];

export type BookingData = {
  patient_name: string;
  service: string;
  preferred_datetime: string;
  phone: string;
  notes?: string;
};

export type AIResult = {
  text: string;
  booking?: BookingData;
  escalated?: boolean;
  escalation_reason?: string;
};

export async function getAIResponse(
  history: { role: "user" | "assistant"; content: string }[],
  senderPhone?: string
): Promise<AIResult> {
  const systemPrompt = senderPhone
    ? `${SYSTEM_PROMPT}\n\nНОМЕР ТЕЛЕФОНА ПАЦИЕНТА (WhatsApp): +${senderPhone} — используйте этот номер при записи, не спрашивайте его повторно.`
    : SYSTEM_PROMPT;

  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 600,
    system: systemPrompt,
    messages: history,
    tools: TOOLS,
  });

  let text = "";
  let booking: BookingData | undefined;
  let escalated = false;
  let escalation_reason: string | undefined;

  for (const block of response.content) {
    if (block.type === "text") {
      text += block.text;
    } else if (block.type === "tool_use") {
      if (block.name === "create_appointment") {
        booking = block.input as BookingData;
      } else if (block.name === "escalate_to_admin") {
        escalated = true;
        escalation_reason = (block.input as { reason: string }).reason;
      }
    }
  }

  // If Claude only returned a tool call without text, generate a brief confirmation
  if (!text && booking) {
    text = `Отлично! Записываю вас: ${booking.patient_name}, ${booking.service}, ${booking.preferred_datetime}. Администратор подтвердит точное время по номеру ${booking.phone}.`;
  }
  if (!text && escalated) {
    text = "Сейчас передаю вас живому администратору. Ожидайте, пожалуйста.";
  }

  return { text, booking, escalated, escalation_reason };
}

// Legacy single-message function (kept for backward compatibility)
export async function getAIReply(userMessage: string): Promise<string> {
  const result = await getAIResponse([{ role: "user", content: userMessage }]);
  return result.text;
}
