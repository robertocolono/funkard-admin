'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useTicketsStore } from '@/store/useTicketsStore';

export function useSupportStream() {
  const { toast } = useToast();
  const { incrementUnread, reloadTickets } = useTicketsStore();

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/support/stream`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener('ticket-update', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Evento ticket-update:', data);

        switch (data.type) {
          case 'NEW_TICKET':
            incrementUnread();
            toast({
              title: '🎫 Nuovo ticket ricevuto',
              description: `${data.subject} - ${data.email}`,
            });
            reloadTickets(); // aggiorna lista
            break;

          case 'NEW_MESSAGE':
            toast({
              title: '💬 Nuovo messaggio utente',
              description: `${data.subject} - da ${data.from}`,
            });
            reloadTickets();
            break;

          case 'TICKET_ASSIGNED':
            toast({
              title: '🎧 Ticket preso in carico',
              description: `Assegnato a ${data.assignedTo}`,
            });
            reloadTickets();
            break;

          case 'TICKET_UNASSIGNED':
            toast({
              title: '🔓 Ticket rilasciato',
              description: `È tornato disponibile`,
            });
            reloadTickets();
            break;

          case 'TICKET_CLOSED':
            toast({
              title: '🔒 Ticket chiuso',
              description: `${data.subject} è stato chiuso`,
            });
            reloadTickets();
            break;

          default:
            console.warn('Evento non gestito:', data);
        }
      } catch (err) {
        console.error('Errore parsing evento SSE:', err);
      }
    });

    eventSource.addEventListener('ping', () => {
      console.log('🔄 Keep-alive ricevuto');
    });

    eventSource.onopen = () => {
      console.log('🔗 SSE connesso al backend');
    };

    eventSource.onerror = (e) => {
      console.warn('⚠️ SSE disconnesso, retry in 5s', e);
      eventSource.close();
      setTimeout(() => {
        // Riconnessione automatica
        const newEventSource = new EventSource(url);
        newEventSource.addEventListener('ticket-update', (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            console.log('📡 Evento ticket-update (reconnected):', data);
            // Gestione eventi come sopra...
          } catch (err) {
            console.error('Errore parsing evento SSE (reconnected):', err);
          }
        });
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, [toast, incrementUnread, reloadTickets]);
}
