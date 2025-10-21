'use client';

import { useEffect, useState } from 'react';
import { fetchSupportStats } from '@/lib/funkardApi';
import { Loader2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function StatsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSupportStats();
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400">
        <Loader2 className="animate-spin mr-2" /> Caricamento statistiche...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-yellow-500">Statistiche Supporto</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4">
          <div className="text-sm text-gray-400">Totale Ticket</div>
          <div className="text-2xl font-bold text-gray-100">{stats.total}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4">
          <div className="text-sm text-gray-400">Aperti</div>
          <div className="text-2xl font-bold text-yellow-500">{stats.open}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4">
          <div className="text-sm text-gray-400">Risolti</div>
          <div className="text-2xl font-bold text-green-500">{stats.resolved}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4">
          <div className="text-sm text-gray-400">Tempo medio risposta</div>
          <div className="text-2xl font-bold text-gray-100">{stats.avgResponseTime}m</div>
        </div>
      </div>

      {/* Grafico */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4">
        <h2 className="text-sm font-medium text-gray-300 mb-4">Andamento ultimi 30 giorni</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.trend}>
              <defs>
                <linearGradient id="colorTicket" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f2b237" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f2b237" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="date" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
              <Area
                type="monotone"
                dataKey="tickets"
                stroke="#f2b237"
                fillOpacity={1}
                fill="url(#colorTicket)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
