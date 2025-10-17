const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;

// Helper per le richieste con header base
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${ADMIN_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Errore API: ${res.status} - ${text}`);
  }
  return res.json();
}

// ✅ Ping per verificare connessione admin
export async function pingAdmin() {
  return apiFetch("/api/admin/ping");
}

// 📋 Lista valutazioni pending
export async function getPendingValuations() {
  return apiFetch("/api/admin/valuation/pending");
}

// 🔍 Controllo accesso admin
export async function checkAdminAccess() {
  return apiFetch("/api/admin/valuation/check");
}

// 🔔 Stream notifiche (EventSource)
export function connectNotificationStream(onMessage: (data: any) => void) {
  const eventSource = new EventSource(`${API_BASE}/api/admin/notifications/stream`, {
    withCredentials: false,
  });

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("Errore parsing SSE:", err);
    }
  };

  eventSource.onerror = (err) => {
    console.error("Errore SSE:", err);
    eventSource.close();
  };

  return eventSource;
}

// 📦 Recupera notifiche archiviate
export async function getArchivedNotifications() {
  return apiFetch("/api/admin/notifications/archived");
}

// ✅ Segna notifica come letta o archiviata
export async function markNotificationAsRead(id: number) {
  return apiFetch(`/api/admin/notifications/${id}/read`, { method: "PATCH" });
}

// 📁 Archivia notifica
export async function archiveNotification(id: number) {
  return apiFetch(`/api/admin/notifications/archive/${id}`, { method: "PATCH" });
}

// 📋 Recupera notifiche attive
export async function getActiveNotifications() {
  return apiFetch("/api/admin/notifications");
}

// 🗑️ Elimina notifica archiviata
export async function deleteNotification(id: number) {
  return apiFetch(`/api/admin/notifications/${id}`, { method: "DELETE" });
}

// 📊 Statistiche notifiche
export async function getNotificationStats() {
  return apiFetch("/api/admin/notifications/stats");
}

// 👥 Gestione utenti
export async function getUsers() {
  return apiFetch("/api/admin/users");
}

export async function updateUserStatus(userId: string, status: "active" | "suspended" | "banned") {
  return apiFetch(`/api/admin/users/${userId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// 🛒 Gestione market
export async function getMarketItems() {
  return apiFetch("/api/admin/market");
}

export async function getMarketItem(id: string) {
  return apiFetch(`/api/admin/market/${id}`);
}

export async function approveMarketItem(id: string) {
  return apiFetch(`/api/admin/market/${id}/approve`, { method: "PATCH" });
}

export async function rejectMarketItem(id: string, reason?: string) {
  return apiFetch(`/api/admin/market/${id}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });
}

// 🎫 Gestione ticket supporto
export async function getSupportTickets() {
  return apiFetch("/api/admin/support/tickets");
}

export async function getSupportTicket(id: string) {
  return apiFetch(`/api/admin/support/tickets/${id}`);
}

export async function respondToTicket(id: string, response: string) {
  return apiFetch(`/api/admin/support/tickets/${id}/respond`, {
    method: "POST",
    body: JSON.stringify({ response }),
  });
}

export async function closeTicket(id: string) {
  return apiFetch(`/api/admin/support/tickets/${id}/close`, { method: "PATCH" });
}

// ⚙️ Operazioni sistema
export async function getSystemSettings() {
  return apiFetch("/api/admin/settings");
}

export async function triggerBackup() {
  return apiFetch("/api/admin/system/backup", { method: "POST" });
}

export async function clearCache() {
  return apiFetch("/api/admin/system/clear-cache", { method: "POST" });
}

export async function cleanupNotifications() {
  return apiFetch("/api/admin/system/cleanup-notifications", { method: "POST" });
}

// 📋 Recupera storico azioni per un oggetto specifico
export async function getActionHistory(targetType: string, targetId: number) {
  return apiFetch(`/api/admin/history/${targetType.toUpperCase()}/${targetId}`);
}
