const base = process.env.NEXT_PUBLIC_API_URL!;

/**
 * Ping dell'API backend per verificare la connessione
 */
export async function pingAPI() {
  const res = await fetch(`${base}/api/admin/ping`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
  });
  
  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText}`);
  }
  
  return res.json();
}

/**
 * Recupera le statistiche generali
 */
export async function getStats() {
  const res = await fetch(`${base}/api/admin/stats`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera i dati del mercato
 */
export async function getPendingMarket() {
  const res = await fetch(`${base}/api/admin/valuation/pending`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera i ticket di supporto
 */
export async function getSupportTickets() {
  const res = await fetch(`${base}/api/admin/support/tickets`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera l'overview del mercato
 */
export async function getMarketOverview() {
  const res = await fetch(`${base}/api/admin/valuation/overview`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera le statistiche di supporto
 */
export async function getSupportStats() {
  const res = await fetch(`${base}/api/admin/support/stats`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera le notifiche
 */
export async function getNotifications() {
  const res = await fetch(`${base}/api/admin/notifications`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Risolve una notifica
 */
export async function resolveNotification(id: number) {
  const res = await fetch(`${base}/api/admin/notifications/${id}/resolve`, {
    method: "PATCH",
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera i dettagli di un item
 */
export async function getItemDetails(itemName: string) {
  const res = await fetch(`${base}/api/admin/valuation/${itemName}`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Approva un item
 */
export async function approveItem(itemName: string) {
  const res = await fetch(`${base}/api/admin/valuation/${itemName}/approve`, {
    method: "POST",
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Rifiuta un item
 */
export async function rejectItem(itemName: string) {
  const res = await fetch(`${base}/api/admin/valuation/${itemName}/reject`, {
    method: "POST",
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera le impostazioni di sistema
 */
export async function getSystemSettings() {
  const res = await fetch(`${base}/api/admin/settings`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Recupera gli utenti
 */
export async function getUsers() {
  const res = await fetch(`${base}/api/admin/users`, {
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Risponde a un ticket
 */
export async function respondToTicket(ticketId: number, response: string) {
  const res = await fetch(`${base}/api/admin/support/tickets/${ticketId}/respond`, {
    method: "POST",
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ response }),
  });
  return res.json();
}

/**
 * Chiude un ticket
 */
export async function closeTicket(ticketId: number) {
  const res = await fetch(`${base}/api/admin/support/tickets/${ticketId}/close`, {
    method: "PATCH",
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
    },
  });
  return res.json();
}

/**
 * Aggiorna lo stato di un utente
 */
export async function updateUserStatus(userId: string, status: string) {
  const res = await fetch(`${base}/api/admin/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
}