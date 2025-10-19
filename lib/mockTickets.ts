// lib/mockTickets.ts
import { SupportTicket } from "@/types/SupportTicket";

export const mockTickets: SupportTicket[] = [
  {
    id: "1",
    email: "luca@example.com",
    subject: "Problema con pagamento",
    message: "Ho completato il pagamento ma l'ordine non risulta. Ho inviato la ricevuta via email ma non ho ricevuto conferma.",
    createdAt: "2025-01-15T14:25:00Z",
    status: "NEW",
  },
  {
    id: "2",
    email: "marco@example.com",
    subject: "Carta non visibile nel profilo",
    message: "Ho caricato una carta ma non appare nel mio inventario. Ho provato a ricaricare la pagina ma non funziona.",
    createdAt: "2025-01-14T11:10:00Z",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    email: "elena@example.com",
    subject: "Errore di login",
    message: "Non riesco più ad accedere, mi dice token scaduto. Ho provato a resettare la password ma non ricevo l'email.",
    createdAt: "2025-01-13T09:40:00Z",
    status: "RESOLVED",
    updatedAt: "2025-01-13T15:30:00Z",
    resolvedAt: "2025-01-13T15:30:00Z"
  },
  {
    id: "4",
    email: "giulia@example.com",
    subject: "Valutazione carta errata",
    message: "La valutazione della mia carta Charizard sembra troppo bassa. Potete ricontrollare?",
    createdAt: "2025-01-12T16:20:00Z",
    status: "NEW",
  },
  {
    id: "5",
    email: "andrea@example.com",
    subject: "Richiesta informazioni",
    message: "Vorrei sapere come funziona il sistema di grading e quanto tempo ci vuole per completare una valutazione.",
    createdAt: "2025-01-11T10:15:00Z",
    status: "RESOLVED",
    updatedAt: "2025-01-11T14:45:00Z",
    resolvedAt: "2025-01-11T14:45:00Z"
  }
];
