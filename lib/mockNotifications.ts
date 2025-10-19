// lib/mockNotifications.ts
import { AdminNotificationDTO } from "@/types/Notification";

export const mockNotifications: AdminNotificationDTO[] = [
  {
    id: "1",
    type: "market_event",
    title: "Nuovo prodotto segnalato",
    message: "Una carta è stata segnalata per descrizione sospetta.",
    priority: "normal",
    read: false,
    createdAt: "2025-01-15T09:30:00Z"
  },
  {
    id: "2",
    type: "new_user",
    title: "Richiesta assistenza #421",
    message: "Utente ha aperto un ticket riguardo pagamento non confermato.",
    priority: "low",
    read: true,
    createdAt: "2025-01-14T14:45:00Z"
  },
  {
    id: "3",
    type: "system_alert",
    title: "Errore API valutazione",
    message: "Fallito collegamento con servizio grading esterno.",
    priority: "urgent",
    read: false,
    createdAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "4",
    type: "system_alert",
    title: "Backup completato",
    message: "Backup automatico del database completato con successo.",
    priority: "low",
    read: true,
    createdAt: "2025-01-15T03:00:00Z"
  },
  {
    id: "5",
    type: "grading_error",
    title: "Nuova valutazione richiesta",
    message: "Carta 'Charizard Holo' richiede valutazione professionale.",
    priority: "normal",
    read: false,
    createdAt: "2025-01-15T11:15:00Z"
  },
  {
    id: "6",
    type: "market_event",
    title: "Prodotto approvato",
    message: "Carta 'Blue-Eyes White Dragon' approvata e pubblicata.",
    priority: "low",
    read: true,
    createdAt: "2025-01-14T16:30:00Z"
  }
];
