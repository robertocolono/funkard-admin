const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN!;

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

// 🗑️ Elimina notifica archiviata
export async function deleteNotification(id: number) {
  return apiFetch(`/api/admin/notifications/${id}`, { method: "DELETE" });
}
