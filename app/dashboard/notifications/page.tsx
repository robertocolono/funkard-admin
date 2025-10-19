"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, History } from "lucide-react";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotificationSSE";
import NotificationsFilters from "@/components/notifications/NotificationsFilters";
import NotificationsList from "@/components/notifications/NotificationsList";
import NotificationsActions from "@/components/notifications/NotificationsActions";
import { 
  getNotifications, 
  markNotificationAsRead, 
  resolveNotification, 
  archiveNotification,
  cleanupArchivedNotifications 
} from "@/lib/api";

interface NotificationFilters {
  type: string;
  priority: string;
  status: string;
  search: string;
}

export default function NotificationsPage() {
  const [filters, setFilters] = useState<NotificationFilters>({
    type: "",
    priority: "",
    status: "",
    search: "",
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook SSE per notifiche real-time
  const sseData = useNotifications();

  // Fetch notifiche iniziali
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getNotifications({
          type: filters.type || undefined,
          priority: filters.priority || undefined,
          status: filters.status || undefined,
        });
        
        setNotifications(data);
      } catch (err) {
        console.error("Errore fetch notifiche:", err);
        setError("Errore nel caricamento delle notifiche");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [filters]);

  // Aggiorna notifiche via SSE
  useEffect(() => {
    if (sseData.recentNotifications.length > 0) {
      setNotifications(prev => {
        const newNotifications = sseData.recentNotifications.filter(
          newNotif => !prev.some(existing => existing.id === newNotif.id)
        );
        return [...newNotifications, ...prev];
      });
    }
  }, [sseData.recentNotifications]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prev => 
        prev.map(n => 
          n.id === id 
            ? { ...n, readStatus: true, readAt: new Date().toISOString() }
            : n
        )
      );
    } catch (err) {
      console.error("Errore mark as read:", err);
    }
  };

  const handleResolve = async (id: number, note?: string) => {
    try {
      await resolveNotification(id, note);
      setNotifications(prev => 
        prev.map(n => 
          n.id === id 
            ? { 
                ...n, 
                resolvedAt: new Date().toISOString(), 
                resolvedBy: "admin" 
              }
            : n
        )
      );
    } catch (err) {
      console.error("Errore resolve:", err);
    }
  };

  const handleArchive = async (id: number, note?: string) => {
    try {
      await archiveNotification(id, note);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Errore archive:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.readStatus);
      await Promise.all(unreadNotifications.map(n => markNotificationAsRead(n.id)));
      setNotifications(prev => 
        prev.map(n => ({ ...n, readStatus: true, readAt: new Date().toISOString() }))
      );
    } catch (err) {
      console.error("Errore mark all read:", err);
    }
  };

  const handleCleanupArchived = async () => {
    try {
      await cleanupArchivedNotifications(30);
      // Refresh notifications after cleanup
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Errore cleanup:", err);
    }
  };

  const handleExport = async () => {
    try {
      const csvContent = [
        "ID,Title,Message,Type,Priority,Status,Created At",
        ...notifications.map(n => 
          `${n.id},"${n.title}","${n.message}",${n.type},${n.priority},${n.readStatus ? 'Read' : 'Unread'},"${n.createdAt}"`
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `notifications-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Errore export:", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.readStatus).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            Notifiche Admin
          </h1>
          <Link
            href="/dashboard/notifications/archive"
            className="flex items-center gap-2 px-3 py-1 text-sm bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition"
          >
            <History className="w-4 h-4" />
            Archivio
          </Link>
        </div>
      </motion.div>

      {/* Filtri */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <NotificationsFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={() => setFilters({ type: "", priority: "", status: "", search: "" })}
          onMarkAllRead={handleMarkAllRead}
          onCleanupArchived={handleCleanupArchived}
          unreadCount={unreadCount}
          isLoading={loading}
        />
      </motion.div>

      {/* Azioni */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <NotificationsActions
          onMarkAllRead={handleMarkAllRead}
          onCleanupArchived={handleCleanupArchived}
          onRefresh={() => window.location.reload()}
          onExport={handleExport}
          unreadCount={unreadCount}
          totalCount={notifications.length}
          isLoading={loading}
        />
      </motion.div>

      {/* Lista notifiche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <NotificationsList
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onResolve={handleResolve}
          onArchive={handleArchive}
          isLoading={loading}
          searchQuery={filters.search}
        />
      </motion.div>
    </div>
  );
}