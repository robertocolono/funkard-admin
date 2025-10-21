'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  LogOut,
  Shield,
  Wifi,
  WifiOff,
  Terminal,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<string>('guest');
  const [sseStatus, setSseStatus] = useState<'online' | 'offline'>('offline');
  const [debugEvents, setDebugEvents] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('funkard_admin_role') || 'guest';
      const adminId = localStorage.getItem('funkard_admin_id') || 'test';
      setRole(storedRole);

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/support/stream?userId=${adminId}&role=${storedRole}`;
      const es = new EventSource(url);

      setSseStatus('online');
      console.log('[SSE] Connessione stabilita con', url);

      es.onmessage = (event) => {
        setSseStatus('online');
        const msg = `[${new Date().toLocaleTimeString('it-IT')}] ${event.data}`;
        console.log('%c[SSE Event]', 'color: #facc15;', msg);

        // Salva ultimi 5 eventi
        setDebugEvents((prev) => {
          const updated = [msg, ...prev].slice(0, 5);
          return updated;
        });
      };

      es.onerror = () => {
        setSseStatus('offline');
        console.warn('[SSE] Disconnesso, tentativo di riconnessione...');
      };

      const timer = setInterval(() => {
        if (es.readyState === EventSource.CLOSED) setSseStatus('offline');
      }, 30000);

      return () => {
        es.close();
        clearInterval(timer);
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('funkard_admin_token');
    localStorage.removeItem('funkard_admin_role');
    localStorage.removeItem('funkard_admin_id');
    window.location.href = '/admin/login';
  };


  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/70 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-yellow-500 font-bold tracking-wide text-lg">
            Funkard Admin
          </Link>

          <nav className="flex items-center gap-4 text-sm text-gray-400">
            <Link
              href="/dashboard/support"
              className={`hover:text-yellow-400 transition ${
                pathname.includes('/support') ? 'text-yellow-400 font-medium' : ''
              }`}
            >
              Support
            </Link>
            <Link
              href="/dashboard/stats"
              className={`hover:text-yellow-400 transition ${
                pathname.includes('/stats') ? 'text-yellow-400 font-medium' : ''
              }`}
            >
              Statistiche
            </Link>
          </nav>
        </div>

        {/* Role + SSE + Logout */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-800 border border-neutral-700">
            <Shield size={14} className="text-yellow-500" />
            <span
              className={`uppercase font-medium ${
                role === 'super_admin'
                  ? 'text-yellow-400'
                  : role === 'admin'
                  ? 'text-blue-400'
                  : role === 'support'
                  ? 'text-green-400'
                  : 'text-gray-500'
              }`}
            >
              {role}
            </span>

            {sseStatus === 'online' ? (
              <div className="flex items-center text-green-400 text-xs gap-1">
                <Wifi size={12} /> Online
              </div>
            ) : (
              <div className="flex items-center text-red-400 text-xs gap-1">
                <WifiOff size={12} /> Offline
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition"
          >
            <LogOut size={14} />
            Esci
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>

      {/* SSE Debug Console (solo in dev) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-neutral-900/90 border border-neutral-700 rounded-lg p-3 w-[320px] max-h-[220px] overflow-y-auto text-xs font-mono text-gray-300 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 text-yellow-400">
              <Terminal size={12} /> SSE Debug Console
            </div>
            <button
              onClick={() => setDebugEvents([])}
              className="text-gray-500 hover:text-red-400 text-[10px]"
            >
              Pulisci
            </button>
          </div>

          {debugEvents.length > 0 ? (
            debugEvents.map((evt, i) => (
              <div key={i} className="text-gray-400 border-t border-neutral-800 pt-1 mt-1">
                {evt}
              </div>
            ))
          ) : (
            <div className="text-gray-600 italic">Nessun evento ricevuto</div>
          )}
        </div>
      )}
    </div>
  );
}