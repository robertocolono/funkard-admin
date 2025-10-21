'use client';

import { useTickets } from '@/hooks/useTickets';
import Link from 'next/link';
import { MessageSquare, RefreshCw, Filter, Search } from 'lucide-react';

export default function SupportDashboardPage() {
  const { tickets, loading, error, filters, setFilters, reload } = useTickets();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-yellow-500" /> Gestione Ticket
          </h1>
          <button
            onClick={reload}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Aggiorna
          </button>
        </div>

        {/* FILTRI AVANZATI */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Filtri e Ricerca</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca per email o oggetto..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 px-10 py-2 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            <select
              value={filters.status || ''}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Tutti gli stati</option>
              <option value="NEW">Nuovi</option>
              <option value="IN_PROGRESS">In corso</option>
              <option value="RESOLVED">Risolti</option>
              <option value="CLOSED">Chiusi</option>
            </select>

            <select
              value={filters.priority || ''}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Tutte le priorità</option>
              <option value="LOW">Bassa</option>
              <option value="NORMAL">Normale</option>
              <option value="HIGH">Alta</option>
              <option value="URGENT">Urgente</option>
            </select>

            <select
              value={filters.category || ''}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Tutte le categorie</option>
              <option value="TECHNICAL">Tecnico</option>
              <option value="BILLING">Pagamenti</option>
              <option value="GENERAL">Generale</option>
              <option value="GRADING">Grading</option>
            </select>
          </div>
        </div>

        {/* STATISTICHE RAPIDE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {tickets.filter(t => t.status === 'NEW').length}
            </div>
            <div className="text-sm text-gray-400">Nuovi</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">
              {tickets.filter(t => t.status === 'IN_PROGRESS').length}
            </div>
            <div className="text-sm text-gray-400">In corso</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              {tickets.filter(t => t.status === 'RESOLVED').length}
            </div>
            <div className="text-sm text-gray-400">Risolti</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-400">
              {tickets.filter(t => t.status === 'CLOSED').length}
            </div>
            <div className="text-sm text-gray-400">Chiusi</div>
          </div>
        </div>

        {/* LISTA TICKET */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              Caricamento ticket...
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-lg">Nessun ticket trovato</p>
            <p className="text-sm">Prova a modificare i filtri di ricerca</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/dashboard/support/${ticket.id}`}
                className="block bg-zinc-900 border border-zinc-800 hover:border-yellow-500/40 rounded-xl p-4 transition-all duration-200 hover:bg-zinc-800/50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{ticket.subject}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === 'URGENT'
                            ? 'bg-red-500/20 text-red-400'
                            : ticket.priority === 'HIGH'
                            ? 'bg-orange-500/20 text-orange-400'
                            : ticket.priority === 'NORMAL'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{ticket.email}</p>
                    <p className="text-xs text-gray-500">
                      {ticket.category} • {new Date(ticket.createdAt).toLocaleString('it-IT')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        ticket.status === 'NEW'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : ticket.status === 'IN_PROGRESS'
                          ? 'bg-blue-500/20 text-blue-400'
                          : ticket.status === 'RESOLVED'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {ticket.status}
                    </span>
                    {ticket.assignedTo && (
                      <span className="text-xs text-gray-500">
                        Assegnato a {ticket.assignedTo}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}