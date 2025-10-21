'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useTicketsStore } from '@/store/useTicketsStore';
import { useSession } from '@/lib/useSession';

export function useSupportStream() {
  const { toast } = useToast();
  const { incrementUnread, reloadTickets } = useTicketsStore();
  const { user } = useSession();

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
              description: `#${data.id} - ${data.subject} da ${data.email}`,
              duration: 5000,
            });
            reloadTickets();
            break;

          case 'NEW_MESSAGE':
            // Filtro per ruolo: solo se il ticket è assegnato a me o sono super_admin
            const shouldShowMessage = user?.role === 'SUPER_ADMIN' || 
                                   (user?.role === 'SUPPORT' && data.assignedTo === user?.email) ||
                                   (user?.role === 'ADMIN' && data.assignedTo === user?.email);
            
            if (shouldShowMessage) {
              toast({
                title: '💬 Nuovo messaggio',
                description: `Ticket #${data.ticketId} - ${data.sender}: ${data.preview || 'Nuovo messaggio ricevuto'}`,
                duration: 4000,
              });
            }
            reloadTickets();
            break;

          case 'TICKET_ASSIGNED':
            // Mostra solo se assegnato a me
            if (data.assignedTo === user?.email) {
              toast({
                title: '🎧 Ticket assegnato a te',
                description: `Hai preso in carico il ticket #${data.id} - ${data.subject}`,
                duration: 5000,
              });
            } else if (user?.role === 'SUPER_ADMIN') {
              toast({
                title: '🎧 Ticket assegnato',
                description: `Ticket #${data.id} assegnato a ${data.assignedTo}`,
                duration: 4000,
              });
            }
            reloadTickets();
            break;

          case 'TICKET_UNASSIGNED':
            if (user?.role === 'SUPER_ADMIN' || user?.role === 'SUPPORT') {
              toast({
                title: '🔓 Ticket rilasciato',
                description: `Ticket #${data.id} è tornato disponibile`,
                duration: 4000,
              });
            }
            reloadTickets();
            break;

          case 'TICKET_CLOSED':
            if (user?.role === 'SUPER_ADMIN' || 
                (user?.role === 'SUPPORT' && data.assignedTo === user?.email)) {
              toast({
                title: '✅ Ticket risolto',
                description: `Ticket #${data.id} - ${data.subject} è stato chiuso`,
                duration: 5000,
              });
            }
            reloadTickets();
            break;

          case 'TICKET_STATUS_CHANGED':
            if (user?.role === 'SUPER_ADMIN' || 
                (user?.role === 'SUPPORT' && data.assignedTo === user?.email)) {
              toast({
                title: '📬 Ticket aggiornato',
                description: `Ticket #${data.id} ora è ${data.status.toLowerCase()}`,
                duration: 4000,
              });
            }
            reloadTickets();
            break;

          case 'TICKET_PRIORITY_CHANGED':
            if (user?.role === 'SUPER_ADMIN' || 
                (user?.role === 'SUPPORT' && data.assignedTo === user?.email)) {
              toast({
                title: '⚡ Priorità cambiata',
                description: `Ticket #${data.id} ora ha priorità ${data.priority}`,
                duration: 4000,
              });
            }
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
  }, [toast, incrementUnread, reloadTickets, user?.role, user?.email]);
}
