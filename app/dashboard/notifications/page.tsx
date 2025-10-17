"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCircle, Trash2, AlertTriangle, Info, Loader2, MessageSquare, ShoppingBag, Database } from "lucide-react";
import { apiGet, apiDelete } from "@/lib/api";

interface AdminNotification {
  id: string;
  type: "error" | "market" | "support" | "system";
  title: string;
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  createdAt: string;
  resolved: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [filter, setFilter] = useState<"all" | "resolved" | "unresolved">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ STREAM REALE — si attiverà dopo fix CORS
    /*
    const evtSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/stream`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
    });

    evtSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setNotifications((prev) => [data, ...prev]);
      } catch (err) {
        console.error("Errore stream:", err);
      }
    };

    evtSource.onerror = (err) => console.error("SSE errore:", err);
    return () => evtSource.close();
    */

    // Mock temporaneo fino al fix:
    setTimeout(() => {
      setNotifications([
        {
          id: "n1",
          type: "error",
          title: "Errore connessione DB",
          message: "Tentativo fallito di connessione al database PostgreSQL.",
          severity: "critical",
          createdAt: new Date().toISOString(),
          resolved: false,
        },
        {
          id: "n2",
          type: "market",
          title: "Nuovo prodotto in revisione",
          message: "Carta 'Blue-Eyes White Dragon' in attesa di verifica.",
          severity: "medium",
          createdAt: new Date().toISOString(),
          resolved: false,
        },
        {
          id: "n3",
          type: "support",
          title: "Nuovo ticket supporto",
          message: "Ticket #t_004 creato da giovanni.verdi@email.com",
          severity: "high",
          createdAt: new Date(Date.now() - 300000).toISOString(),
          resolved: false,
        },
        {
          id: "n4",
          type: "system",
          title: "Backup completato",
          message: "Backup automatico del database completato con successo.",
          severity: "low",
          createdAt: new Date(Date.now() - 600000).toISOString(),
          resolved: true,
        },
        {
          id: "n5",
          type: "market",
          title: "Prodotto approvato",
          message: "Carta 'Charizard Holo' approvata e pubblicata.",
          severity: "medium",
          createdAt: new Date(Date.now() - 900000).toISOString(),
          resolved: true,
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleResolve = async (id: string) => {
    try {
      // ✅ API reale pronta
      // await apiDelete(`/api/admin/notifications/${id}/resolve`);
      
      // Mock temporaneo
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, resolved: true } : n))
      );
    } catch (err) {
      console.error("Errore risoluzione notifica:", err);
      setError("Errore nella risoluzione della notifica");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // ✅ API reale pronta
      // await apiDelete(`/api/admin/notifications/${id}`);
      
      // Mock temporaneo
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Errore eliminazione notifica:", err);
      setError("Errore nell'eliminazione della notifica");
    }
  };

  const handleResolveAll = async () => {
    try {
      // ✅ API reale pronta
      // await apiPost("/api/admin/notifications/resolve-all");
      
      // Mock temporaneo
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, resolved: true }))
      );
    } catch (err) {
      console.error("Errore risoluzione tutte:", err);
      setError("Errore nella risoluzione di tutte le notifiche");
    }
  };

  const handleDeleteAll = async () => {
    try {
      // ✅ API reale pronta
      // await apiDelete("/api/admin/notifications/delete-all");
      
      // Mock temporaneo
      setNotifications([]);
    } catch (err) {
      console.error("Errore eliminazione tutte:", err);
      setError("Errore nell'eliminazione di tutte le notifiche");
    }
  };

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => (filter === "resolved" ? n.resolved : !n.resolved));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">Errore: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Chiudi
        </button>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notifiche Admin
        </h2>
        <div className="flex gap-2">
          {["all", "unresolved", "resolved"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 text-sm rounded-md transition ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilter(f as any)}
            >
              {f === "all"
                ? "Tutte"
                : f === "unresolved"
                ? "Non risolte"
                : "Risolte"}
            </button>
          ))}
        </div>
      </header>

      {/* Statistiche rapide */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Non risolte</p>
              <p className="text-2xl font-bold text-red-600">
                {notifications.filter(n => !n.resolved).length}
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
                {notifications.filter(n => n.resolved).length}
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
              <p className="text-sm text-gray-600">Critiche</p>
              <p className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.severity === "critical" && !n.resolved).length}
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

      {/* Azioni di massa */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Azioni di massa</h3>
          <div className="flex gap-2">
            <button
              onClick={handleResolveAll}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Risolvi tutte
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Elimina tutte
            </button>
          </div>
        </div>
      </div>

      {/* Lista notifiche */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              Nessuna notifica da mostrare
            </p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-center border rounded-xl p-4 transition ${
                n.resolved ? "bg-gray-100 opacity-70" : "bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-3">
                {getIcon(n.type, n.severity)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{n.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(n.severity)}`}>
                      {n.severity.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {n.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{n.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString("it-IT")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {!n.resolved && (
                  <button
                    onClick={() => handleResolve(n.id)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs hover:bg-green-200 transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs hover:bg-red-200 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function getIcon(type: string, severity: string) {
  const color =
    severity === "critical"
      ? "text-red-600"
      : severity === "high"
      ? "text-orange-500"
      : severity === "medium"
      ? "text-yellow-500"
      : "text-blue-500";

  const icons: Record<string, JSX.Element> = {
    error: <AlertTriangle className={`w-5 h-5 ${color}`} />,
    market: <ShoppingBag className={`w-5 h-5 ${color}`} />,
    support: <MessageSquare className={`w-5 h-5 ${color}`} />,
    system: <Database className={`w-5 h-5 ${color}`} />,
  };
  return icons[type] || <Info className={`w-5 h-5 ${color}`} />;
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}