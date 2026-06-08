const testimonials = [
  {
    name: "Алина М.",
    text: "Записалась через сайт буквально за пару минут. Врач внимательный, всё объяснил доходчиво. Никакой спешки, не как в обычных клиниках. Теперь только сюда.",
    rating: 5,
    date: "Март 2025",
    service: "Терапия",
  },
  {
    name: "Серик Б.",
    text: "Делал УЗИ и ЭКГ. Оборудование современное, результаты дали быстро. Врач-кардиолог Асанов подробно всё разъяснил, назначил лечение. Доволен полностью.",
    rating: 5,
    date: "Февраль 2025",
    service: "Функциональная диагностика",
  },
  {
    name: "Екатерина Л.",
    text: "Обратилась к гинекологу с деликатной проблемой. Приём прошёл комфортно, без лишних вопросов, всё профессионально. Чувствуется опыт и тактичность врача.",
    rating: 5,
    date: "Апрель 2025",
    service: "Гинекология",
  },
  {
    name: "Максим Т.",
    text: "Попал на IV-терапию после командировки — просто разбитым был. После двух сеансов ощутил заметный подъём. Персонал приветливый, процедура прошла без дискомфорта.",
    rating: 5,
    date: "Январь 2025",
    service: "IV-терапия",
  },
  {
    name: "Гульнара К.",
    text: "Удобно то, что можно написать в WhatsApp и сразу получить ответ. AI-ассистент объяснил, какой врач мне нужен, записал на удобное время. Очень современный подход.",
    rating: 5,
    date: "Май 2025",
    service: "Онлайн-запись",
  },
  {
    name: "Артём В.",
    text: "Хирург Карпов — профессионал своего дела. Небольшая операция прошла быстро, восстановился за несколько дней. Спасибо за грамотный подход и поддержку после.",
    rating: 5,
    date: "Март 2025",
    service: "Хирургия",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#0891b2] text-sm font-semibold uppercase tracking-widest">Отзывы</span>
          <h2
            className="font-[family-name:var(--font-figtree)] text-[#134e4a] mt-3 mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Что говорят пациенты
          </h2>
          <div className="divider mx-auto mb-4" />
          <p className="text-[#64748b] max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            Более 50 000 пациентов доверяют нам своё здоровье. Читайте реальные отзывы.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-hover bg-[#f0fdfa] rounded-2xl p-6 border border-[#ccfbf1]"
            >
              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.rating} />
                <span className="text-[#64748b] text-xs">{t.date}</span>
              </div>

              {/* Quote */}
              <p className="text-[#134e4a] text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#ccfbf1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0891b2] to-[#16a34a] flex items-center justify-center text-white text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <span className="text-[#134e4a] font-semibold text-sm">{t.name}</span>
                </div>
                <span className="text-[#0891b2] text-xs font-medium bg-[#ecfeff] px-2.5 py-1 rounded-full">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 pt-8 border-t border-[#ccfbf1]">
          {[
            { label: "Средняя оценка", value: "4.9 / 5.0" },
            { label: "Оценок на Google Maps", value: "1 200+" },
            { label: "Рекомендуют нас", value: "98%" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-[family-name:var(--font-figtree)] font-bold text-[#0891b2] text-2xl">
                {item.value}
              </div>
              <div className="text-[#64748b] text-sm mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
