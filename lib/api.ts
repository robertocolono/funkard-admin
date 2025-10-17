// TEMPORANEAMENTE DISABILITATO - Mock per evitare problemi CORS
const base = process.env.NEXT_PUBLIC_API_URL!;

/**
 * Ping dell'API backend per verificare la connessione
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function pingAPI() {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response
  return {
    status: "connected",
    message: "Mock API - Connessione simulata",
    timestamp: new Date().toISOString()
  };
}

/**
 * Recupera le statistiche generali
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getStats() {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock stats
  return {
    users: 124,
    cards: 512,
    pending: 8,
    tickets: 3,
    revenue: 15420,
    growth: {
      users: 12,
      cards: 45,
      revenue: 8.5
    }
  };
}

/**
 * Recupera i dati del mercato
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getPendingMarket() {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Mock pending market data
  return [
    {
      id: "1",
      name: "Charizard Base Set",
      category: "Pokemon",
      currentPrice: 450,
      historicalData: [420, 430, 440, 450],
      daysSinceLastUpdate: 2,
      status: "pending" as "pending" | "approved" | "rejected"
    },
    {
      id: "2", 
      name: "Black Lotus",
      category: "Magic",
      currentPrice: 25000,
      historicalData: [24000, 24500, 24800, 25000],
      daysSinceLastUpdate: 1,
      status: "pending" as "pending" | "approved" | "rejected"
    },
    {
      id: "3",
      name: "Blue-Eyes White Dragon",
      category: "Yu-Gi-Oh",
      currentPrice: 120,
      historicalData: [110, 115, 118, 120],
      daysSinceLastUpdate: 3,
      status: "pending" as "pending" | "approved" | "rejected"
    }
  ];
}

/**
 * Recupera i ticket di supporto
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getSupportTickets() {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Mock support tickets
  return [
    {
      id: "1",
      user: "mario.rossi@email.com",
      subject: "Problema con pagamento",
      message: "Non riesco a completare l'acquisto della carta Charizard",
      status: "open" as "open" | "in_progress" | "closed",
      priority: "high" as "low" | "medium" | "high",
      createdAt: "2024-01-15T10:30:00Z",
      lastUpdate: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      user: "lucia.bianchi@email.com", 
      subject: "Richiesta rimborso",
      message: "Vorrei richiedere un rimborso per un acquisto duplicato",
      status: "in_progress" as "open" | "in_progress" | "closed",
      priority: "medium" as "low" | "medium" | "high",
      createdAt: "2024-01-14T15:45:00Z",
      lastUpdate: "2024-01-15T09:20:00Z",
      adminResponse: "Stiamo verificando la transazione"
    },
    {
      id: "3",
      user: "giovanni.verdi@email.com",
      subject: "Domanda su spedizione",
      message: "Quando arriverà il mio ordine?",
      status: "closed" as "open" | "in_progress" | "closed",
      priority: "low" as "low" | "medium" | "high",
      createdAt: "2024-01-13T12:00:00Z",
      lastUpdate: "2024-01-14T16:30:00Z",
      adminResponse: "Il tuo ordine è stato spedito e arriverà entro 2-3 giorni lavorativi"
    }
  ];
}

/**
 * Recupera l'overview del mercato
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getMarketOverview() {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Mock market overview data
  return [
    { day: "Lun", newProducts: 12, pendingItems: 3 },
    { day: "Mar", newProducts: 8, pendingItems: 5 },
    { day: "Mer", newProducts: 15, pendingItems: 2 },
    { day: "Gio", newProducts: 10, pendingItems: 4 },
    { day: "Ven", newProducts: 18, pendingItems: 1 },
    { day: "Sab", newProducts: 6, pendingItems: 3 },
    { day: "Dom", newProducts: 4, pendingItems: 2 }
  ];
}

/**
 * Recupera le statistiche di supporto
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getSupportStats() {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 650));
  
  // Mock support stats data
  return [
    { day: "Lun", opened: 5, closed: 3 },
    { day: "Mar", opened: 3, closed: 4 },
    { day: "Mer", opened: 7, closed: 2 },
    { day: "Gio", opened: 4, closed: 6 },
    { day: "Ven", opened: 6, closed: 3 },
    { day: "Sab", opened: 2, closed: 1 },
    { day: "Dom", opened: 1, closed: 2 }
  ];
}

/**
 * Recupera le notifiche
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getNotifications() {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock notifications
  return [
    {
      id: 1,
      title: "Nuovo prodotto senza storico",
      message: "Charizard Base Set aggiunto senza dati storici",
      type: "MARKET",
      severity: "WARN",
      resolved: false,
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Errore di grading",
      message: "Problema con il sistema di valutazione automatica",
      type: "GRADING", 
      severity: "ERROR",
      resolved: false,
      createdAt: "2024-01-15T09:15:00Z"
    },
    {
      id: 3,
      title: "Ticket supporto urgente",
      message: "Nuovo ticket con priorità alta da mario.rossi@email.com",
      type: "SUPPORT",
      severity: "INFO",
      resolved: false,
      createdAt: "2024-01-15T08:45:00Z"
    }
  ];
}

/**
 * Risolve una notifica
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function resolveNotification(id: number) {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock response
  return {
    success: true,
    message: `Notifica ${id} risolta con successo (MOCK)`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Recupera i dettagli di un item
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getItemDetails(itemName: string) {
  // Simula un delay di rete
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock item details
  return {
    id: itemName,
    name: itemName,
    category: "Pokemon",
    currentPrice: 450,
    suggestedPrice: 480,
    historicalData: [420, 430, 440, 450, 460, 470, 480],
    daysSinceLastUpdate: 2,
    status: "pending" as "pending" | "approved" | "rejected",
    trend: "up",
    confidence: 0.85
  };
}

/**
 * Approva un item
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function approveItem(itemName: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    success: true,
    message: `Item ${itemName} approvato con successo (MOCK)`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Rifiuta un item
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function rejectItem(itemName: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    success: true,
    message: `Item ${itemName} rifiutato con successo (MOCK)`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Recupera le impostazioni di sistema
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getSystemSettings() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    mailEnabled: true,
    adminEmail: "admin@funkard.com",
    apiStatus: "online" as "online" | "offline",
    lastBackup: "2024-01-15T08:00:00Z",
    version: "1.2.3"
  };
}

/**
 * Recupera gli utenti
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function getUsers() {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    {
      id: "1",
      email: "mario.rossi@email.com",
      name: "Mario Rossi",
      type: "private" as "private" | "business",
      createdAt: "2024-01-10T10:00:00Z",
      lastLogin: "2024-01-15T09:30:00Z",
      totalCards: 25,
      totalSpent: 1250
    },
    {
      id: "2",
      email: "lucia.bianchi@email.com",
      name: "Lucia Bianchi",
      type: "business" as "private" | "business",
      createdAt: "2024-01-08T14:20:00Z",
      lastLogin: "2024-01-15T08:45:00Z",
      totalCards: 150,
      totalSpent: 8750
    },
    {
      id: "3",
      email: "giovanni.verdi@email.com",
      name: "Giovanni Verdi",
      type: "private" as "private" | "business",
      createdAt: "2024-01-12T16:30:00Z",
      lastLogin: "2024-01-14T20:15:00Z",
      totalCards: 8,
      totalSpent: 320
    }
  ];
}

/**
 * Risponde a un ticket
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function respondToTicket(ticketId: number, response: string) {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    success: true,
    message: `Risposta inviata al ticket ${ticketId} (MOCK)`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Chiude un ticket
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function closeTicket(ticketId: number) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    success: true,
    message: `Ticket ${ticketId} chiuso con successo (MOCK)`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Aggiorna lo stato di un utente
 * MOCK TEMPORANEO - Disabilitato per evitare CORS
 */
export async function updateUserStatus(userId: string, status: string) {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    success: true,
    message: `Stato utente ${userId} aggiornato a ${status} (MOCK)`,
    timestamp: new Date().toISOString()
  };
}