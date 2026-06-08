"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "О клинике", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Врачи", href: "#doctors" },
  { label: "Цены", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#ccfbf1]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#16a34a] flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" />
            </svg>
          </div>
          <div>
            <span className={`font-bold text-lg leading-none block font-[family-name:var(--font-figtree)] ${scrolled ? "text-[#134e4a]" : "text-white"}`}>
              МедПрайм
            </span>
            <span className={`text-[10px] uppercase tracking-widest leading-none ${scrolled ? "text-[#64748b]" : "text-white/70"}`}>
              Медицинский центр
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#0891b2] ${
                  scrolled ? "text-[#134e4a]" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+77172988000" className={`text-sm font-semibold flex items-center gap-1.5 ${scrolled ? "text-[#0891b2]" : "text-white"}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            +7 (717) 298-80-00
          </a>
          <a href="#contacts" className="btn btn-primary text-sm px-5 h-10">
            Записаться
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className={`lg:hidden p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center ${scrolled ? "text-[#134e4a]" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#ccfbf1] shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-[#134e4a] font-medium hover:bg-[#f0fdfa] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#ccfbf1] mt-1 flex flex-col gap-2">
              <a href="tel:+77172988000" className="px-4 py-3 text-[#0891b2] font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                +7 (717) 298-80-00
              </a>
              <a href="#contacts" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Записаться на приём
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
