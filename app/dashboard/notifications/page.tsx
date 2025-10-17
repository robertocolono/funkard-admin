"use client";

import { useState } from "react";
import { mockNotifications } from "@/lib/mockNotifications";
import { AdminNotification } from "@/types/Notification";
import { Bell, CheckCircle, XCircle, AlertTriangle, ShoppingBag, MessageSquare, Database, Wrench } from "lucide-react";

export default function NotificationsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "resolved">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "error" | "market" | "support" | "grading" | "system">("all");
  const [notifications, setNotifications] = useState<AdminNotification[]>(mockNotifications);

  const filtered = notifications.filter(
    (n) =>
      (statusFilter === "all" || n.status === statusFilter) &&
      (typeFilter === "all" || n.type === typeFilter)
  );

  const markAsResolved = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, status: "resolved", resolvedAt: new Date().toISOString() }
          : n
      )
    );
  };

  const markAsArchived = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: "archived" } : n
      )
    );
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      market: <ShoppingBag className="w-4 h-4" />,
      support: <MessageSquare className="w-4 h-4" />,
      error: <AlertTriangle className="w-4 h-4" />,
      system: <Database className="w-4 h-4" />,
      grading: <Wrench className="w-4 h-4" />,
    };
    return icons[type] || <Bell className="w-4 h-4" />;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      market: "bg-blue-100 text-blue-700",
      support: "bg-green-100 text-green-700",
      error: "bg-red-100 text-red-700",
      system: "bg-gray-100 text-gray-700",
      grading: "bg-purple-100 text-purple-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6" /> Notifiche Admin
        </h1>

        {/* Filtri */}
        <div className="flex flex-wrap gap-2">
          {/* Filtro per Stato */}
          <div className="flex gap-1">
            {["all", "unread", "resolved"].map((f) => (
              <button
                key={f}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  statusFilter === f
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setStatusFilter(f as any)}
              >
                {f === "all" ? "Tutte" : f === "unread" ? "Non lette" : "Risolte"}
              </button>
            ))}
          </div>

          {/* Filtro per Tipo */}
          <select
            className="border border-gray-300 rounded-md text-sm px-3 py-1 bg-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="all">Tutti i tipi</option>
            <option value="error">Errori</option>
            <option value="market">Mercato</option>
            <option value="support">Supporto</option>
            <option value="grading">Grading</option>
            <option value="system">Sistema</option>
          </select>
        </div>
      </div>

      {/* Statistiche rapide */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Non lette</p>
              <p className="text-2xl font-bold text-red-600">
                {notifications.filter(n => n.status === "unread").length}
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
              <p className="text-sm text-gray-600">Risolte</p>
              <p className="text-2xl font-bold text-green-600">
                {notifications.filter(n => n.status === "resolved").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Alta priorità</p>
              <p className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.importance === "high" && n.status === "unread").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Totale</p>
              <p className="text-2xl font-bold text-blue-600">
                {notifications.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista notifiche */}
      <div className="grid gap-4">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`border-l-4 rounded-xl border bg-white shadow-sm ${
              n.importance === "high"
                ? "border-red-500"
                : n.importance === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <div className="flex justify-between items-start p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(n.type)}
                  <h3 className="font-semibold">{n.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(n.type)}`}>
                    {n.type.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    n.importance === "high" ? "bg-red-100 text-red-700" :
                    n.importance === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {n.importance.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{n.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Creato: {new Date(n.createdAt).toLocaleString("it-IT")}</span>
                  {n.resolvedAt && (
                    <span>Risolto: {new Date(n.resolvedAt).toLocaleString("it-IT")}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {n.status === "unread" && (
                  <button
                    onClick={() => markAsResolved(n.id)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs hover:bg-green-200 transition flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Risolvi
                  </button>
                )}
                <button
                  onClick={() => markAsArchived(n.id)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200 transition flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  Archivia
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nessuna notifica trovata con i filtri selezionati.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}