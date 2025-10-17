"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Loader2, 
  Archive, 
  Trash2, 
  Bell, 
  AlertTriangle, 
  ShoppingBag, 
  MessageSquare, 
  Database, 
  Wrench,
  RefreshCw
} from "lucide-react";
import { 
  getActiveNotifications, 
  getArchivedNotifications, 
  markNotificationAsRead, 
  archiveNotification, 
  deleteNotification 
} from "@/services/adminService";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "ERROR" | "MARKET" | "SUPPORT" | "SYSTEM" | "GRADING";
  priority: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  read_status: boolean;
  created_at: string;
  archived_at?: string;
}

interface CacheData {
  active: Notification[];
  archived: Notification[];
  lastFetch: number;
}

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("active");
  const [typeFilter, setTypeFilter] = useState<"all" | "ERROR" | "MARKET" | "SUPPORT" | "SYSTEM" | "GRADING">("all");
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Notification | null>(null);
  const [cache, setCache] = useState<CacheData>({ active: [], archived: [], lastFetch: 0 });

  // Cache locale leggera - mantiene i dati per 5 minuti
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minuti
  const AUTO_REFRESH_INTERVAL = 30 * 1000; // 30 secondi

  const fetchNotifications = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    const shouldUseCache = !forceRefresh && (now - cache.lastFetch) < CACHE_DURATION;

    if (shouldUseCache && cache.active.length > 0) {
      setNotifications(cache.active);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [activeData, archivedData] = await Promise.all([
        getActiveNotifications(),
        getArchivedNotifications()
      ]);

      const newCache = {
        active: activeData,
        archived: archivedData,
        lastFetch: now
      };

      setCache(newCache);
      setNotifications(activeData);
    } catch (err) {
      console.error("❌ Errore fetch notifiche:", err);
      // Fallback a cache se disponibile
      if (cache.active.length > 0) {
        setNotifications(cache.active);
      }
    }
    setLoading(false);
  }, [cache]);

  // Caricamento iniziale
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Auto-refresh ogni 30s solo se ci sono notifiche attive
  useEffect(() => {
    if (filter === "active" && notifications.length > 0) {
      const interval = setInterval(() => {
        fetchNotifications(true);
      }, AUTO_REFRESH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [filter, notifications.length, fetchNotifications]);

  // Filtri combinati
  const filtered = notifications.filter((n) => {
    const statusMatch = filter === "all" || 
      (filter === "active" && !n.archived_at) || 
      (filter === "archived" && n.archived_at);
    
    const typeMatch = typeFilter === "all" || n.type === typeFilter;
    
    return statusMatch && typeMatch;
  });

  // Colori badge per priorità
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500 text-white border-red-600";
      case "MEDIUM":
        return "bg-yellow-500 text-black border-yellow-600";
      case "LOW":
        return "bg-blue-500 text-white border-blue-600";
      default:
        return "bg-gray-200 text-gray-800 border-gray-300";
    }
  };

  // Icone per tipo
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ERROR":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "MARKET":
        return <ShoppingBag className="w-4 h-4 text-yellow-500" />;
      case "SUPPORT":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "SYSTEM":
        return <Database className="w-4 h-4 text-green-500" />;
      case "GRADING":
        return <Wrench className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  // Azioni
  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read_status: true } : n)
      );
    } catch (err) {
      console.error("❌ Errore marcatura come letta:", err);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await archiveNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      // Aggiorna cache
      setCache(prev => ({
        ...prev,
        active: prev.active.filter(n => n.id !== id)
      }));
    } catch (err) {
      console.error("❌ Errore archiviazione:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      setConfirmDelete(null);
      // Aggiorna cache
      setCache(prev => ({
        ...prev,
        archived: prev.archived.filter(n => n.id !== id)
      }));
    } catch (err) {
      console.error("❌ Errore eliminazione:", err);
    }
  };

  const handleRefresh = () => {
    fetchNotifications(true);
  };

  return (
    <>
      <Card className="w-full shadow-lg">
        <CardContent className="p-4">
          {/* Header con filtri */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Notifiche Admin</h2>
              <Badge variant="outline" className="ml-2">
                {filtered.length} {filter === "active" ? "attive" : filter === "archived" ? "archiviate" : "totale"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Filtri */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Filtro stato */}
            <div className="flex gap-1">
              {[
                { key: "active", label: "Attive" },
                { key: "archived", label: "Archiviate" },
                { key: "all", label: "Tutte" }
              ].map((f) => (
                <Button
                  key={f.key}
                  onClick={() => setFilter(f.key as any)}
                  variant={filter === f.key ? "default" : "outline"}
                  size="sm"
                >
                  {f.label}
                </Button>
              ))}
            </div>

            {/* Filtro tipo */}
            <div className="flex gap-1 ml-4">
              {[
                { key: "all", label: "Tutti i tipi" },
                { key: "ERROR", label: "Errori" },
                { key: "MARKET", label: "Mercato" },
                { key: "SUPPORT", label: "Supporto" },
                { key: "SYSTEM", label: "Sistema" },
                { key: "GRADING", label: "Grading" }
              ].map((f) => (
                <Button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key as any)}
                  variant={typeFilter === f.key ? "default" : "outline"}
                  size="sm"
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Lista notifiche */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Nessuna notifica trovata</p>
            </div>
          ) : (
            <ul className="space-y-3 max-h-[500px] overflow-y-auto">
              {filtered.map((n) => (
                <li key={n.id} className="border p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getTypeIcon(n.type)}
                        <h3 className="font-semibold">{n.title}</h3>
                        {!n.read_status && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{n.message}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{new Date(n.created_at).toLocaleString()}</span>
                        {n.archived_at && (
                          <span>• Archiviata: {new Date(n.archived_at).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={getPriorityBadge(n.priority)}>
                        {n.priority}
                      </Badge>
                      
                      {/* Azioni */}
                      <div className="flex gap-1">
                        {!n.archived_at && !n.read_status && (
                          <Button
                            onClick={() => handleMarkAsRead(n.id)}
                            variant="outline"
                            size="sm"
                          >
                            ✓
                          </Button>
                        )}
                        
                        {!n.archived_at && (
                          <Button
                            onClick={() => handleArchive(n.id)}
                            variant="outline"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <Archive className="w-3 h-3" />
                          </Button>
                        )}
                        
                        {n.archived_at && (
                          <Button
                            onClick={() => setConfirmDelete(n)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Modal conferma eliminazione */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conferma Eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare definitivamente questa notifica?
              <br />
              <strong>Questa azione non può essere annullata.</strong>
            </DialogDescription>
          </DialogHeader>
          
          {confirmDelete && (
            <div className="py-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold">{confirmDelete.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{confirmDelete.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getPriorityBadge(confirmDelete.priority)}>
                    {confirmDelete.priority}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(confirmDelete.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(null)}
            >
              Annulla
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && handleDelete(confirmDelete.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Elimina Definitivamente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
