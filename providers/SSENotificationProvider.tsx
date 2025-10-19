'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSSE } from '@/hooks/useSSE';

interface SSENotificationContextType {
  isConnected: boolean;
  reconnect: () => void;
  lastNotification: any | null;
}

const SSENotificationContext = createContext<SSENotificationContextType | null>(null);

export function SSENotificationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [lastNotification, setLastNotification] = useState<any | null>(null);

  const handleMessage = (data: any) => {
    console.log('🔔 Nuova notifica SSE:', data);
    setLastNotification(data);
    
    // Toast per notifiche importanti
    if (data.priority === 'urgent' || data.priority === 'high') {
      toast({
        title: data.title || 'Nuova notifica',
        description: data.message || 'Hai ricevuto una nuova notifica',
        variant: data.priority === 'urgent' ? 'destructive' : 'default',
      });
    }
  };

  const handleError = (err: Event) => {
    console.error('SSE Error:', err);
    setIsConnected(false);
  };

  const handleReconnect = (attempt: number) => {
    console.log(`SSE Reconnecting... (attempt ${attempt})`);
    setIsConnected(false);
  };

  const { reconnect } = useSSE({
    url: `${process.env.NEXT_PUBLIC_API_BASE}/api/admin/notifications/stream`,
    onMessage: handleMessage,
    onError: handleError,
    onReconnect: handleReconnect,
    reconnectInterval: 3000,
    maxInterval: 15000,
    heartbeatTimeout: 60000,
    enabled: true,
  });

  useEffect(() => {
    // Simula connessione dopo un breve delay
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SSENotificationContext.Provider value={{ isConnected, reconnect, lastNotification }}>
      {children}
    </SSENotificationContext.Provider>
  );
}

export function useSSENotifications() {
  const context = useContext(SSENotificationContext);
  if (!context) {
    throw new Error('useSSENotifications must be used within SSENotificationProvider');
  }
  return context;
}
