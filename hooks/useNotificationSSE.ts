"use client";

import { useEffect, useState } from "react";
import { useSSE } from "./useSSE";
import { fetchNotifications } from "@/lib/api";

interface AdminNotification {
  id: number;
  type: string;
  priority: string;
  title: string;
  message: string;
  createdAt: string;
  readStatus: boolean;
}

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<AdminNotification[]>([]);

  const updateCountsAndNotifications = async () => {
    try {
      const data = await fetchNotifications();
      const unread = data.filter((n: any) => !n.readStatus).length;
      setUnreadCount(unread);
      setRecentNotifications(data.slice(0, 5)); // Ultime 5
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useSSE({
    url: `${process.env.NEXT_PUBLIC_API_BASE}/api/admin/notifications/stream`,
    onMessage: (data) => {
      console.log("🔔 Nuova notifica SSE:", data);
      // Aggiorna la lista con la nuova notifica
      if (data.id) {
        setRecentNotifications(prev => {
          const exists = prev.some(n => n.id === data.id);
          if (!exists) {
            return [data, ...prev].slice(0, 5);
          }
          return prev;
        });
        setUnreadCount(prev => prev + 1);
      }
    },
    onError: (err) => {
      console.error("SSE Notification Error:", err);
    },
    onReconnect: (attempt) => {
      console.log(`SSE Notification: Reconnecting attempt ${attempt}`);
    },
  });

  useEffect(() => {
    updateCountsAndNotifications(); // Initial fetch
  }, []);

  return { unreadCount, recentNotifications, isConnected: true, refresh: updateCountsAndNotifications };
}
