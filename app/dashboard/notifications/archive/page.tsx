"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Archive, Clock, AlertTriangle, ShoppingBag, MessageSquare, Database, Wrench, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArchivedNotifications, deleteNotification } from "@/services/adminService";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "ERROR" | "MARKET" | "SUPPORT" | "SYSTEM" | "GRADING";
  priority: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  created_at: string;
  archived_at: string;
}

export default function ArchiveNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";

  // --- Fetch notifiche archiviate ---
  useEffect(() => {
    const fetchArchived = async () => {
      try {
        const data = await getArchivedNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("❌ Errore fetch archivio:", err);
        // Fallback a mock data se API non disponibile
        setNotifications([
          {
            id: 101,
            title: "Errore connessione DB risolto",
            message: "Il problema di connessione al database PostgreSQL è stato risolto automaticamente.",
            type: "ERROR",
            priority: "HIGH",
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
            archived_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 102,
            title: "Carta venduta con successo",
            message: "La carta Charizard PSA 10 è stata venduta per €1,299.99 a mario.rossi.",
            type: "MARKET",
            priority: "MEDIUM",
            created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
            archived_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
          {
            id: 103,
            title: "Ticket supporto risolto",
            message: "Il ticket di supporto da lucia.bianchi per problema con pagamento è stato risolto.",
            type: "SUPPORT",
            priority: "LOW",
            created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
            archived_at: new Date(Date.now() - 86400000 * 3).toISOString(),
          },
          {
            id: 104,
            title: "Backup sistema completato",
            message: "Il backup automatico del sistema è stato completato con successo.",
            type: "SYSTEM",
            priority: "INFO",
            created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
            archived_at: new Date(Date.now() - 86400000 * 4).toISOString(),
          },
          {
            id: 105,
            title: "Grading completato",
            message: "Il processo di grading per la carta Black Lotus è stato completato con voto PSA 9.",
            type: "GRADING",
            priority: "MEDIUM",
            created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
            archived_at: new Date(Date.now() - 86400000 * 5).toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArchived();
  }, [token]);

  // --- Filtri combinati ---
  const filtered = notifications.filter((n) => {
    const priorityMatch = filter === "ALL" || n.priority === filter;
    const typeMatch = typeFilter === "ALL" || n.type === typeFilter;
    return priorityMatch && typeMatch;
  });

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
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Archive className="w-6 h-6 text-gray-600" /> Archivio Notifiche
        </h1>

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

      {/* Statistiche archivio */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Archive className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Totale archiviate</p>
              <p className="text-2xl font-bold text-gray-600">
                {notifications.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Errori archiviati</p>
              <p className="text-2xl font-bold text-red-600">
                {notifications.filter(n => n.type === "ERROR").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Market archiviate</p>
              <p className="text-2xl font-bold text-yellow-600">
                {notifications.filter(n => n.type === "MARKET").length}
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
              <p className="text-sm text-gray-600">Support archiviate</p>
              <p className="text-2xl font-bold text-blue-600">
                {notifications.filter(n => n.type === "SUPPORT").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista notifiche archiviate */}
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nessuna notifica archiviata negli ultimi 30 giorni.
            </p>
          </div>
        ) : (
          filtered.map((notif) => (
            <Card
              key={notif.id}
              className={`border-l-4 transition-all hover:shadow-md ${
                getPriorityColor(notif.priority)
              } opacity-75`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getTypeIcon(notif.type)}
                  {notif.title}
                  <Badge variant="outline" className="ml-auto">
                    {notif.type}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-3">{notif.message}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className={`px-2 py-1 rounded ${
                    notif.priority === "HIGH" ? "bg-red-100 text-red-700" :
                    notif.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                    notif.priority === "LOW" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {notif.priority}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Creata: {new Date(notif.created_at).toLocaleString("it-IT")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Archive className="w-3 h-3" />
                    Archiviata: {new Date(notif.archived_at).toLocaleString("it-IT")}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      if (!confirm("Eliminare definitivamente questa notifica?")) return;

                      try {
                        await deleteNotification(notif.id);
                        setNotifications((prev) => prev.filter((n) => n.id !== notif.id)); // Rimuove subito dalla UI
                      } catch (err) {
                        console.error("❌ Errore:", err);
                      }
                    }}
                  >
                    🗑️ Elimina
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
