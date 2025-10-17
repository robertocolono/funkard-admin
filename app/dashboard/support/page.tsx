"use client";

import { useState, useEffect } from "react";
import { getSupportTickets, respondToTicket, closeTicket } from "@/services/adminService";
import { SupportTicket } from "@/types/SupportTicket";
import {
  MessageSquare,
  CheckCircle,
  Archive,
  X,
  Mail,
  Clock,
  User,
} from "lucide-react";

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "pending" | "resolved">("all");
  const [selected, setSelected] = useState<SupportTicket | null>(null);
  const [reply, setReply] = useState("");

  // Carica ticket dal backend
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await getSupportTickets();
        setTickets(data);
      } catch (err) {
        console.error("❌ Errore caricamento ticket:", err);
        // Fallback a mock data se API non disponibile
        setTickets([
          {
            id: "1",
            user: { id: "u1", name: "Luca Rossi", email: "luca@example.com" },
            subject: "Problema con pagamento",
            message: "Ho completato il pagamento ma l'ordine non risulta.",
            createdAt: "2025-10-16T14:25:00Z",
            status: "open",
            priority: "medium",
          },
        ]);
      }
    };

    loadTickets();
  }, []);

  const filtered = tickets.filter(
    (t) => filter === "all" || t.status === filter
  );

  const markAsResolved = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "resolved", updatedAt: new Date().toISOString() }
          : t
      )
    );
    setSelected(null);
  };

  const archiveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "archived", updatedAt: new Date().toISOString() }
          : t
      )
    );
    setSelected(null);
  };

  const handleReply = () => {
    if (!reply.trim()) return;
    console.log("Mock risposta:", reply);
    setReply("");
    setSelected(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" /> Supporto & Segnalazioni
        </h1>

        <div className="flex flex-wrap gap-2">
          {["all", "open", "pending", "resolved"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 text-sm rounded-md transition ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilter(f as any)}
            >
              {f === "all" ? "Tutti" : f === "open" ? "Aperti" : f === "pending" ? "In attesa" : "Risolti"}
            </button>
          ))}
        </div>
      </div>

      {/* Statistiche rapide */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Aperti</p>
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
              <p className="text-sm text-gray-600">In attesa</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tickets.filter(t => t.status === "pending").length}
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
                {tickets.filter(t => t.status === "resolved").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Totale</p>
              <p className="text-2xl font-bold text-blue-600">
                {tickets.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista Ticket */}
      <div className="grid gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`border-l-4 rounded-xl border bg-white shadow-sm transition hover:shadow-md cursor-pointer ${
              t.priority === "high"
                ? "border-red-500"
                : t.priority === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
            onClick={() => setSelected(t)}
          >
            <div className="p-4 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold">{t.subject}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    t.status === "open" ? "bg-red-100 text-red-700" :
                    t.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    t.status === "resolved" ? "bg-green-100 text-green-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {t.status.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    t.priority === "high" ? "bg-red-100 text-red-700" :
                    t.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    Priorità: {t.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{t.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {t.user.name} ({t.user.email})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(t.createdAt).toLocaleString("it-IT")}
                  </span>
                  {t.category && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {t.category.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nessun ticket trovato con i filtri selezionati.
            </p>
          </div>
        )}
      </div>

      {/* Modale Dettaglio Ticket */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selected.subject}</h2>
                  <p className="text-sm text-gray-600">
                    Ticket inviato da <span className="font-medium">{selected.user.name}</span> ({selected.user.email})
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenuto */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{selected.message}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selected.status === "open" ? "bg-red-100 text-red-700" :
                    selected.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    selected.status === "resolved" ? "bg-green-100 text-green-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {selected.status.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selected.priority === "high" ? "bg-red-100 text-red-700" :
                    selected.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    Priorità: {selected.priority.toUpperCase()}
                  </span>
                  {selected.category && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {selected.category.toUpperCase()}
                    </span>
                  )}
                </div>

                {selected.adminResponse && (
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-800 mb-1">Risposta Admin:</p>
                    <p className="text-sm text-blue-700">{selected.adminResponse.message}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {new Date(selected.adminResponse.timestamp).toLocaleString("it-IT")}
                    </p>
                  </div>
                )}

                {/* Campo risposta */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Rispondi al ticket</h4>
                  <textarea
                    placeholder="Scrivi una risposta..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[100px]"
                  />
                </div>
              </div>

              {/* Footer con azioni */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <div className="flex gap-2">
                  <button
                    onClick={handleReply}
                    disabled={!reply.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4" />
                    Invia risposta
                  </button>
                  <button
                    onClick={() => markAsResolved(selected.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Risolvi
                  </button>
                  <button
                    onClick={() => archiveTicket(selected.id)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-1"
                  >
                    <Archive className="w-4 h-4" />
                    Archivia
                  </button>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
