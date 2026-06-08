"use client";

import { useState, useEffect, useCallback } from "react";
import { Conversation, Message } from "@/types";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.545 5.887L0 24l6.272-1.518A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.012-1.37l-.36-.213-3.722.9.957-3.624-.235-.374A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((d) => { setConversations(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const selectConversation = useCallback(async (conv: Conversation) => {
    setSelected(conv);
    setShowMessages(true);
    setMessagesLoading(true);
    try {
      const res = await fetch(`/api/conversations?id=${conv.id}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Conversation list */}
      <div className={`${showMessages ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 bg-white rounded-2xl border border-[#ccfbf1] shadow-sm overflow-hidden flex-shrink-0`}>
        <div className="p-4 border-b border-[#ccfbf1] flex-shrink-0">
          <h1 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-lg">Переписка</h1>
          <p className="text-[#64748b] text-xs mt-0.5">WhatsApp + Instagram</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-[#64748b] text-sm">Загрузка...</div>
          ) : conversations.length === 0 ? (
            <div className="p-6 text-center text-[#64748b] text-sm">Переписок пока нет</div>
          ) : conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv)}
              className={`w-full text-left px-4 py-3 border-b border-[#f0fdfa] hover:bg-[#f0fdfa] transition-colors min-h-[64px] ${selected?.id === conv.id ? "bg-[#ecfeff]" : ""}`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${conv.channel === "whatsapp" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>
                  {conv.channel === "whatsapp" ? <WhatsAppIcon /> : <InstagramIcon />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-[#134e4a] text-sm truncate">{conv.contact_name || conv.contact_id}</span>
                    {conv.escalated && (
                      <span className="flex-shrink-0 text-[10px] font-semibold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Нужен админ</span>
                    )}
                  </div>
                  <div className="text-[#64748b] text-xs truncate">{conv.last_message || "—"}</div>
                </div>
                <div className="text-[#94a3b8] text-[10px] flex-shrink-0">
                  {format(parseISO(conv.updated_at), "HH:mm", { locale: ru })}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message thread */}
      <div className={`${showMessages ? "flex" : "hidden md:flex"} flex-1 flex-col bg-white rounded-2xl border border-[#ccfbf1] shadow-sm overflow-hidden`}>
        {selected ? (
          <>
            {/* Thread header */}
            <div className="p-4 border-b border-[#ccfbf1] flex items-center gap-3 flex-shrink-0">
              <button onClick={() => setShowMessages(false)} className="md:hidden p-1.5 rounded-lg hover:bg-[#f0fdfa] min-w-[36px] min-h-[36px] flex items-center justify-center text-[#64748b]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${selected.channel === "whatsapp" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>
                {selected.channel === "whatsapp" ? <WhatsAppIcon /> : <InstagramIcon />}
              </div>
              <div>
                <div className="font-semibold text-[#134e4a] text-sm">{selected.contact_name || selected.contact_id}</div>
                <div className="text-[#64748b] text-xs capitalize">{selected.channel}</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messagesLoading ? (
                <div className="text-center text-[#64748b] text-sm py-8">Загрузка...</div>
              ) : messages.length === 0 ? (
                <div className="text-center text-[#64748b] text-sm py-8">Сообщений нет</div>
              ) : messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.direction === "out" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-sm px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.direction === "out"
                        ? "bg-[#0891b2] text-white rounded-br-sm"
                        : "bg-[#f0fdfa] text-[#134e4a] border border-[#ccfbf1] rounded-bl-sm"
                    }`}
                  >
                    {msg.body}
                    <div className={`text-[10px] mt-1 ${msg.direction === "out" ? "text-white/70" : "text-[#94a3b8]"} text-right`}>
                      {format(parseISO(msg.created_at), "HH:mm")}
                      {msg.direction === "out" && " · AI"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer info */}
            <div className="px-4 py-2.5 border-t border-[#ccfbf1] bg-[#f0fdfa] text-[#64748b] text-xs text-center flex-shrink-0">
              Ответы отправляются автоматически через AI-ассистента
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-[#64748b]">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">Выберите переписку</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
