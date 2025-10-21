'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { fetchAllTickets } from '@/lib/funkardApi';
import Link from 'next/link';

interface Ticket {
  id: string;
  subject: string;
  email: string;
  status: string;
  updatedAt: string;
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllTickets({ search, status });
        setTickets(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search, status]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl font-semibold text-yellow-500">Gestione Ticket</h1>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cerca per email o oggetto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 rounded-md text-sm text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          >
            <option value="">Tutti</option>
            <option value="NEW">Nuovi</option>
            <option value="IN_PROGRESS">In lavorazione</option>
            <option value="RESOLVED">Risolti</option>
            <option value="CLOSED">Chiusi</option>
          </select>
        </div>
      </div>

      {/* Tabella */}
      <div className="border border-neutral-800 rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 text-gray-400 border-b border-neutral-800">
            <tr>
              <th className="text-left py-3 px-4 font-medium">ID</th>
              <th className="text-left py-3 px-4 font-medium">Oggetto</th>
              <th className="text-left py-3 px-4 font-medium">Email</th>
              <th className="text-left py-3 px-4 font-medium">Stato</th>
              <th className="text-left py-3 px-4 font-medium">Ultimo aggiornamento</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  <Loader2 className="inline mr-2 animate-spin" size={16} />
                  Caricamento ticket...
                </td>
              </tr>
            ) : tickets.length > 0 ? (
              tickets.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-neutral-800 hover:bg-neutral-900 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-400">{t.id}</td>
                  <td className="py-3 px-4 text-gray-100 font-medium">
                    <Link href={`/dashboard/support/${t.id}`} className="hover:text-yellow-500">
                      {t.subject}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{t.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        t.status === 'NEW'
                          ? 'bg-red-500/20 text-red-400'
                          : t.status === 'IN_PROGRESS'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : t.status === 'RESOLVED'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-neutral-700/30 text-gray-400'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(t.updatedAt).toLocaleString('it-IT')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Nessun ticket trovato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}