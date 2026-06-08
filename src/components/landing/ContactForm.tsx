"use client";

import { useState } from "react";

interface FormState {
  name: string;
  phone: string;
  service: string;
  message: string;
}

const SERVICES = [
  "Терапия",
  "Хирургия",
  "Гинекология",
  "Урология",
  "УЗИ-диагностика",
  "Функциональная диагностика",
  "IV-терапия",
  "Колопроктология",
  "Не знаю — нужна консультация",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Введите ваше имя";
    if (!form.phone.trim()) e.phone = "Введите номер телефона";
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = "Неверный формат номера";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  function fieldClass(error?: string) {
    return `w-full px-4 py-3 rounded-xl border text-[#134e4a] bg-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 transition-all text-sm ${
      error
        ? "border-red-400 focus:ring-red-300"
        : "border-[#ccfbf1] focus:ring-[#0891b2]/30 focus:border-[#0891b2]"
    }`;
  }

  return (
    <section id="contacts" className="section" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div>
            <span className="text-[#0891b2] text-sm font-semibold uppercase tracking-widest">Связаться с нами</span>
            <h2
              className="font-[family-name:var(--font-figtree)] text-[#134e4a] mt-3 mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
            >
              Запишитесь на приём
            </h2>
            <div className="divider mb-6" />
            <p className="text-[#64748b] mb-8" style={{ lineHeight: 1.8 }}>
              Оставьте заявку и мы перезвоним в течение 30 минут.
              Или напишите нам в WhatsApp — наш AI-ассистент ответит мгновенно.
            </p>

            {/* Contact methods */}
            <div className="space-y-4">
              <a href="tel:+77172988000" className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#ccfbf1] hover:border-[#0891b2] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#ecfeff] flex items-center justify-center text-[#0891b2] group-hover:bg-[#0891b2] group-hover:text-white transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#64748b] text-xs">Звонок</div>
                  <div className="text-[#134e4a] font-semibold">+7 (717) 298-80-00</div>
                </div>
              </a>

              <a
                href={`https://wa.me/77172988000?text=${encodeURIComponent("Здравствуйте! Хочу записаться на приём. Подскажите свободное время.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#ccfbf1] hover:border-[#25d366] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] flex items-center justify-center text-[#16a34a] group-hover:bg-[#25d366] group-hover:text-white transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.545 5.887L0 24l6.272-1.518A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.012-1.37l-.36-.213-3.722.9.957-3.624-.235-.374A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#64748b] text-xs">WhatsApp · AI-ассистент отвечает мгновенно</div>
                  <div className="text-[#134e4a] font-semibold">Написать сейчас</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#ccfbf1]">
                <div className="w-12 h-12 rounded-xl bg-[#ecfeff] flex items-center justify-center text-[#0891b2] flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#64748b] text-xs">Адрес</div>
                  <div className="text-[#134e4a] font-semibold">ул. Сейфуллина 47, Астана</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#ccfbf1]">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#16a34a]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-xl mb-2">
                  Заявка принята!
                </h3>
                <p className="text-[#64748b] text-sm mb-6">
                  Мы позвоним вам в течение 30 минут в рабочее время.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn btn-secondary text-sm"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-xl mb-6">
                  Оставить заявку
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-[#134e4a] text-sm font-medium mb-1.5">
                      Ваше имя <span className="text-red-500" aria-hidden>*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Иван Петров"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={fieldClass(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-[#134e4a] text-sm font-medium mb-1.5">
                      Телефон <span className="text-red-500" aria-hidden>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+7 (777) 000-00-00"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={fieldClass(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-[#134e4a] text-sm font-medium mb-1.5">
                      Нужная услуга
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={`${fieldClass()} cursor-pointer`}
                    >
                      <option value="">Выберите направление</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-[#134e4a] text-sm font-medium mb-1.5">
                      Комментарий (необязательно)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Опишите вашу ситуацию или пожелания..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${fieldClass()} resize-none`}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl" role="alert">
                    <p className="text-red-600 text-sm">Произошла ошибка. Попробуйте ещё раз или позвоните нам.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary w-full mt-6 text-base"
                  style={{ minHeight: "52px" }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Отправляем...
                    </span>
                  ) : (
                    "Записаться на приём"
                  )}
                </button>

                <p className="text-[#94a3b8] text-xs text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
