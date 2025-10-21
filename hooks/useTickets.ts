'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchAllTickets } from '@/lib/funkardApi';

interface Ticket {
  id: string;
  subject: string;
  email: string;
  category: string;
  priority: string;
  status: string;
  assignedTo?: string;
  createdAt: string;
}

interface Filters {
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
}

export function useTickets(initialFilters?: Filters) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters || {});

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllTickets(filters);
      setTickets(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Errore durante il caricamento dei ticket');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTickets();

    // Polling fallback ogni 30s
    const interval = setInterval(loadTickets, 30000);

    // 🔥 Connessione SSE
    const token = localStorage.getItem('funkard_token');
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/support/stream?token=${token}`
    );

    eventSource.addEventListener('ticket-update', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'NEW_TICKET') {
          console.log('🎫 Nuovo ticket:', data);
          loadTickets(); // aggiorna lista
          // opzionale: mostra toast visivo
          if (Notification.permission === 'granted') {
            new Notification(`Nuovo ticket: ${data.subject}`);
          }
        }
      } catch (err) {
        console.error('Errore evento SSE:', err);
      }
    });

    eventSource.onerror = () => {
      console.warn('SSE disconnesso, tentativo di riconnessione...');
      eventSource.close();
    };

    return () => {
      clearInterval(interval);
      eventSource.close();
    };
  }, [loadTickets]);

  return {
    tickets,
    loading,
    error,
    filters,
    setFilters,
    reload: loadTickets,
  };
}
