const footerLinks = [
  {
    title: "Клиника",
    links: [
      { label: "О нас", href: "#about" },
      { label: "Врачи", href: "#doctors" },
      { label: "Отзывы", href: "#testimonials" },
    ],
  },
  {
    title: "Услуги",
    links: [
      { label: "Терапия", href: "#services" },
      { label: "Хирургия", href: "#services" },
      { label: "Гинекология", href: "#services" },
      { label: "Урология", href: "#services" },
      { label: "УЗИ-диагностика", href: "#services" },
    ],
  },
  {
    title: "Контакты",
    links: [
      { label: "+7 (775) 199-32-13", href: "tel:+77751993213" },
      { label: "+7 (771) 320-98-48", href: "tel:+77713209848" },
      { label: "info@medprime.kz", href: "mailto:info@medprime.kz" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0e7490" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" />
                </svg>
              </div>
              <div>
                <div className="font-[family-name:var(--font-figtree)] font-bold text-white text-lg leading-none">МедПрайм</div>
                <div className="text-white/60 text-[10px]">Медицинский центр</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Многопрофильный медицинский центр. Работаем с 1992 года для здоровья каждого пациента.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://t.me/medprimekz" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white" aria-label="Telegram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.05 9.656c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.392c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.913.567z" />
                </svg>
              </a>
              <a href="https://instagram.com/medprimekz" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/70 hover:text-white text-sm transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">© 2025 МедПрайм. Все права защищены.</p>
          <p className="text-white/50 text-xs">ул. Сейфуллина 47, Астана, Казахстан</p>
        </div>
      </div>
    </footer>
  );
}
