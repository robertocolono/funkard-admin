// lib/mockActivities.ts
import { UserActivity } from "@/types/UserActivity";

export const mockActivities: UserActivity[] = [
  {
    id: "a1",
    userId: "u1",
    type: "login",
    message: "Accesso effettuato da Chrome su Windows 10",
    createdAt: "2025-01-15T22:30:00Z",
    severity: "low",
    metadata: {
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  },
  {
    id: "a2",
    userId: "u1",
    type: "card_upload",
    message: "Caricata carta Charizard PSA 10 (TCG Pokémon)",
    createdAt: "2025-01-14T17:45:00Z",
    severity: "low",
    metadata: {
      cardId: "c_001"
    }
  },
  {
    id: "a3",
    userId: "u1",
    type: "card_sale",
    message: "Venduta carta Blue-Eyes White Dragon per €150",
    createdAt: "2025-01-13T14:20:00Z",
    severity: "low",
    metadata: {
      cardId: "c_002",
      orderId: "o_001"
    }
  },
  {
    id: "a4",
    userId: "u2",
    type: "report",
    message: "Segnalazione ricevuta per comportamento scorretto in trattativa",
    createdAt: "2025-01-10T13:15:00Z",
    severity: "medium",
    metadata: {
      ticketId: "t_001"
    }
  },
  {
    id: "a5",
    userId: "u2",
    type: "support_ticket",
    message: "Aperto ticket di supporto per problema con pagamento",
    createdAt: "2025-01-08T16:30:00Z",
    severity: "low",
    metadata: {
      ticketId: "t_002"
    }
  },
  {
    id: "a6",
    userId: "u3",
    type: "warning",
    message: "Utente bannato per frode marketplace (5 segnalazioni verificate)",
    createdAt: "2025-01-05T10:00:00Z",
    severity: "high"
  },
  {
    id: "a7",
    userId: "u3",
    type: "report",
    message: "Segnalazione per tentativo di vendita di carte false",
    createdAt: "2025-01-04T15:45:00Z",
    severity: "high"
  },
  {
    id: "a8",
    userId: "u4",
    type: "card_upload",
    message: "Caricata collezione completa Yu-Gi-Oh! (50 carte)",
    createdAt: "2025-01-14T11:20:00Z",
    severity: "low",
    metadata: {
      cardId: "c_003"
    }
  },
  {
    id: "a9",
    userId: "u4",
    type: "account_update",
    message: "Aggiornato numero di telefono",
    createdAt: "2025-01-12T09:15:00Z",
    severity: "low"
  },
  {
    id: "a10",
    userId: "u5",
    type: "login",
    message: "Accesso effettuato da Safari su iPhone",
    createdAt: "2025-01-13T09:30:00Z",
    severity: "low",
    metadata: {
      ip: "192.168.1.101",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"
    }
  },
  {
    id: "a11",
    userId: "u5",
    type: "card_sale",
    message: "Venduta carta Black Lotus per €12,000",
    createdAt: "2025-01-11T16:45:00Z",
    severity: "low",
    metadata: {
      cardId: "c_004",
      orderId: "o_002"
    }
  },
  {
    id: "a12",
    userId: "u5",
    type: "report",
    message: "Segnalazione per comportamento inappropriato nei commenti",
    createdAt: "2025-01-09T14:30:00Z",
    severity: "medium",
    metadata: {
      ticketId: "t_003"
    }
  }
];
