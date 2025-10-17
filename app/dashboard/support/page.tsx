"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CheckCircle, Clock, XCircle, Search, Filter } from "lucide-react";
import { apiGet } from "@/lib/api";

interface Ticket {
  id: string;
  userEmail: string;
  subject: string;
  category: string;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
  updatedAt: string;
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // ✅ Attiveremo fetch reale dopo fix CORS:
    /*
    apiGet<Ticket[]>("/api/admin/support")
      .then(setTickets)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing UI
    setTimeout(() => {
      setTickets([
        {
          id: "t_001",
          userEmail: "mario.rossi@email.com",
          subject: "Carta non arrivata",
          category: "Ordini",
          status: "open",
          createdAt: "2025-01-12T09:32:00Z",
          updatedAt: "2025-01-13T14:05:00Z"
        },
        {
          id: "t_002",
          userEmail: "collector95@gmail.com",
          subject: "Errore su grading",
          category: "Sistema",
          status: "in_progress",
          createdAt: "2025-01-10T15:00:00Z",
          updatedAt: "2025-01-12T10:45:00Z"
        },
        {
          id: "t_003",
          userEmail: "lucia.bianchi@email.com",
          subject: "Richiesta rimborso",
          category: "Pagamenti",
          status: "closed",
          createdAt: "2025-01-08T11:20:00Z",
          updatedAt: "2025-01-11T16:30:00Z"
        },
        {
          id: "t_004",
          userEmail: "giovanni.verdi@email.com",
          subject: "Problema con autenticazione",
          category: "Account",
          status: "open",
          createdAt: "2025-01-14T08:15:00Z",
          updatedAt: "2025-01-14T08:15:00Z"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Filtri e ricerca
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Caricamento ticket...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">Errore: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Supporto & Segnalazioni</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-zinc-800 transition">
            Aggiorna
          </button>
          <button className="px-4 py-2 bg-yellow-400 text-black text-sm rounded-lg hover:bg-yellow-500 transition">
            Esporta CSV
          </button>
        </div>
      </header>

      {/* Filtri e ricerca */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca per email o oggetto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">Tutti gli stati</option>
              <option value="open">Aperti</option>
              <option value="in_progress">In corso</option>
              <option value="closed">Risolti</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistiche rapide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ticket Aperti</p>
              <p className="text-2xl font-bold text-red-600">
                {tickets.filter(t => t.status === "open").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Corso</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tickets.filter(t => t.status === "in_progress").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Risolti</p>
              <p className="text-2xl font-bold text-green-600">
                {tickets.filter(t => t.status === "closed").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabella ticket */}
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Utente</th>
              <th className="p-3 text-left">Oggetto</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-left">Stato</th>
              <th className="p-3 text-left">Ultimo aggiornamento</th>
              <th className="p-3 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Nessun ticket trovato con i filtri applicati"
                    : "Nessun ticket aperto"
                  }
                </td>
              </tr>
            ) : (
              filteredTickets.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-mono text-xs">{t.id}</td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{t.userEmail}</p>
                      <p className="text-xs text-gray-500">
                        Creato: {new Date(t.createdAt).toLocaleDateString("it-IT")}
                      </p>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="font-medium">{t.subject}</p>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {t.category}
                    </span>
                  </td>
                  <td className="p-3">
                    {getStatusBadge(t.status)}
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(t.updatedAt).toLocaleString("it-IT")}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition">
                        Dettagli
                      </button>
                      {t.status === "open" && (
                        <button className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded hover:bg-yellow-200 transition">
                          In Corso
                        </button>
                      )}
                      {t.status === "in_progress" && (
                        <button className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition">
                          Risolvi
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getStatusBadge(status: Ticket["status"]) {
  const styles = {
    open: "bg-red-100 text-red-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    closed: "bg-green-100 text-green-700",
  }[status];

  const icons = {
    open: <XCircle className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    closed: <CheckCircle className="w-4 h-4" />,
  }[status];

  const label = {
    open: "Aperto",
    in_progress: "In corso",
    closed: "Risolto",
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${styles}`}
    >
      {icons}
      {label}
    </span>
  );
}