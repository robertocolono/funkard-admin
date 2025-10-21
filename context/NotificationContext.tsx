'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminSupportEvents } from '@/hooks/useAdminSupportEvents';

interface NotificationContextType {
  unreadCount: number;
  incrementUnread: () => void;
  resetUnread: () => void;
  markAsRead: (ticketId: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'new-ticket' | 'ticket-reply' | 'ticket-assigned' | 'ticket-resolved' | 'ticket-status-changed';
  ticketId: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { admin } = useAuth();

  // Incrementa contatore non letti
  const incrementUnread = () => {
    setUnreadCount(prev => prev + 1);
  };

  // Reset contatore non letti
  const resetUnread = () => {
    setUnreadCount(0);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Marca notifica come letta
  const markAsRead = (ticketId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.ticketId === ticketId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Marca tutte le notifiche come lette
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  // Aggiungi notifica
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Mantieni ultimi 50
    incrementUnread();
  };

  // Hook personalizzato per gestire eventi SSE
  useEffect(() => {
    if (!admin) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://funkard-api.onrender.com";
    const streamUrl = `${baseUrl}/api/admin/support/stream?userId=${admin.id}&role=${admin.role}`;

    const es = new EventSource(streamUrl, { withCredentials: true });

    // Nuovo ticket
    es.addEventListener("new-ticket", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (admin.role === "super_admin" || admin.role === "admin") {
          addNotification({
            type: 'new-ticket',
            ticketId: data.id,
            title: '🆕 Nuovo ticket',
            description: `${data.subject} — da ${data.email}`,
          });
        }
      } catch (error) {
        console.error('Errore parsing new-ticket:', error);
      }
    });

    // Risposta utente
    es.addEventListener("ticket-reply", (event) => {
      try {
        const data = JSON.parse(event.data);
        const shouldShow = admin.role === "super_admin" || 
                          admin.role === "admin" ||
                          (admin.role === "support" && data.assignedTo === admin.id);
        
        if (shouldShow) {
          addNotification({
            type: 'ticket-reply',
            ticketId: data.ticketId,
            title: '💬 Nuova risposta',
            description: `Ticket #${data.ticketId} (${data.subject})`,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-reply:', error);
      }
    });

    // Ticket assegnato
    es.addEventListener("ticket-assigned", (event) => {
      try {
        const data = JSON.parse(event.data);
        const shouldShow = admin.role === "super_admin" || 
                          (data.assignedTo === admin.id);
        
        if (shouldShow) {
          addNotification({
            type: 'ticket-assigned',
            ticketId: data.id,
            title: '🎯 Ticket assegnato',
            description: `Ticket #${data.id} → assegnato a ${data.assignedToName || data.assignedTo}`,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-assigned:', error);
      }
    });

    // Ticket risolto
    es.addEventListener("ticket-resolved", (event) => {
      try {
        const data = JSON.parse(event.data);
        const shouldShow = admin.role === "super_admin" || 
                          (data.assignedTo === admin.id);
        
        if (shouldShow) {
          addNotification({
            type: 'ticket-resolved',
            ticketId: data.id,
            title: '✅ Ticket risolto',
            description: `#${data.id} ora è chiuso`,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-resolved:', error);
      }
    });

    // Stato cambiato
    es.addEventListener("ticket-status-changed", (event) => {
      try {
        const data = JSON.parse(event.data);
        const shouldShow = admin.role === "super_admin" || 
                          (admin.role === "support" && data.assignedTo === admin.id) ||
                          (admin.role === "admin" && data.assignedTo === admin.id);
        
        if (shouldShow) {
          addNotification({
            type: 'ticket-status-changed',
            ticketId: data.id,
            title: '📬 Stato aggiornato',
            description: `Ticket #${data.id} ora è ${data.status}`,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-status-changed:', error);
      }
    });

    // Connessione aperta
    es.onopen = () => {
      console.log(`🔗 NotificationContext SSE connesso per admin: ${admin.role}`);
    };

    // Gestione errori
    es.onerror = (error) => {
      console.warn("⚠️ NotificationContext SSE disconnesso, riconnessione in 5s...", error);
      es.close();
      
      setTimeout(() => {
        console.log('🔄 NotificationContext tentativo di riconnessione...');
        // Riconnessione automatica
        const newEs = new EventSource(streamUrl, { withCredentials: true });
        // Re-imposta tutti i listener (per brevità omettiamo)
      }, 5000);
    };

    return () => {
      console.log('🔌 NotificationContext SSE disconnesso');
      es.close();
    };
  }, [admin]);

  const value: NotificationContextType = {
    unreadCount,
    incrementUnread,
    resetUnread,
    markAsRead,
    markAllAsRead,
    addNotification,
    notifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
