"use client";
import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  message: string;
  productId: string;
  type: 'warning' | 'info' | 'error';
  createdAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [toastNotifications, setToastNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Richiedi permessi per notifiche browser
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/stream`);

    eventSource.addEventListener("notification", (event) => {
      const newNotif = JSON.parse(event.data);
      console.log("🔔 Nuova notifica:", newNotif);
      
      // Aggiungi la nuova notifica allo stato esistente
      setNotifications(prev => [newNotif, ...prev]);
      
      // Aggiungi anche ai toast
      setToastNotifications(prev => [newNotif, ...prev]);
      
      // Incrementa il contatore delle nuove notifiche
      setNewNotificationCount(prev => prev + 1);
      
      // Mostra notifica browser se permesso
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Nuova Notifica Funkard', {
          body: newNotif.message,
          icon: '/favicon.ico',
          tag: 'funkard-notification'
        });
      }
    });

    eventSource.addEventListener("notification-resolved", (event) => {
      const resolvedNotif = JSON.parse(event.data);
      console.log("✅ Notifica risolta:", resolvedNotif);
      
      // Rimuovi la notifica risolta dallo stato
      setNotifications(prev => prev.filter(n => n.id !== resolvedNotif.id));
    });

    eventSource.onopen = () => {
      console.log("🔗 Connessione SSE stabilita");
      setIsConnected(true);
    };

    eventSource.onerror = (error) => {
      console.error("❌ Errore SSE:", error);
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, []);

  const markAsRead = () => {
    setNewNotificationCount(0);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const removeToast = (id: string) => {
    setToastNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    newNotificationCount,
    isConnected,
    toastNotifications,
    markAsRead,
    removeNotification,
    removeToast
  };
}
