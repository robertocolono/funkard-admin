"use client";

import { useState } from "react";
import { mockTickets } from "@/lib/mockTickets";
import { SupportTicket } from "@/types/SupportTicket";
import { Mail, MessageSquare, CheckCircle, Archive, Clock, XCircle, User, Calendar, AlertTriangle } from "lucide-react";

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [filter, setFilter] = useState<"all" | "open" | "pending" | "resolved">("all");

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
  };

  const archiveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "archived", updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      open: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
      resolved: "bg-green-100 text-green-700",
      archived: "bg-gray-100 text-gray-700",
    }[status];

    const icons = {
      open: <XCircle className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      resolved: <CheckCircle className="w-4 h-4" />,
      archived: <Archive className="w-4 h-4" />,
    }[status];

    const label = {
      open: "Aperto",
      pending: "In attesa",
      resolved: "Risolto",
      archived: "Archiviato",
    }[status];

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${styles}`}>
        {icons}
        {label}
      </span>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 border-red-500";
      case "medium":
        return "text-yellow-600 border-yellow-600";
      case "low":
        return "text-green-600 border-green-600";
      default:
        return "text-gray-500 border-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" /> Supporto & Segnalazioni
        </h1>

        {/* Filtri */}
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
              <XCircle className="w-5 h-5 text-red-600" />
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

      {/* Lista ticket */}
      <div className="grid gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`border-l-4 rounded-xl border bg-white shadow-sm ${
              t.priority === "high"
                ? "border-red-500"
                : t.priority === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <div className="p-4 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold">{t.subject}</h3>
                  {getStatusBadge(t.status)}
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(t.priority)}`}>
                    Priorità: {t.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{t.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {t.user.name} ({t.user.email})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(t.createdAt).toLocaleString("it-IT")}
                  </span>
                  {t.category && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {t.category.toUpperCase()}
                    </span>
                  )}
                </div>
                {t.adminResponse && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-800 mb-1">Risposta Admin:</p>
                    <p className="text-sm text-blue-700">{t.adminResponse.message}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {new Date(t.adminResponse.timestamp).toLocaleString("it-IT")}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                {t.status !== "resolved" && (
                  <button
                    onClick={() => markAsResolved(t.id)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs hover:bg-green-200 transition flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Risolvi
                  </button>
                )}
                {t.status !== "archived" && (
                  <button
                    onClick={() => archiveTicket(t.id)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200 transition flex items-center gap-1"
                  >
                    <Archive className="w-4 h-4" />
                    Archivia
                  </button>
                )}
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
    </div>
  );
}