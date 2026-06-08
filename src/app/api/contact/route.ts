import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(1, "Введите имя").max(100),
  phone: z.string().min(7, "Введите телефон").max(20),
  service: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Слишком много запросов. Подождите минуту." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }
    const { name, phone, service, message } = result.data;
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("inquiries").insert({
      name,
      phone,
      message: service ? `[${service}] ${message || ""}`.trim() : message || null,
      source: "website",
      status: "new",
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
