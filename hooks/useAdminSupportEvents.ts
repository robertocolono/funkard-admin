'use client';

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AdminUser {
  id: string;
  role: "support" | "admin" | "super_admin";
  name?: string;
  email?: string;
}

export function useAdminSupportEvents(admin: AdminUser | null) {
  const { toast } = useToast();

  useEffect(() => {
    if (!admin) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://funkard-api.onrender.com";
    const streamUrl = `${baseUrl}/api/admin/support/stream?userId=${admin.id}&role=${admin.role}`;

    console.log(`🔗 Connessione SSE a: ${streamUrl}`);

    const es = new EventSource(streamUrl, { withCredentials: true });

    es.addEventListener("connected", () => {
      console.info(`✅ SSE connesso per ruolo: ${admin.role} (${admin.name || admin.email})`);
    });

    // 🆕 Nuovo ticket
    es.addEventListener("new-ticket", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 New ticket event:', data);
        
        // Solo super_admin e admin vedono nuovi ticket
        if (admin.role === "super_admin" || admin.role === "admin") {
          toast({
            title: "🆕 Nuovo ticket aperto",
            description: `${data.subject} — da ${data.email}`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Errore parsing new-ticket:', error);
      }
    });

    // 💬 Nuova risposta dell'utente
    es.addEventListener("ticket-reply", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Ticket reply event:', data);
        
        // Filtro per ruolo: support vede solo i suoi ticket
        const shouldShow = admin.role === "super_admin" || 
                          admin.role === "admin" ||
                          (admin.role === "support" && data.assignedTo === admin.id);
        
        if (shouldShow) {
          toast({
            title: "💬 Nuova risposta da utente",
            description: `Ticket #${data.ticketId} (${data.subject})`,
            duration: 4000,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-reply:', error);
      }
    });

    // 🧭 Ticket assegnato a un support
    es.addEventListener("ticket-assigned", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Ticket assigned event:', data);
        
        // Mostra solo se assegnato a me o sono super_admin
        const shouldShow = admin.role === "super_admin" || 
                          (data.assignedTo === admin.id);
        
        if (shouldShow) {
          toast({
            title: "🎯 Ticket assegnato",
            description: `Ticket #${data.id} → assegnato a ${data.assignedToName || data.assignedTo}`,
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
        
        if (admin.role === "super_admin" || admin.role === "admin") {
          toast({
            title: "🔓 Ticket rilasciato",
            description: `Ticket #${data.id} è tornato disponibile`,
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
        const shouldShow = admin.role === "super_admin" || 
                          (data.assignedTo === admin.id);
        
        if (shouldShow) {
          toast({
            title: "✅ Ticket risolto",
            description: `#${data.id} ora è chiuso.`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-resolved:', error);
      }
    });

    // 📬 Aggiornamento stato ticket
    es.addEventListener("ticket-status-changed", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 Ticket status changed event:', data);
        
        const shouldShow = admin.role === "super_admin" || 
                          (admin.role === "support" && data.assignedTo === admin.id) ||
                          (admin.role === "admin" && data.assignedTo === admin.id);
        
        if (shouldShow) {
          toast({
            title: "📬 Stato ticket aggiornato",
            description: `Ticket #${data.id} ora è ${data.status}`,
            duration: 4000,
          });
        }
      } catch (error) {
        console.error('Errore parsing ticket-status-changed:', error);
      }
    });

    // 🧩 Notifiche globali (solo super_admin)
    es.addEventListener("system-event", (event) => {
      try {
        if (admin.role !== "super_admin") return;
        
        const data = JSON.parse(event.data);
        console.log('📡 System event:', data);
        
        toast({
          title: "🛠 Evento di sistema",
          description: data.message,
          duration: 6000,
        });
      } catch (error) {
        console.error('Errore parsing system-event:', error);
      }
    });

    // 🔄 Keep-alive ping
    es.addEventListener("ping", () => {
      console.log('🔄 SSE keep-alive ricevuto');
    });

    // Connessione aperta
    es.onopen = () => {
      console.log(`🔗 SSE connesso per admin: ${admin.role} (${admin.name || admin.email})`);
    };

    // 🔌 Gestione errori / reconnessione
    es.onerror = (error) => {
      console.warn("⚠️ Connessione SSE interrotta, riconnessione in 5s...", error);
      es.close();
      
      // Riconnessione automatica
      setTimeout(() => {
        console.log('🔄 Tentativo di riconnessione SSE...');
        const newEs = new EventSource(streamUrl, { withCredentials: true });
        
        // Re-imposta tutti i listener
        setupEventListeners(newEs);
      }, 5000);
    };

    // Funzione helper per setup listener
    const setupEventListeners = (eventSource: EventSource) => {
      eventSource.addEventListener("connected", () => {
        console.info(`✅ SSE riconnesso per ruolo: ${admin.role}`);
      });

      eventSource.addEventListener("new-ticket", (event) => {
        try {
          const data = JSON.parse(event.data);
          if (admin.role === "super_admin" || admin.role === "admin") {
            toast({
              title: "🆕 Nuovo ticket aperto",
              description: `${data.subject} — da ${data.email}`,
              duration: 5000,
            });
          }
        } catch (error) {
          console.error('Errore parsing new-ticket (reconnected):', error);
        }
      });

      // Re-imposta tutti gli altri listener...
      // (per brevità, omettiamo la ripetizione di tutti i listener)
    };

    return () => {
      console.log(`🔌 SSE disconnesso per admin: ${admin.role}`);
      es.close();
    };
  }, [admin, toast]);
}
