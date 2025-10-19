"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface SSEOptions {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  timeout?: number;
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onReconnect?: (attempt: number) => void;
  onMaxReconnectAttempts?: () => void;
}

interface SSEState {
  isConnected: boolean;
  isReconnecting: boolean;
  reconnectAttempts: number;
  lastMessage: any;
  error: string | null;
}

export function useSSE({
  url,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
  timeout = 30000,
  onMessage,
  onError,
  onReconnect,
  onMaxReconnectAttempts,
}: SSEOptions) {
  const [state, setState] = useState<SSEState>({
    isConnected: false,
    isReconnecting: false,
    reconnectAttempts: 0,
    lastMessage: null,
    error: null,
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const connect = useCallback(() => {
    if (!isMountedRef.current) return;

    try {
      // Chiudi connessione esistente
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      // Timeout per connessione
      const connectionTimeout = setTimeout(() => {
        if (eventSource.readyState === EventSource.CONNECTING) {
          eventSource.close();
          handleReconnect();
        }
      }, timeout);

      eventSource.onopen = () => {
        clearTimeout(connectionTimeout);
        if (!isMountedRef.current) return;

        setState(prev => ({
          ...prev,
          isConnected: true,
          isReconnecting: false,
          reconnectAttempts: 0,
          error: null,
        }));
      };

      eventSource.onmessage = (event) => {
        if (!isMountedRef.current) return;

        try {
          const data = JSON.parse(event.data);
          setState(prev => ({
            ...prev,
            lastMessage: data,
            error: null,
          }));

          onMessage?.(data);
        } catch (err) {
          console.warn("Errore parsing SSE message:", err);
          setState(prev => ({
            ...prev,
            error: "Errore parsing messaggio",
          }));
        }
      };

      eventSource.onerror = (error) => {
        clearTimeout(connectionTimeout);
        if (!isMountedRef.current) return;

        setState(prev => ({
          ...prev,
          isConnected: false,
          error: "Errore connessione SSE",
        }));

        onError?.(error);
        eventSource.close();
        handleReconnect();
      };

    } catch (err) {
      console.error("Errore creazione SSE:", err);
      setState(prev => ({
        ...prev,
        error: "Errore creazione connessione",
      }));
      handleReconnect();
    }
  }, [url, timeout, onMessage, onError]);

  const handleReconnect = useCallback(() => {
    if (!isMountedRef.current) return;

    setState(prev => {
      const newAttempts = prev.reconnectAttempts + 1;
      
      if (newAttempts >= maxReconnectAttempts) {
        setState(prevState => ({
          ...prevState,
          isReconnecting: false,
          error: `Max tentativi raggiunti (${maxReconnectAttempts})`,
        }));
        onMaxReconnectAttempts?.();
        return prevState;
      }

      return {
        ...prev,
        isReconnecting: true,
        reconnectAttempts: newAttempts,
      };
    });

    onReconnect?.(state.reconnectAttempts + 1);

    reconnectTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        connect();
      }
    }, reconnectInterval);
  }, [reconnectInterval, maxReconnectAttempts, onReconnect, connect, state.reconnectAttempts]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isConnected: false,
      isReconnecting: false,
    }));
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    setState(prev => ({
      ...prev,
      reconnectAttempts: 0,
      error: null,
    }));
    connect();
  }, [disconnect, connect]);

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
    reconnect,
  };
}
