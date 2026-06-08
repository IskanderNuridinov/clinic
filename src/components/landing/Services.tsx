const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Терапия",
    desc: "Диагностика и лечение артериальной гипертензии, заболеваний ЖКТ, бронхолёгочной системы. Профилактические осмотры.",
    color: "from-[#0891b2] to-[#0e7490]",
    bg: "#ecfeff",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Хирургия",
    desc: "Диагностика и оперативное лечение новообразований, вскрытие гнойников, операции при вросшем ногте, удаление рубцов.",
    color: "from-[#0e7490] to-[#164e63]",
    bg: "#f0fdfa",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Гинекология",
    desc: "Женское здоровье, амбулаторные процедуры, кольпоскопия, ведение беременности, лечение гинекологических заболеваний.",
    color: "from-[#16a34a] to-[#15803d]",
    bg: "#f0fdf4",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Урология",
    desc: "Лечение простатита, цистита, пиелонефрита, эректильной дисфункции, недержания мочи и других урологических заболеваний.",
    color: "from-[#0891b2] to-[#16a34a]",
    bg: "#ecfeff",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "УЗИ-диагностика",
    desc: "Ультразвуковое исследование всех органов и систем организма. Современное оборудование, точные результаты.",
    color: "from-[#22d3ee] to-[#0891b2]",
    bg: "#ecfeff",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Функциональная диагностика",
    desc: "ЭКГ, эхокардиография, сканирование сосудов, суточное мониторирование по Холтеру. Полная кардиодиагностика.",
    color: "from-[#164e63] to-[#0891b2]",
    bg: "#f0fdfa",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "IV-терапия",
    desc: "Внутривенные инфузии с витаминами и микроэлементами. Детокс, иммунная поддержка, восстановление организма.",
    color: "from-[#16a34a] to-[#0891b2]",
    bg: "#f0fdf4",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
    title: "Колопроктология",
    desc: "Диагностика и лечение заболеваний ободочной и прямой кишки: геморрой, анальные трещины, новообразования.",
    color: "from-[#0e7490] to-[#16a34a]",
    bg: "#f0fdfa",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#0891b2] text-sm font-semibold uppercase tracking-widest">Что мы лечим</span>
          <h2 className="font-[family-name:var(--font-figtree)] text-[#134e4a] mt-3 mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}>
            Наши услуги
          </h2>
          <div className="divider mx-auto mb-4" />
          <p className="text-[#64748b] max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
            Восемь ключевых направлений медицины под одной крышей. Современное оборудование
            и опытные специалисты для вашего здоровья.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="card-hover rounded-2xl p-6 border border-[#ccfbf1] group cursor-pointer"
              style={{ background: s.bg }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-5 shadow-md transition-transform duration-200 group-hover:scale-110`}
              >
                {s.icon}
              </div>
              <h3 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-semibold text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-[#0891b2] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Подробнее
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
