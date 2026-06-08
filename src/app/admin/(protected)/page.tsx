import { createSupabaseServerClient } from "@/lib/supabase/server";
import StatsCard from "@/components/admin/StatsCard";
import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

// Import date-fns locale for Russian

const STATUS_LABELS: Record<string, string> = { new: "Новая", called: "Позвонили", done: "Готово" };
const STATUS_COLORS: Record<string, string> = { new: "bg-yellow-100 text-yellow-800", called: "bg-blue-100 text-blue-800", done: "bg-green-100 text-green-800" };

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const [
    { count: totalInquiries },
    { count: newInquiries },
    { count: todayAppointments },
    { count: totalConversations },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("appointments").select("*", { count: "exact", head: true }).gte("datetime", `${todayStr}T00:00:00`).lte("datetime", `${todayStr}T23:59:59`),
    supabase.from("conversations").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*").eq("status", "new").order("created_at", { ascending: false }).limit(5),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-2xl mb-6">Дашборд</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          value={totalInquiries ?? 0}
          label="Всего заявок"
          subtitle="за всё время"
          iconBg="#ecfeff"
          iconColor="#0891b2"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <StatsCard
          value={newInquiries ?? 0}
          label="Новых заявок"
          subtitle="требуют обработки"
          iconBg="#fef9c3"
          iconColor="#ca8a04"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
        />
        <StatsCard
          value={todayAppointments ?? 0}
          label="Приёмов сегодня"
          subtitle={format(today, "d MMMM", { locale: ru })}
          iconBg="#dcfce7"
          iconColor="#16a34a"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
        />
        <StatsCard
          value={totalConversations ?? 0}
          label="Диалогов"
          subtitle="WhatsApp + Instagram"
          iconBg="#f0fdf4"
          iconColor="#0891b2"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent inquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#ccfbf1] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-[#134e4a] text-lg">Новые заявки</h2>
            <Link href="/admin/inquiries" className="text-[#0891b2] text-sm hover:underline">Все заявки →</Link>
          </div>
          {recentInquiries?.length ? (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between p-3 bg-[#f0fdfa] rounded-xl">
                  <div>
                    <div className="font-medium text-[#134e4a] text-sm">{inq.name}</div>
                    <div className="text-[#64748b] text-xs">{inq.phone} · {inq.message?.slice(0, 40) ?? "—"}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[inq.status]}`}>
                      {STATUS_LABELS[inq.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#64748b]">Новых заявок нет</div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-[#ccfbf1] shadow-sm p-6">
          <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-[#134e4a] text-lg mb-4">Быстрые действия</h2>
          <div className="space-y-2">
            {[
              { href: "/admin/inquiries", label: "Обработать заявки", color: "#ecfeff", text: "#0891b2" },
              { href: "/admin/appointments", label: "Посмотреть расписание", color: "#dcfce7", text: "#16a34a" },
              { href: "/admin/conversations", label: "Открыть переписку", color: "#f0fdfa", text: "#0891b2" },
              { href: "/", label: "Открыть сайт", color: "#f1f5f9", text: "#64748b" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center justify-between p-3 rounded-xl hover:opacity-90 transition-opacity min-h-[48px]"
                style={{ background: a.color, color: a.text }}
              >
                <span className="font-medium text-sm">{a.label}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
