"use client";

import { useEffect, useState } from "react";
import { getStats, getMarketOverview, getSupportStats } from "@/lib/api";
import { useNotifications } from "@/lib/hooks/useNotifications";
import CardStat from "@/components/CardStat";
import NotificationTest from "@/components/NotificationTest";
import ToastTest from "@/components/ToastTest";
import ApiStatus from "@/components/ApiStatus";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [supportData, setSupportData] = useState<any[]>([]);
  const { isConnected } = useNotifications();

  useEffect(() => {
    getStats().then(setStats);
    getMarketOverview().then(setMarketData);
    getSupportStats().then(setSupportData);
  }, []);

  if (!stats) return <p className="text-gray-400">Caricamento dati...</p>;

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold mb-2 text-yellow-400">📊 Dashboard Funkard Admin</h1>
        <p className="text-gray-400 text-sm">Controllo operativo e stato del sistema in tempo reale</p>
      </div>

      {/* STAT BOXES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CardStat title="Utenti" value={stats.users} />
        <CardStat title="Carte" value={stats.cards} />
        <CardStat title="Pending" value={stats.pending} />
        <CardStat title="Ticket aperti" value={stats.tickets} />
      </div>

      {/* API STATUS */}
      <div className="grid md:grid-cols-2 gap-4">
        <ApiStatus />
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">🔔 Sistema Notifiche</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm">
                {isConnected ? 'Connesso alle notifiche real-time' : 'Disconnesso dalle notifiche'}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Server-Sent Events per notifiche in tempo reale
            </p>
          </div>
        </div>
      </div>

      {/* MARKET TREND */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-yellow-400">📈 Andamento Market (ultimi 7 giorni)</h2>
        {marketData.length === 0 ? (
          <p className="text-gray-500">Nessun dato disponibile.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1c1c1c", border: "1px solid #333" }}
              />
              <Line type="monotone" dataKey="newProducts" stroke="#facc15" name="Nuovi prodotti" />
              <Line type="monotone" dataKey="pendingItems" stroke="#f87171" name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </section>

      {/* SUPPORT TICKETS */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-yellow-400">🎧 Ticket Supporto (ultimi 30 giorni)</h2>
        {supportData.length === 0 ? (
          <p className="text-gray-500">Nessun dato disponibile.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={supportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1c1c1c", border: "1px solid #333" }}
              />
              <Bar dataKey="opened" fill="#f87171" name="Aperti" />
              <Bar dataKey="closed" fill="#4ade80" name="Chiusi" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>

      {/* INFO NOTIFICHE */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-yellow-400">🔔 Sistema Notifiche</h2>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-xs text-gray-400">
              {isConnected ? 'Connesso in tempo reale' : 'Disconnesso'}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          <p>• Le notifiche vengono ricevute in tempo reale tramite Server-Sent Events</p>
          <p>• Clicca sulla campanella nella navbar per visualizzare tutte le notifiche</p>
          <p>• Le notifiche vengono automaticamente aggiornate quando il backend le crea</p>
        </div>
      </section>

      {/* TEST NOTIFICHE */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
        <NotificationTest />
      </section>

      {/* TEST TOAST */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
        <ToastTest />
      </section>
    </div>
  );
}
