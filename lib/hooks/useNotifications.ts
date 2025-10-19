"use client";
import { useEffect, useState, useCallback } from 'react';
import { 
  getNotifications, 
  getUnreadCount, 
  markNotificationAsRead, 
  resolveNotification, 
  archiveNotification 
} from '@/lib/api';

interface AdminNotification {
  id: number;
  type: string;
  priority: string;
  title: string;
  message: string;
  readStatus: boolean;
  readAt: string | null;
  createdAt: string;
  archived: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
  history: string;
}

interface NotificationFilters {
  type?: string;
  priority?: string;
  status?: string;
}

export function useNotifications(filters?: NotificationFilters) {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifiche iniziali
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getNotifications(filters);
      setNotifications(data);
      
      // Aggiorna contatore non lette
      const unreadData = await getUnreadCount();
      setUnreadCount(unreadData.unreadCount);
      
    } catch (err) {
      console.error("Errore fetch notifiche:", err);
      setError("Errore nel caricamento delle notifiche");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Mark as read
  const markAsRead = useCallback(async (id: number) => {
    try {
      await markNotificationAsRead(id);
      
      // Aggiorna stato locale
      setNotifications(prev => 
        prev.map(n => 
          n.id === id 
            ? { ...n, readStatus: true, readAt: new Date().toISOString() }
            : n
        )
      );
      
      // Aggiorna contatore
      setUnreadCount(prev => Math.max(0, prev - 1));
      
    } catch (err) {
      console.error("Errore mark as read:", err);
      setError("Errore nel segnare come letta");
    }
  }, []);

  // Resolve notification
  const resolve = useCallback(async (id: number, note?: string) => {
    try {
      await resolveNotification(String(id), note);
      
      // Aggiorna stato locale
      setNotifications(prev => 
        prev.map(n => 
          n.id === id 
            ? { 
                ...n, 
                resolvedAt: new Date().toISOString(), 
                resolvedBy: "admin" // TODO: get from auth context
              }
            : n
        )
      );
      
    } catch (err) {
      console.error("Errore resolve:", err);
      setError("Errore nel risolvere notifica");
    }
  }, []);

  // Archive notification
  const archive = useCallback(async (id: number, note?: string) => {
    try {
      await archiveNotification(String(id));
      
      // Rimuovi dalla lista locale
      setNotifications(prev => prev.filter(n => n.id !== id));
      
      // Aggiorna contatore
      setUnreadCount(prev => Math.max(0, prev - 1));
      
    } catch (err) {
      console.error("Errore archive:", err);
      setError("Errore nell'archiviare notifica");
    }
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Load initial data
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    resolve,
    archive,
    refresh,
  };
}
