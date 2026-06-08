const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Лицензированная клиника",
    desc: "Все виды деятельности лицензированы. Работаем в соответствии со стандартами МЗ РК.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Современное оборудование",
    desc: "УЗИ-аппараты последнего поколения, ЭКГ, суточный мониторинг, лабораторная диагностика.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Опытная команда",
    desc: "Синтез российской и казахстанской медицинских школ. Специалисты с международным опытом.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Удобное расписание",
    desc: "Работаем 7 дней в неделю. Пн–Пт 8:00–20:00, Сб 9:00–17:00, Вс 9:00–14:00.",
  },
];

export default function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <span className="text-[#0891b2] text-sm font-semibold uppercase tracking-widest">О нас</span>
            <h2
              className="font-[family-name:var(--font-figtree)] text-[#134e4a] mt-3 mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
            >
              Медицина, которой можно доверять
            </h2>
            <div className="divider mb-6" />
            <p className="text-[#64748b] mb-4" style={{ lineHeight: 1.8 }}>
              Медицинский центр «МедПрайм» основан на синтезе российской и казахстанской
              медицинских школ и традиций. С 1992 года мы помогаем пациентам сохранять здоровье
              и возвращаться к активной жизни.
            </p>
            <p className="text-[#64748b] mb-8" style={{ lineHeight: 1.8 }}>
              Наша миссия — сделать качественную медицину доступной. Каждый пациент получает
              индивидуальный план лечения и постоянную поддержку специалистов.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#ecfeff] flex items-center justify-center text-[#0891b2]">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#134e4a] text-sm mb-0.5">{f.title}</div>
                    <div className="text-[#64748b] text-xs leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual card */}
          <div className="relative">
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0891b2, #164e63)" }}
            >
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #22d3ee, transparent)", transform: "translate(30%, -30%)" }} />

              <div className="relative z-10 text-white">
                <div className="font-[family-name:var(--font-figtree)] text-4xl font-bold mb-1">30+</div>
                <div className="text-white/70 text-sm mb-8">лет на рынке медицинских услуг</div>

                {/* Schedule */}
                <div className="space-y-3">
                  <div className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-4">Режим работы</div>
                  {[
                    { day: "Пн — Пт", time: "08:00 – 20:00" },
                    { day: "Суббота", time: "09:00 – 17:00" },
                    { day: "Воскресенье", time: "09:00 – 14:00" },
                  ].map((r) => (
                    <div key={r.day} className="flex justify-between items-center bg-white/10 rounded-xl px-4 py-3">
                      <span className="text-white/80 text-sm">{r.day}</span>
                      <span className="text-white font-semibold text-sm">{r.time}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="tel:+77751993213"
                  className="mt-6 flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">Позвоните нам</div>
                    <div className="text-white font-semibold">+7 (717) 298-80-00</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Address card */}
            <div className="mt-4 bg-[#f0fdfa] rounded-2xl p-5 border border-[#ccfbf1] flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#ecfeff] flex items-center justify-center text-[#0891b2]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-[#134e4a] text-sm">Адрес клиники</div>
                <div className="text-[#64748b] text-sm mt-0.5">ул. Габдуллина 19/1, Астана, Казахстан</div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="text-[#0891b2] text-xs font-medium mt-1 inline-block hover:underline">
                  Открыть на карте →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
