import Link from "next/link";

const stats = [
  { value: "30+", label: "лет работы" },
  { value: "50 000+", label: "пациентов" },
  { value: "8", label: "направлений" },
  { value: "20+", label: "специалистов" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0e7490 0%, #0891b2 35%, #164e63 70%, #134e4a 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }} />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #16a34a, transparent)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
      </div>

      {/* Cross medical icon bg */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 hidden xl:block">
        <svg viewBox="0 0 200 200" className="w-[400px] h-[400px] text-white" fill="currentColor">
          <rect x="75" y="10" width="50" height="180" rx="8" />
          <rect x="10" y="75" width="180" height="50" rx="8" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
            Работаем с 1992 года · Астана
          </div>

          <h1 className="font-[family-name:var(--font-figtree)] text-white mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", lineHeight: 1.15, fontWeight: 700 }}>
            Ваше здоровье —<br />
            <span style={{ color: "#a5f3fc" }}>наша главная задача</span>
          </h1>

          <p className="text-white/80 mb-8 max-w-xl"
            style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.7 }}>
            Многопрофильный медицинский центр с командой опытных специалистов.
            Современное оборудование, индивидуальный подход и забота о каждом пациенте.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-14">
            <a
              href="#contacts"
              className="btn text-base px-7"
              style={{ background: "#16a34a", color: "#fff", minHeight: "52px" }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Записаться на приём
            </a>
            <a
              href={`https://wa.me/77751993213?text=${encodeURIComponent("Здравствуйте! Хочу записаться на приём в МедПрайм. Подскажите свободное время.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-base px-7"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", minHeight: "52px" }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.545 5.887L0 24l6.272-1.518A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.012-1.37l-.36-.213-3.722.9.957-3.624-.235-.374A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
              </svg>
              Написать в WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.value} className="text-center sm:text-left">
                <div className="font-[family-name:var(--font-figtree)] text-white font-bold"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {s.value}
                </div>
                <div className="text-white/60 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20" fill="white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
