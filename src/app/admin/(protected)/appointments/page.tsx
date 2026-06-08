"use client";

import { useState, useEffect, useCallback } from "react";
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Appointment } from "@/types";

const DOCTORS = ["Карпов Д.А.", "Белова Н.И.", "Асанов Т.Р.", "Иванова С.В."];
const DOCTOR_COLORS = ["#0891b2", "#16a34a", "#8b5cf6", "#f59e0b"];
const DOCTOR_LIGHT = ["#e0f7fa", "#dcfce7", "#ede9fe", "#fef3c7"];
const HOURS = Array.from({ length: 10 }, (_, i) => i + 9); // 9..18

interface ModalState {
  type: "create" | "view";
  date?: Date;
  hour?: number;
  appointment?: Appointment;
}

function doctorColor(doctor: string) {
  return DOCTOR_COLORS[DOCTORS.indexOf(doctor)] || "#0891b2";
}

export default function AppointmentsPage() {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [form, setForm] = useState({ patient_name: "", doctor: DOCTORS[0], datetime: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    const res = await fetch("/api/appointments");
    if (res.ok) setAppointments(await res.json());
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const visibleAppointments = filterDoctor
    ? appointments.filter(a => a.doctor === filterDoctor)
    : appointments;

  function getAppointmentsForSlot(day: Date, hour: number) {
    return visibleAppointments.filter((a) => {
      const d = parseISO(a.datetime);
      return isSameDay(d, day) && d.getHours() === hour;
    });
  }

  function openCreate(day: Date, hour: number) {
    const dt = new Date(day);
    dt.setHours(hour, 0, 0, 0);
    const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setForm({ patient_name: "", doctor: filterDoctor || DOCTORS[0], datetime: local, notes: "" });
    setModal({ type: "create", date: day, hour });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { await fetchAppointments(); setModal(null); }
    } finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    await fetchAppointments();
    setModal(null);
  }

  const whatsappPending = appointments.filter(a => a.notes?.startsWith("[WhatsApp]"));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-2xl">Расписание</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekStart(subWeeks(weekStart, 1))} className="p-2 rounded-xl border border-[#ccfbf1] hover:bg-[#f0fdfa] min-w-[44px] min-h-[44px] flex items-center justify-center text-[#0891b2]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="text-[#134e4a] font-medium text-sm px-2">
            {format(weekStart, "d MMM", { locale: ru })} — {format(addDays(weekStart, 6), "d MMM yyyy", { locale: ru })}
          </span>
          <button onClick={() => setWeekStart(addWeeks(weekStart, 1))} className="p-2 rounded-xl border border-[#ccfbf1] hover:bg-[#f0fdfa] min-w-[44px] min-h-[44px] flex items-center justify-center text-[#0891b2]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <button onClick={() => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))} className="px-3 py-2 rounded-xl border border-[#ccfbf1] hover:bg-[#f0fdfa] text-sm text-[#0891b2] font-medium min-h-[44px]">
            Сегодня
          </button>
        </div>
      </div>

      {/* Doctor filter chips */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs text-[#64748b] mr-1">Врач:</span>
        <button
          onClick={() => setFilterDoctor(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filterDoctor === null
              ? "bg-[#134e4a] text-white"
              : "bg-white border border-[#ccfbf1] text-[#64748b] hover:bg-[#f0fdfa]"
          }`}
        >
          Все
        </button>
        {DOCTORS.map((doc, i) => (
          <button
            key={doc}
            onClick={() => setFilterDoctor(filterDoctor === doc ? null : doc)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              filterDoctor === doc
                ? "font-semibold"
                : "border-[#ccfbf1] text-[#64748b] bg-white hover:bg-[#f0fdfa]"
            }`}
            style={filterDoctor === doc
              ? { background: DOCTOR_LIGHT[i], borderColor: DOCTOR_COLORS[i], color: DOCTOR_COLORS[i] }
              : {}}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: DOCTOR_COLORS[i] }} />
            {doc}
          </button>
        ))}
      </div>

      {/* WhatsApp pending appointments */}
      {whatsappPending.length > 0 && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h2 className="font-semibold text-green-800 text-sm">Заявки из WhatsApp — требуют подтверждения времени</h2>
          </div>
          <div className="space-y-2">
            {whatsappPending.map(a => (
              <div key={a.id} className="bg-white rounded-xl border border-green-100 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="font-semibold text-[#134e4a]">{a.patient_name}</span>
                  <span className="text-[#64748b] text-sm ml-2">— {a.doctor}</span>
                  <div className="text-xs text-[#64748b] mt-0.5">{a.notes?.replace("[WhatsApp] ", "")}</div>
                </div>
                <button
                  onClick={() => setModal({ type: "view", appointment: a })}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#0891b2] text-white hover:bg-[#0e7490] min-h-[36px]"
                >
                  Подтвердить время
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-[#ccfbf1] shadow-sm overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Day headers */}
          <div className="grid border-b border-[#ccfbf1]" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
            <div className="p-3" />
            {weekDays.map((day) => (
              <div key={day.toISOString()} className={`p-3 text-center border-l border-[#ccfbf1] ${isSameDay(day, new Date()) ? "bg-[#ecfeff]" : ""}`}>
                <div className="text-[#64748b] text-xs uppercase">{format(day, "EEE", { locale: ru })}</div>
                <div className={`font-[family-name:var(--font-figtree)] font-bold text-lg mt-0.5 ${isSameDay(day, new Date()) ? "text-[#0891b2]" : "text-[#134e4a]"}`}>
                  {format(day, "d")}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {HOURS.map((hour) => (
            <div key={hour} className="grid border-b border-[#f0fdfa] last:border-b-0" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
              <div className="p-2 text-right pr-3 text-xs text-[#94a3b8] pt-2.5 tabular-nums">{hour}:00</div>
              {weekDays.map((day) => {
                const slotAppts = getAppointmentsForSlot(day, hour);
                return (
                  <div
                    key={day.toISOString()}
                    className="border-l border-[#ccfbf1] min-h-[56px] p-1 cursor-pointer hover:bg-[#f0fdfa] transition-colors overflow-hidden"
                    onClick={() => { if (!slotAppts.length) openCreate(day, hour); }}
                  >
                    {slotAppts.map((a) => (
                      <div
                        key={a.id}
                        className="rounded-lg p-1.5 mb-1 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity"
                        style={{ background: doctorColor(a.doctor) }}
                        onClick={(e) => { e.stopPropagation(); setModal({ type: "view", appointment: a }); }}
                      >
                        <div className="font-semibold truncate leading-tight">{a.patient_name}</div>
                        <div className="opacity-80 truncate text-[10px]">{a.doctor}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10">
            {modal.type === "create" ? (
              <>
                <h3 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-lg mb-4">Новая запись</h3>
                <form onSubmit={handleCreate} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[#134e4a] mb-1">Пациент *</label>
                    <input required value={form.patient_name} onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ccfbf1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30 min-h-[44px]" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#134e4a] mb-1">Врач *</label>
                    <select required value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ccfbf1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30 min-h-[44px]">
                      {DOCTORS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#134e4a] mb-1">Дата и время *</label>
                    <input required type="datetime-local" value={form.datetime} onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ccfbf1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30 min-h-[44px]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#134e4a] mb-1">Заметки</label>
                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ccfbf1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30 resize-none" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-[#ccfbf1] text-sm text-[#64748b] hover:bg-[#f0fdfa] min-h-[44px]">Отмена</button>
                    <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-[#0891b2] text-white text-sm font-semibold hover:bg-[#0e7490] min-h-[44px] disabled:opacity-50">
                      {saving ? "Сохраняем..." : "Сохранить"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-lg mb-4">Запись</h3>
                <div className="space-y-2 mb-5">
                  <div><span className="text-[#64748b] text-xs">Пациент</span><div className="font-medium text-[#134e4a]">{modal.appointment?.patient_name}</div></div>
                  <div>
                    <span className="text-[#64748b] text-xs">Врач / Услуга</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: doctorColor(modal.appointment?.doctor || "") }} />
                      <span className="font-medium text-[#134e4a]">{modal.appointment?.doctor}</span>
                    </div>
                  </div>
                  <div><span className="text-[#64748b] text-xs">Дата</span><div className="font-medium text-[#134e4a]">{modal.appointment && format(parseISO(modal.appointment.datetime), "d MMMM yyyy, HH:mm", { locale: ru })}</div></div>
                  {modal.appointment?.notes && <div><span className="text-[#64748b] text-xs">Заметки</span><div className="text-[#134e4a] text-sm">{modal.appointment.notes}</div></div>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-[#ccfbf1] text-sm text-[#64748b] hover:bg-[#f0fdfa] min-h-[44px]">Закрыть</button>
                  <button onClick={() => modal.appointment && handleDelete(modal.appointment.id)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 min-h-[44px]">Удалить</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
