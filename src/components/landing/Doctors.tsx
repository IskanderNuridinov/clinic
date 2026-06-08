const doctors = [
  {
    name: "Карпов Дмитрий Андреевич",
    role: "Главный врач",
    specialty: "Хирург · Колопроктолог",
    experience: "20 лет опыта",
    desc: "Специализируется на малоинвазивных хирургических методиках. Член ассоциации хирургов Казахстана.",
    initials: "КД",
    color: "from-[#0891b2] to-[#164e63]",
  },
  {
    name: "Белова Наталья Игоревна",
    role: "Врач-специалист",
    specialty: "Акушер-гинеколог · УЗИ",
    experience: "15 лет опыта",
    desc: "Экспертный уровень ультразвуковой диагностики. Ведение беременности и гинекологические операции.",
    initials: "БН",
    color: "from-[#16a34a] to-[#0891b2]",
  },
  {
    name: "Асанов Тимур Руслантович",
    role: "Врач-кардиолог",
    specialty: "Кардиология · Терапия",
    experience: "13 лет опыта",
    desc: "Функциональная диагностика сердечно-сосудистой системы. ЭКГ, холтеровское мониторирование.",
    initials: "АТ",
    color: "from-[#22d3ee] to-[#0e7490]",
  },
  {
    name: "Иванова Светлана Вячеславовна",
    role: "Врач-уролог",
    specialty: "Урология · Нефрология",
    experience: "11 лет опыта",
    desc: "Диагностика и лечение урологических заболеваний у мужчин и женщин. Ультразвуковая диагностика почек.",
    initials: "ИС",
    color: "from-[#0e7490] to-[#16a34a]",
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="section" style={{ background: "#f0fdfa" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#0891b2] text-sm font-semibold uppercase tracking-widest">Наша команда</span>
          <h2
            className="font-[family-name:var(--font-figtree)] text-[#134e4a] mt-3 mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Врачи клиники
          </h2>
          <div className="divider mx-auto mb-4" />
          <p className="text-[#64748b] max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            Опытные специалисты с многолетней практикой. Каждый врач — эксперт в своей области.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.name}
              className="card-hover bg-white rounded-2xl overflow-hidden border border-[#ccfbf1] shadow-sm"
            >
              {/* Avatar area */}
              <div className={`bg-gradient-to-br ${doc.color} h-40 flex items-center justify-center relative`}>
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                  <span className="font-[family-name:var(--font-figtree)] text-white text-2xl font-bold">
                    {doc.initials}
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full border border-white/30">
                  {doc.experience}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="text-[#0891b2] text-xs font-semibold uppercase tracking-wider mb-1">
                  {doc.role}
                </div>
                <h3 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-semibold text-base leading-snug mb-1">
                  {doc.name}
                </h3>
                <p className="text-[#0891b2] text-xs font-medium mb-2">{doc.specialty}</p>
                <p className="text-[#64748b] text-xs mb-4 leading-relaxed">{doc.desc}</p>
                <a
                  href="#contacts"
                  className="btn btn-primary w-full text-sm"
                  style={{ minHeight: "44px" }}
                >
                  Записаться
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
