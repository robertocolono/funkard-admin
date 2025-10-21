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
  locked?: boolean;
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
    // Richiedi permessi notifiche desktop
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    loadTickets();

    // Polling fallback ogni 30s
    const interval = setInterval(loadTickets, 30000);

    // 🔥 Connessione SSE
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/support/stream`
    );

    eventSource.addEventListener('ticket-update', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 SSE Event received:', data);
        
        if (data.type === 'NEW_TICKET') {
          console.log('🎫 Nuovo ticket:', data);
          loadTickets(); // aggiorna lista
          
          // Notifica desktop se permesso
          if (Notification.permission === 'granted') {
            new Notification(`Nuovo ticket: ${data.subject}`, {
              body: `Da: ${data.email}`,
              icon: '/favicon.ico'
            });
          }
        } else if (data.type === 'TICKET_UPDATED') {
          console.log('📝 Ticket aggiornato:', data);
          loadTickets(); // aggiorna lista
        } else if (data.type === 'TICKET_CLOSED') {
          console.log('🔒 Ticket chiuso:', data);
          loadTickets(); // aggiorna lista
        }
      } catch (err) {
        console.error('Errore parsing evento SSE:', err);
      }
    });

    eventSource.onopen = () => {
      console.log('🔗 SSE connesso al backend');
    };

    eventSource.onerror = (error) => {
      console.warn('❌ SSE disconnesso, tentativo di riconnessione...', error);
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
