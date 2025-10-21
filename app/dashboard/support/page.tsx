'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { MessageSquare, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function SupportAdminPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  const fetchTickets = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/support/tickets`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error('Errore nel caricamento');
      const data = await res.json();

      // 🔍 Verifica nuovi ticket o messaggi
      const fresh = data.filter((t: any) => t.status === 'NEW' || t.hasNewMessages);
      const prevCount = newCount;

      if (fresh.length > prevCount && !loading) {
        const diff = fresh.length - prevCount;

        // 🔔 Toast + suono
        toast.success(`📨 ${diff} nuovo${diff > 1 ? 'i' : ''} ticket o messaggio`, {
          style: { background: '#1a1a1a', color: '#fff' },
        });

        const sound = new Audio('/sounds/admin-notification.mp3');
        sound.volume = 0.4;
        sound.play().catch(() => {});
      }

      setNewCount(fresh.length);
      setTickets(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [loading, newCount]);

  // 🧭 Polling
  useEffect(() => {
    if (!isOnline) return;
    fetchTickets();
    const interval = setInterval(fetchTickets, 5000);
    return () => clearInterval(interval);
  }, [fetchTickets, isOnline]);

  // 🌐 Rileva online/offline
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Caricamento ticket...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-yellow-500" /> Ticket di supporto
        </h1>
        <div className="flex items-center gap-4">
          {isOnline ? (
            <span className="text-green-400 text-sm">🟢 Online</span>
          ) : (
            <span className="text-red-400 text-sm">🔴 Offline</span>
          )}
          <button
            onClick={fetchTickets}
            className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            <RefreshCw className="w-4 h-4" /> Aggiorna
          </button>
        </div>
      </div>

      {/* Badge nuovi ticket */}
      {newCount > 0 && (
        <div className="mb-4 text-yellow-400 font-medium">
          🔔 {newCount} ticket con nuovi messaggi
        </div>
      )}

      {/* Lista ticket */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map((t) => (
          <Link key={t.id} href={`/dashboard/support/${t.id}`}>
            <div
              className={`p-4 rounded-xl border transition-colors ${
                t.status === 'NEW' || t.hasNewMessages
                  ? 'border-yellow-500/50 bg-zinc-900'
                  : 'border-zinc-800 bg-zinc-900/50'
              } hover:border-yellow-400`}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-white">{t.subject}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    t.status === 'NEW'
                      ? 'bg-yellow-600/20 text-yellow-400'
                      : t.status === 'IN_PROGRESS'
                      ? 'bg-blue-600/20 text-blue-400'
                      : t.status === 'RESOLVED'
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-zinc-700/20 text-zinc-400'
                  }`}
                >
                  {t.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                {t.preview || 'Nessun messaggio recente'}
              </p>
              <div className="text-xs text-gray-500">
                {new Date(t.createdAt).toLocaleString('it-IT')}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          Nessun ticket presente 📭
        </div>
      )}
    </div>
  );
}