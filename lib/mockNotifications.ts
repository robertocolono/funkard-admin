// lib/mockNotifications.ts
import { AdminNotification } from "@/types/Notification";

export const mockNotifications: AdminNotification[] = [
  {
    id: "1",
    type: "market",
    title: "Nuovo prodotto segnalato",
    message: "Una carta è stata segnalata per descrizione sospetta.",
    importance: "medium",
    status: "unread",
    createdAt: "2025-01-15T09:30:00Z",
    metadata: {
      source: "user_report",
      itemId: "c_001",
      userId: "u_123"
    }
  },
  {
    id: "2",
    type: "support",
    title: "Richiesta assistenza #421",
    message: "Utente ha aperto un ticket riguardo pagamento non confermato.",
    importance: "low",
    status: "resolved",
    createdAt: "2025-01-14T14:45:00Z",
    resolvedAt: "2025-01-15T08:00:00Z",
    metadata: {
      source: "ticket_system",
      ticketId: "t_421",
      userId: "u_456"
    }
  },
  {
    id: "3",
    type: "error",
    title: "Errore API valutazione",
    message: "Fallito collegamento con servizio grading esterno.",
    importance: "high",
    status: "unread",
    createdAt: "2025-01-15T10:00:00Z",
    metadata: {
      source: "api_error",
      errorCode: "GRADING_API_TIMEOUT"
    }
  },
  {
    id: "4",
    type: "system",
    title: "Backup completato",
    message: "Backup automatico del database completato con successo.",
    importance: "low",
    status: "resolved",
    createdAt: "2025-01-15T03:00:00Z",
    resolvedAt: "2025-01-15T03:05:00Z",
    metadata: {
      source: "system_backup"
    }
  },
  {
    id: "5",
    type: "grading",
    title: "Nuova valutazione richiesta",
    message: "Carta 'Charizard Holo' richiede valutazione professionale.",
    importance: "medium",
    status: "unread",
    createdAt: "2025-01-15T11:15:00Z",
    metadata: {
      source: "grading_system",
      itemId: "c_002",
      userId: "u_789"
    }
  },
  {
    id: "6",
    type: "market",
    title: "Prodotto approvato",
    message: "Carta 'Blue-Eyes White Dragon' approvata e pubblicata.",
    importance: "low",
    status: "resolved",
    createdAt: "2025-01-14T16:30:00Z",
    resolvedAt: "2025-01-14T16:35:00Z",
    metadata: {
      source: "admin_approval",
      itemId: "c_003"
    }
  }
];
