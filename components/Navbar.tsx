"use client";
import { useNotifications } from "@/lib/hooks/useNotifications";
import AdminNotifications from "./AdminNotifications";

export default function Navbar() {
  const { isConnected } = useNotifications();

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex gap-6 text-sm items-center">
      <a href="/dashboard" className="hover:text-yellow-400">Dashboard</a>
      <a href="/admin" className="hover:text-yellow-400">Admin</a>
      <a href="/market" className="hover:text-yellow-400">Market</a>
      <a href="/support" className="hover:text-yellow-400">Support</a>
      <a href="/users" className="hover:text-yellow-400">Utenti</a>
      <a href="/notifications" className="hover:text-yellow-400">Notifiche</a>
      <a href="/cleanup" className="hover:text-yellow-400">Cleanup</a>
      <a href="/test-backend" className="hover:text-yellow-400">Test Backend</a>
      <a href="/notifications-panel" className="hover:text-yellow-400">Panel Notifiche</a>
      <a href="/settings" className="hover:text-yellow-400 ml-auto">Impostazioni</a>
      
      {/* Notifiche Admin */}
      <div className="ml-4">
        <AdminNotifications />
      </div>
      
      {/* Indicatore connessione SSE */}
      <div className="flex items-center gap-2 ml-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-xs text-gray-400">
          {isConnected ? 'Connesso' : 'Disconnesso'}
        </span>
      </div>
    </nav>
  );
}
