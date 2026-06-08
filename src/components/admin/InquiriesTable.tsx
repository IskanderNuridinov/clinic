"use client";

import { useState } from "react";
import { Inquiry, InquiryStatus } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const STATUS_LABELS: Record<InquiryStatus, string> = { new: "Новая", called: "Позвонили", done: "Готово" };
const STATUS_STYLES: Record<InquiryStatus, string> = {
  new: "bg-yellow-100 text-yellow-800 border-yellow-200",
  called: "bg-blue-100 text-blue-800 border-blue-200",
  done: "bg-green-100 text-green-800 border-green-200",
};

const SOURCES: Record<string, string> = { website: "Сайт", whatsapp: "WhatsApp", instagram: "Instagram" };
const SOURCE_COLORS: Record<string, string> = { website: "bg-[#ecfeff] text-[#0891b2]", whatsapp: "bg-green-50 text-green-700", instagram: "bg-purple-50 text-purple-700" };

interface Props {
  initialInquiries: Inquiry[];
}

export default function InquiriesTable({ initialInquiries }: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const PER_PAGE = 20;
  const filtered = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.phone.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  async function updateStatus(id: string, status: InquiryStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Поиск по имени или телефону..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#ccfbf1] text-sm text-[#134e4a] bg-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30 focus:border-[#0891b2] min-h-[44px]"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#ccfbf1] shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ccfbf1] bg-[#f0fdfa]">
              {["Имя", "Телефон", "Сообщение", "Источник", "Дата", "Статус"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0fdfa]">
            {paged.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10 text-[#64748b]">Заявок не найдено</td></tr>
            ) : paged.map((inq) => (
              <tr key={inq.id} className="hover:bg-[#f0fdfa] transition-colors">
                <td className="px-4 py-3 font-medium text-[#134e4a] text-sm">{inq.name}</td>
                <td className="px-4 py-3 text-[#64748b] text-sm">
                  <a href={`tel:${inq.phone}`} className="hover:text-[#0891b2] transition-colors">{inq.phone}</a>
                </td>
                <td className="px-4 py-3 text-[#64748b] text-sm max-w-xs truncate" title={inq.message ?? ""}>{inq.message || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SOURCE_COLORS[inq.source] || "bg-gray-100 text-gray-700"}`}>
                    {SOURCES[inq.source] || inq.source}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#64748b] text-xs whitespace-nowrap">
                  {format(new Date(inq.created_at), "d MMM, HH:mm", { locale: ru })}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                    disabled={updatingId === inq.id}
                    className={`text-xs px-2 py-1 rounded-lg border font-medium cursor-pointer focus:outline-none min-h-[32px] disabled:opacity-50 ${STATUS_STYLES[inq.status]}`}
                  >
                    {(Object.keys(STATUS_LABELS) as InquiryStatus[]).map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {paged.length === 0 ? (
          <div className="text-center py-10 text-[#64748b]">Заявок не найдено</div>
        ) : paged.map((inq) => (
          <div key={inq.id} className="bg-white rounded-2xl border border-[#ccfbf1] shadow-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-[#134e4a]">{inq.name}</div>
                <a href={`tel:${inq.phone}`} className="text-[#0891b2] text-sm">{inq.phone}</a>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${STATUS_STYLES[inq.status]}`}>{STATUS_LABELS[inq.status]}</span>
            </div>
            {inq.message && <p className="text-[#64748b] text-sm mb-3 line-clamp-2">{inq.message}</p>}
            <div className="flex items-center justify-between">
              <span className="text-[#64748b] text-xs">{format(new Date(inq.created_at), "d MMM, HH:mm", { locale: ru })}</span>
              <select
                value={inq.status}
                onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                disabled={updatingId === inq.id}
                className="text-xs px-2 py-1 rounded-lg border border-[#ccfbf1] text-[#134e4a] focus:outline-none min-h-[36px] disabled:opacity-50"
              >
                {(Object.keys(STATUS_LABELS) as InquiryStatus[]).map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-[#ccfbf1] text-sm text-[#64748b] hover:bg-[#f0fdfa] disabled:opacity-40 min-h-[36px]">
            ←
          </button>
          <span className="px-3 py-1.5 text-sm text-[#134e4a]">{page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-[#ccfbf1] text-sm text-[#64748b] hover:bg-[#f0fdfa] disabled:opacity-40 min-h-[36px]">
            →
          </button>
        </div>
      )}
    </div>
  );
}
