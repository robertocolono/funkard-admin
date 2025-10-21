'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from '@/lib/useSession';

interface UseTicketSSEOptions {
  ticketId: string | number;
  onTicketUpdate?: (data: any) => void;
  onMessageUpdate?: (data: any) => void;
}

export function useTicketSSE({ ticketId, onTicketUpdate, onMessageUpdate }: UseTicketSSEOptions) {
  const { toast } = useToast();
  const { user } = useSession();

  useEffect(() => {
    if (!ticketId) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/support/stream`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener('ticket-update', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        
        // Filtra solo eventi per questo ticket specifico
        if (data.ticketId === parseInt(ticketId as string) || data.id === parseInt(ticketId as string)) {
          console.log('📡 Evento ticket specifico:', data);

          switch (data.type) {
            case 'NEW_MESSAGE':
              // Toast solo se il messaggio è per me
              const shouldShowMessage = user?.role === 'SUPER_ADMIN' || 
                                     (user?.role === 'SUPPORT' && data.assignedTo === user?.email);
              
              if (shouldShowMessage) {
                toast({
                  title: '💬 Nuovo messaggio nel ticket',
                  description: `#${ticketId} - ${data.sender}: ${data.preview || 'Nuovo messaggio'}`,
                });
              }
              onMessageUpdate?.(data);
              break;

            case 'TICKET_ASSIGNED':
              if (data.assignedTo === user?.email) {
                toast({
                  title: '🎧 Ticket assegnato a te',
                  description: `Hai preso in carico il ticket #${ticketId}`,
                });
              }
              onTicketUpdate?.(data);
              break;

            case 'TICKET_UNASSIGNED':
              toast({
                title: '🔓 Ticket rilasciato',
                description: `Ticket #${ticketId} è tornato disponibile`,
              });
              onTicketUpdate?.(data);
              break;

            case 'TICKET_CLOSED':
              toast({
                title: '✅ Ticket risolto',
                description: `Ticket #${ticketId} è stato chiuso`,
              });
              onTicketUpdate?.(data);
              break;

            case 'TICKET_STATUS_CHANGED':
              toast({
                title: '📬 Stato ticket aggiornato',
                description: `Ticket #${ticketId} ora è ${data.status.toLowerCase()}`,
              });
              onTicketUpdate?.(data);
              break;

            case 'TICKET_PRIORITY_CHANGED':
              toast({
                title: '⚡ Priorità aggiornata',
                description: `Ticket #${ticketId} ora ha priorità ${data.priority}`,
              });
              onTicketUpdate?.(data);
              break;

            default:
              // Per altri eventi, chiama il callback generico
              onTicketUpdate?.(data);
          }
        }
      } catch (err) {
        console.error('Errore parsing evento SSE ticket:', err);
      }
    });

    eventSource.addEventListener('ping', () => {
      console.log('🔄 SSE keep-alive per ticket:', ticketId);
    });

    eventSource.onopen = () => {
      console.log('🔗 SSE connesso per ticket:', ticketId);
    };

    eventSource.onerror = (error) => {
      console.warn('⚠️ SSE disconnesso per ticket:', ticketId, error);
    };

    return () => {
      console.log('🔌 SSE disconnesso per ticket:', ticketId);
      eventSource.close();
    };
  }, [ticketId, toast, user?.role, user?.email, onTicketUpdate, onMessageUpdate]);
}
