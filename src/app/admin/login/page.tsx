"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Неверный логин или пароль");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0fdfa] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg border border-[#ccfbf1] w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#16a34a] flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" />
            </svg>
          </div>
          <div>
            <div className="font-[family-name:var(--font-figtree)] font-bold text-[#134e4a] text-lg leading-none">МедПрайм</div>
            <div className="text-[#64748b] text-xs">Панель управления</div>
          </div>
        </div>

        <h1 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-xl text-center mb-6">Вход</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#134e4a] mb-1.5">Логин</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl border border-[#ccfbf1] text-[#134e4a] bg-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30 focus:border-[#0891b2] transition-all text-sm min-h-[44px]"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#134e4a] mb-1.5">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl border border-[#ccfbf1] text-[#134e4a] bg-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30 focus:border-[#0891b2] transition-all text-sm min-h-[44px]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0891b2] hover:bg-[#0e7490] text-white font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0891b2]/30"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Входим...
              </>
            ) : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
