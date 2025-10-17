"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Archive,
  EyeOff,
  ShoppingBag,
  MessageSquare,
  Database,
  Wrench,
  History,
} from "lucide-react";
import Link from "next/link";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "ERROR" | "MARKET" | "SUPPORT" | "SYSTEM" | "GRADING";
  priority: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  read_status: boolean;
  created_at: string;
}

// --- Fetch iniziale ---
async function fetchAdminNotifications(token: string): Promise<Notification[]> {
  const res = await fetch("https://funkard-api.onrender.com/api/admin/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Errore nel caricamento notifiche");
  return res.json();
}

// --- Segna come letta ---
async function markAsRead(token: string, id: number) {
  const res = await fetch(`https://funkard-api.onrender.com/api/admin/notifications/${id}/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Errore nel segnare come letta");
}

// --- Archivia notifica ---
async function archiveNotification(token: string, id: number) {
  const res = await fetch(`https://funkard-api.onrender.com/api/admin/notifications/${id}/archive`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Errore nell'archiviazione");
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";

  // --- Caricamento iniziale ---
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAdminNotifications(token);
        setNotifications(data);
      } catch (err) {
        console.error("❌ Errore fetch notifiche:", err);
        // Fallback a mock data se API non disponibile
        setNotifications([
          {
            id: 1,
            title: "Errore connessione DB",
            message: "Tentativo fallito di connessione al database PostgreSQL. Riprovare più tardi.",
            type: "ERROR",
            priority: "HIGH",
            read_status: false,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            title: "Nuova carta caricata",
            message: "L'utente mario.rossi ha caricato una nuova carta Charizard PSA 10.",
            type: "MARKET",
            priority: "MEDIUM",
            read_status: false,
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 3,
            title: "Ticket supporto aperto",
            message: "Nuovo ticket di supporto da lucia.bianchi per problema con pagamento.",
            type: "SUPPORT",
            priority: "LOW",
            read_status: true,
            created_at: new Date(Date.now() - 7200000).toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  // --- Stream SSE realtime ---
  useEffect(() => {
    const source = new EventSource(
      "https://funkard-api.onrender.com/api/admin/notifications/stream",
      { withCredentials: false }
    );

    source.onmessage = (event) => {
      try {
        const newNotif: Notification = JSON.parse(event.data);
        console.log("🔔 Nuova notifica in arrivo:", newNotif);
        setNotifications((prev) => [newNotif, ...prev]);
      } catch (err) {
        console.error("Errore parsing notifica:", err);
      }
    };

    source.onerror = (err) => {
      console.error("❌ Errore SSE:", err);
      source.close();
    };

    return () => source.close();
  }, []);

  // --- Filtri combinati ---
  const filtered = notifications.filter((n) => {
    const priorityMatch = filter === "ALL" || n.priority === filter;
    const typeMatch = typeFilter === "ALL" || n.type === typeFilter;
    return priorityMatch && typeMatch;
  });

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(token, id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_status: true } : n
        )
      );
    } catch (err) {
      console.error("Errore markAsRead:", err);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await archiveNotification(token, id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Errore archive:", err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ERROR":
        return <AlertTriangle className="text-red-500 w-5 h-5" />;
      case "MARKET":
        return <ShoppingBag className="text-yellow-400 w-5 h-5" />;
      case "SUPPORT":
        return <MessageSquare className="text-blue-500 w-5 h-5" />;
      case "SYSTEM":
        return <Database className="text-green-500 w-5 h-5" />;
      case "GRADING":
        return <Wrench className="text-purple-500 w-5 h-5" />;
      default:
        return <Info className="text-gray-500 w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "border-red-500 bg-red-50";
      case "MEDIUM":
        return "border-yellow-400 bg-yellow-50";
      case "LOW":
        return "border-blue-400 bg-blue-50";
      case "INFO":
        return "border-gray-300 bg-gray-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  // --- UI ---
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-500" /> Notifiche Admin
          </h1>
          <Link
            href="/dashboard/notifications/archive"
            className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            <History className="w-4 h-4" />
            Archivio
          </Link>
        </div>

        {/* Filtri */}
        <div className="flex flex-wrap gap-2">
          {/* Filtro per Priorità */}
          <div className="flex gap-1">
            {["ALL", "HIGH", "MEDIUM", "LOW", "INFO"].map((lvl) => (
              <button
                key={lvl}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  filter === lvl
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFilter(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Filtro per Tipo */}
          <select
            className="border border-gray-300 rounded-md text-sm px-3 py-1 bg-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">Tutti i tipi</option>
            <option value="ERROR">Errori</option>
            <option value="MARKET">Mercato</option>
            <option value="SUPPORT">Supporto</option>
            <option value="SYSTEM">Sistema</option>
            <option value="GRADING">Grading</option>
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
                {notifications.filter(n => !n.read_status).length}
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
              <p className="text-sm text-gray-600">Lette</p>
              <p className="text-2xl font-bold text-green-600">
                {notifications.filter(n => n.read_status).length}
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
                {notifications.filter(n => n.priority === "HIGH" && !n.read_status).length}
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
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nessuna notifica trovata con i filtri selezionati.
            </p>
          </div>
        ) : (
          filtered.map((notif) => (
            <Card
              key={notif.id}
              className={`border-l-4 transition-all hover:shadow-md ${
                getPriorityColor(notif.priority)
              } ${notif.read_status ? "opacity-60" : ""}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getTypeIcon(notif.type)}
                  {notif.title}
                  {!notif.read_status && (
                    <Badge variant="destructive" className="ml-auto">
                      Nuova
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-3">{notif.message}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {notif.type}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    notif.priority === "HIGH" ? "bg-red-100 text-red-700" :
                    notif.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                    notif.priority === "LOW" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {notif.priority}
                  </span>
                  <span>
                    {new Date(notif.created_at).toLocaleString("it-IT")}
                  </span>
                </div>

                <div className="flex gap-2">
                  {!notif.read_status && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <EyeOff className="w-4 h-4 mr-1" /> Segna come letta
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArchive(notif.id)}
                  >
                    <Archive className="w-4 h-4 mr-1" /> Archivia
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}