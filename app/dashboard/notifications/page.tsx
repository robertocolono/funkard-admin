"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
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
  readBy?: string;
  readAt?: string;
}

import { getActiveNotifications, markNotificationAsRead, archiveNotification } from "@/services/adminService";

// --- Segna come letta ---
async function markAsRead(token: string, id: number) {
  await markNotificationAsRead(id);
}


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [sortMode, setSortMode] = useState<"chronological" | "priority">("chronological");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");

  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";

  // --- Caricamento iniziale ---
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getActiveNotifications();
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
    const statusMatch = filterStatus === "all" || 
      (filterStatus === "unread" && !n.read_status) || 
      (filterStatus === "read" && n.read_status);
    return priorityMatch && typeMatch && statusMatch;
  });

  // --- Ordinamento intelligente ---
  const sorted = [...filtered].sort((a, b) => {
    if (sortMode === "priority") {
      const order = { HIGH: 3, MEDIUM: 2, LOW: 1, INFO: 0 };
      if (order[b.priority] !== order[a.priority]) {
        return order[b.priority] - order[a.priority];
      }
      // in caso di priorità uguale → ordina per data decrescente
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else {
      // cronologico: dalla più vecchia alla più nuova
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
  });

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(token, id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { 
            ...n, 
            read_status: true, 
            readBy: "AdminPanel", 
            readAt: new Date().toISOString() 
          } : n
        )
      );
    } catch (err) {
      console.error("Errore markAsRead:", err);
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

        {/* Filtri e Ordinamento */}
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

          {/* Filtro Stato */}
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtro stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">📋 Tutte</SelectItem>
              <SelectItem value="unread">🔵 Non lette</SelectItem>
              <SelectItem value="read">✅ Lette</SelectItem>
            </SelectContent>
          </Select>

          {/* Ordinamento */}
          <Select value={sortMode} onValueChange={(v) => setSortMode(v as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordina per..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chronological">🕓 Cronologico (vecchie → nuove)</SelectItem>
              <SelectItem value="priority">⚠️ Per importanza</SelectItem>
            </SelectContent>
          </Select>
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
              <p className="text-sm text-gray-600">Filtrate</p>
              <p className="text-2xl font-bold text-blue-600">
                {sorted.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista notifiche */}
      <div className="space-y-4">
        {sorted.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nessuna notifica trovata con i filtri selezionati.
            </p>
          </div>
        ) : (
          <>
            {/* Header tabella */}
            <div className="bg-gray-50 rounded-lg p-3 text-sm font-medium text-gray-600 grid grid-cols-12 gap-4">
              <div className="col-span-1">Tipo</div>
              <div className="col-span-4">Titolo</div>
              <div className="col-span-2">Priorità</div>
              <div className="col-span-2">Creata</div>
              <div className="col-span-3">Stato</div>
            </div>

            {/* Lista notifiche */}
            {sorted.map((notif) => (
            <Card
              key={notif.id}
              className={`border-l-4 transition-all hover:shadow-md ${
                getPriorityColor(notif.priority)
              } ${notif.read_status ? "border-gray-200 bg-gray-50" : "border-blue-300 bg-white"}`}
            >
              <CardContent className="p-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Tipo */}
                  <div className="col-span-1">
                    {getTypeIcon(notif.type)}
                  </div>

                  {/* Titolo e Messaggio */}
                  <div className="col-span-4">
                    <div className="font-semibold text-sm">{notif.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{notif.message}</div>
                  </div>

                  {/* Priorità */}
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      notif.priority === "HIGH" ? "bg-red-100 text-red-700" :
                      notif.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                      notif.priority === "LOW" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {notif.priority}
                    </span>
                  </div>

                  {/* Data Creazione */}
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(notif.created_at).toLocaleTimeString()}
                    </div>
                  </div>

                  {/* Stato Lettura */}
                  <div className="col-span-3">
                    {notif.read_status ? (
                      <div className="text-green-600 text-xs">
                        <div className="flex items-center gap-1">
                          ✅ <span className="font-medium">Letta da:</span>
                        </div>
                        <div className="font-semibold">{notif.readBy || "—"}</div>
                        {notif.readAt && (
                          <div className="text-gray-500 text-[10px]">
                            {new Date(notif.readAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Badge variant="destructive" className="w-fit text-xs">
                          Nuova
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-6"
                          onClick={() => handleMarkAsRead(notif.id)}
                        >
                          Segna come letta
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Azioni */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `https://funkard-api.onrender.com/api/admin/notifications/archive/${notif.id}`,
                          {
                            method: "PATCH",
                            headers: {
                              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
                              "Content-Type": "application/json",
                            },
                          }
                        );

                        if (!res.ok) throw new Error("Errore durante archiviazione");
                        setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
                      } catch (err) {
                        console.error("❌ Errore:", err);
                      }
                    }}
                  >
                    🗄️ Archivia
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}