"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSSE } from './useSSE';
import { getUnreadCount, getRecentNotifications } from '@/lib/api';

interface NotificationSSEState {
  unreadCount: number;
  recentNotifications: Array<{
    id: number;
    type: string;
    priority: string;
    title: string;
    message: string;
    createdAt: string;
  }>;
  isConnected: boolean;
  error: string | null;
}

export function useNotificationSSE() {
  const [state, setState] = useState<NotificationSSEState>({
    unreadCount: 0,
    recentNotifications: [],
    isConnected: false,
    error: null,
  });

  // SSE connection per notifiche real-time
  const sse = useSSE({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/stream`,
    reconnectInterval: 3000,
    maxReconnectAttempts: 5,
    timeout: 30000,
    onMessage: (data) => {
      console.log("🔔 SSE Notification:", data);
      
      // Aggiorna contatore non lette
      if (typeof data.unreadCount === 'number') {
        setState(prev => ({ ...prev, unreadCount: data.unreadCount }));
      }
      
      // Aggiorna notifiche recenti
      if (data.notifications && Array.isArray(data.notifications)) {
        setState(prev => ({ ...prev, recentNotifications: data.notifications }));
      }
    },
    onError: (error) => {
      console.error("❌ SSE Error:", error);
      setState(prev => ({ ...prev, error: "Errore connessione real-time" }));
    },
    onReconnect: (attempt) => {
      console.log(`🔄 SSE Reconnect attempt ${attempt}`);
    },
    onMaxReconnectAttempts: () => {
      console.error("❌ SSE Max reconnect attempts reached");
      setState(prev => ({ ...prev, error: "Connessione real-time persa" }));
    },
  });

  // Fetch iniziale dati
  const fetchInitialData = useCallback(async () => {
    try {
      const [unreadData, recentData] = await Promise.all([
        getUnreadCount(),
        getRecentNotifications(),
      ]);
      
      setState(prev => ({
        ...prev,
        unreadCount: unreadData.unreadCount,
        recentNotifications: recentData,
        error: null,
      }));
    } catch (err) {
      console.error("Errore fetch iniziale:", err);
      setState(prev => ({ ...prev, error: "Errore caricamento dati" }));
    }
  }, []);

  // Load initial data
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Update connection state
  useEffect(() => {
    setState(prev => ({ ...prev, isConnected: sse.isConnected }));
  }, [sse.isConnected]);

  return {
    ...state,
    isConnected: sse.isConnected,
    isReconnecting: sse.isReconnecting,
    reconnectAttempts: sse.reconnectAttempts,
    reconnect: sse.reconnect,
    disconnect: sse.disconnect,
    refresh: fetchInitialData,
  };
}
