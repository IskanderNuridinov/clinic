import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "МедПрайм — Многопрофильная клиника",
  description:
    "Современная медицинская клиника. Консультации специалистов, диагностика, УЗИ, лабораторные анализы. Запись онлайн.",
  keywords: "медицинская клиника, врач, консультация, диагностика, УЗИ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${figtree.variable} ${notoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
