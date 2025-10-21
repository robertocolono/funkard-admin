'use client';

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useSupportEvents(userRole?: string, userId?: string) {
  const { toast } = useToast();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://funkard-api.onrender.com";
    const es = new EventSource(`${baseUrl}/admin/support/stream`, {
      withCredentials: true,
    });

    // 📨 Aggiornamento stato ticket
    es.addEventListener("ticket-update", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Ticket update event:', data);
        
        // Filtro per ruolo: super_admin vede tutto, altri solo se assegnato a loro
        const shouldShow = userRole === 'SUPER_ADMIN' || 
                          (userRole === 'SUPPORT' && data.assignedTo === userId) ||
                          (userRole === 'ADMIN' && data.assignedTo === userId);
        
        if (shouldShow) {
          toast({
            title: "📬 Ticket aggiornato",
            description: `Il ticket #${data.id} è ora in stato "${data.status}".`,
            duration: 4000,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-update:', error);
      }
    });

    // 💬 Nuovo messaggio ricevuto
    es.addEventListener("new-message", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 New message event:', data);
        
        // Se support, mostra solo se riguarda un suo ticket
        if (userRole === "SUPPORT" && data.assignedTo && data.assignedTo !== userId) return;
        if (userRole === "ADMIN" && data.assignedTo && data.assignedTo !== userId) return;

        toast({
          title: "💬 Nuovo messaggio",
          description: `Ticket #${data.ticketId} — ${data.sender}: ${data.preview || "nuovo messaggio ricevuto"}.`,
          duration: 4000,
        });
      } catch (error) {
        console.error('Errore parsing new-message:', error);
      }
    });

    // 🎧 Ticket assegnato
    es.addEventListener("ticket-assigned", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Ticket assigned event:', data);
        
        // Se admin o super_admin → notifiche sempre
        if (userRole === "ADMIN" || userRole === "SUPER_ADMIN" || data.assignedTo === userId) {
          toast({
            title: "🎧 Ticket assegnato",
            description: `Il ticket #${data.id} è stato assegnato a ${data.assignedToName || "un membro del supporto"}.`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-assigned:', error);
      }
    });

    // 🔓 Ticket rilasciato
    es.addEventListener("ticket-unassigned", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Ticket unassigned event:', data);
        
        if (userRole === "SUPER_ADMIN" || userRole === "ADMIN" || userRole === "SUPPORT") {
          toast({
            title: "🔓 Ticket rilasciato",
            description: `Il ticket #${data.id} è tornato disponibile.`,
            duration: 4000,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-unassigned:', error);
      }
    });

    // ✅ Ticket risolto
    es.addEventListener("ticket-resolved", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Ticket resolved event:', data);
        
        // Mostra solo se assegnato a me o sono super_admin
        const shouldShow = userRole === 'SUPER_ADMIN' || 
                          (data.assignedTo === userId);
        
        if (shouldShow) {
          toast({
            title: "✅ Ticket risolto",
            description: `Il ticket #${data.id} è stato chiuso con successo.`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-resolved:', error);
      }
    });

    // 🎫 Nuovo ticket creato
    es.addEventListener("new-ticket", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 New ticket event:', data);
        
        // Solo super_admin e admin vedono nuovi ticket
        if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
          toast({
            title: "🎫 Nuovo ticket",
            description: `Nuovo ticket #${data.id} da ${data.email}: ${data.subject}`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Errore parsing new-ticket:', error);
      }
    });

    // 🔄 Keep-alive ping
    es.addEventListener("ping", () => {
      console.log('🔄 SSE keep-alive ricevuto');
    });

    // Connessione aperta
    es.onopen = () => {
      console.log('🔗 SSE connesso per support events');
    };

    // 🧨 Errore o chiusura stream
    es.onerror = (error) => {
      console.warn("⚠️ Connessione SSE interrotta, riconnessione tra 5s...", error);
      es.close();
      setTimeout(() => {
        // Riconnessione automatica
        const newEs = new EventSource(`${baseUrl}/admin/support/stream`, {
          withCredentials: true,
        });
        // Re-imposta tutti i listener
        setupEventListeners(newEs);
      }, 5000);
    };

    // Funzione helper per setup listener
    const setupEventListeners = (eventSource: EventSource) => {
      // Re-imposta tutti i listener per la riconnessione
      eventSource.addEventListener("ticket-update", (event) => {
        try {
          const data = JSON.parse(event.data);
          const shouldShow = userRole === 'SUPER_ADMIN' || 
                            (userRole === 'SUPPORT' && data.assignedTo === userId) ||
                            (userRole === 'ADMIN' && data.assignedTo === userId);
          
          if (shouldShow) {
            toast({
              title: "📬 Ticket aggiornato",
              description: `Il ticket #${data.id} è ora in stato "${data.status}".`,
              duration: 4000,
            });
          }
        } catch (error) {
          console.error('Errore parsing ticket-update (reconnected):', error);
        }
      });
    };

    return () => {
      console.log('🔌 SSE disconnesso per support events');
      es.close();
    };
  }, [toast, userRole, userId]);
}
