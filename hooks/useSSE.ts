'use client';

import { useEffect, useRef } from 'react';

type SSEOptions = {
  url: string;
  onMessage: (data: any) => void;
  onError?: (err: Event) => void;
  onReconnect?: (attempt: number) => void;
  reconnectInterval?: number; // base ms
  maxInterval?: number;
  heartbeatTimeout?: number;
};

export function useSSE({
  url,
  onMessage,
  onError,
  onReconnect,
  reconnectInterval = 3000,
  maxInterval = 15000,
  heartbeatTimeout = 60000,
}: SSEOptions) {
  const retryRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    let active = true;

    const connect = () => {
      if (!active) return;
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
        retryRef.current = 0;
        resetHeartbeat();
      };

      es.onmessage = (e) => {
        resetHeartbeat();
        try {
          const data = JSON.parse(e.data);
          onMessage(data);
        } catch {
          onMessage(e.data);
        }
      };

      es.onerror = (err) => {
        onError?.(err);
        es.close();
        scheduleReconnect();
      };
    };

    const scheduleReconnect = () => {
      retryRef.current++;
      const delay = Math.min(reconnectInterval * retryRef.current, maxInterval);
      onReconnect?.(retryRef.current);
      setTimeout(() => {
        if (active) connect();
      }, delay);
    };

    connect();

    return () => {
      active = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      esRef.current?.close();
    };
  }, [url, onMessage, onError, onReconnect, reconnectInterval, maxInterval, heartbeatTimeout]);
}
