'use client';

import { useEffect, useRef, useCallback } from 'react';

type SSEOptions = {
  url: string;
  onMessage: (data: any) => void;
  onError?: (err: Event) => void;
  onReconnect?: (attempt: number) => void;
  reconnectInterval?: number; // base ms
  maxInterval?: number;
  heartbeatTimeout?: number;
  enabled?: boolean; // per abilitare/disabilitare la connessione
};

export function useSSE({
  url,
  onMessage,
  onError,
  onReconnect,
  reconnectInterval = 3000,
  maxInterval = 15000,
  heartbeatTimeout = 60000,
  enabled = true,
}: SSEOptions) {
  const retryRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const activeRef = useRef(true);

  const connect = useCallback(() => {
    if (!activeRef.current || !enabled) return;
    
    const es = new EventSource(url, { withCredentials: false });
    esRef.current = es;

    const resetHeartbeat = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        console.warn('SSE heartbeat timeout — reconnecting...');
        es.close();
        scheduleReconnect();
      }, heartbeatTimeout);
    };

    es.onopen = () => {
      console.log('SSE connected:', url);
      retryRef.current = 0;
      resetHeartbeat();
    };

    es.onmessage = (e) => {
      resetHeartbeat();
      try {
        const data = JSON.parse(e.data);
        onMessage(data);
      } catch (error) {
        console.warn('Invalid SSE data:', e.data);
        onMessage(e.data);
      }
    };

    es.onerror = (err) => {
      console.warn('SSE error:', err);
      onError?.(err);
      es.close();
      scheduleReconnect();
    };
  }, [url, onMessage, onError, heartbeatTimeout, enabled]);

  const scheduleReconnect = useCallback(() => {
    if (!activeRef.current) return;
    
    retryRef.current++;
    const delay = Math.min(reconnectInterval * retryRef.current, maxInterval);
    console.log(`SSE reconnecting in ${delay}ms (attempt ${retryRef.current})`);
    onReconnect?.(retryRef.current);
    
    setTimeout(() => {
      if (activeRef.current && enabled) {
        connect();
      }
    }, delay);
  }, [reconnectInterval, maxInterval, onReconnect, enabled, connect]);

  useEffect(() => {
    activeRef.current = true;
    
    if (enabled) {
      connect();
    }

    return () => {
      activeRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      esRef.current?.close();
    };
  }, [connect, enabled]);

  // Funzione per riconnettere manualmente
  const reconnect = useCallback(() => {
    if (esRef.current) {
      esRef.current.close();
    }
    retryRef.current = 0;
    connect();
  }, [connect]);

  return { reconnect };
}

// Hook semplificato per uso diretto
export function useSSESimple(url: string, onMessage: (data: any) => void) {
  return useSSE({ url, onMessage });
}
