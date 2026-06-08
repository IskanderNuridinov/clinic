import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  value: string | number;
  label: string;
  subtitle?: string;
  iconBg?: string;
  iconColor?: string;
}

export default function StatsCard({ icon, value, label, subtitle, iconBg = "#ecfeff", iconColor = "#0891b2" }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-[#ccfbf1] shadow-sm p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-[family-name:var(--font-figtree)] font-bold text-2xl text-[#134e4a] leading-none">{value}</div>
        <div className="text-[#134e4a] text-sm font-medium mt-0.5">{label}</div>
        {subtitle && <div className="text-[#64748b] text-xs mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
}
