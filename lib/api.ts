// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? 'https://funkard-api.onrender.com';

function headers(extra?: HeadersInit): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Admin-Email': process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'contact.funkard@gmail.com',
    ...(extra || {}),
  };
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${res.status}] ${text || 'Errore API'}`);
  }
  return res.json() as Promise<T>;
}

// 🔔 NOTIFICHE
export async function fetchNotifications(params?: Record<string, string | number | boolean>) {
  const query = new URLSearchParams();
  if (params) Object.entries(params).forEach(([k, v]) => query.append(k, String(v)));
  const res = await fetch(`${BASE_URL}/api/admin/notifications?${query.toString()}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function markRead(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/notifications/${id}/read`, {
    method: 'POST',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Impossibile segnare come letta');
}

export async function resolveNotification(id: string, note?: string) {
  const res = await fetch(`${BASE_URL}/api/admin/notifications/${id}/resolve`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ note }),
  });
  if (!res.ok) throw new Error('Impossibile risolvere la notifica');
}

export async function archiveNotification(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/notifications/${id}/archive`, {
    method: 'POST',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Impossibile archiviare la notifica');
}

export async function cleanupArchived() {
  const res = await fetch(`${BASE_URL}/api/admin/notifications/cleanup`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Cleanup fallito');
}

// 🧾 LOGS (placeholder, servirà dopo) - RIMOSSO DUPLICATO

// 🔍 CHECK SISTEMA
export async function pingSystem() {
  const res = await fetch(`${BASE_URL}/api/admin/check`, { headers: headers() });
  return handle<{ status: string }>(res);
}

// 🔍 LOGS ADMIN (con paginazione e filtri)
export async function fetchAdminLogs(params?: Record<string, string | number>) {
  const query = new URLSearchParams();
  if (params) Object.entries(params).forEach(([k, v]) => query.append(k, String(v)));

  const res = await fetch(`${BASE_URL}/api/admin/logs?${query.toString()}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

// 🔎 Singolo log
export async function fetchAdminLogById(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/logs/${id}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

// 🎫 SUPPORT TICKETS
export async function fetchSupportTickets(params?: Record<string, string>) {
  const query = new URLSearchParams();
  if (params) Object.entries(params).forEach(([k, v]) => query.append(k, String(v)));

  const res = await fetch(`${BASE_URL}/api/support?${query.toString()}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function getSupportTickets() {
  const res = await fetch(`${BASE_URL}/api/support`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function fetchSupportTicketById(id: string) {
  const res = await fetch(`${BASE_URL}/api/support/${id}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function updateTicketStatus(id: string, status: string, note?: string) {
  const res = await fetch(`${BASE_URL}/api/support/${id}/status`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ status, note }),
  });
  if (!res.ok) throw new Error('Impossibile aggiornare il ticket');
  return handle<any>(res);
}

export async function createSupportTicket(email: string, subject: string, message: string) {
  const res = await fetch(`${BASE_URL}/api/support`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, subject, message }),
  });
  if (!res.ok) throw new Error('Impossibile creare il ticket');
  return handle<any>(res);
}

// 🛒 MARKET FUNCTIONS
export async function getMarketItem(id: string) {
  const res = await fetch(`${BASE_URL}/api/market/${id}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function getPendingMarket() {
  const res = await fetch(`${BASE_URL}/api/market/pending`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function getMarketItems() {
  const res = await fetch(`${BASE_URL}/api/market`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function getItemDetails(id: string) {
  const res = await fetch(`${BASE_URL}/api/market/${id}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function approveItem(id: string) {
  const res = await fetch(`${BASE_URL}/api/market/${id}/approve`, {
    method: 'POST',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Impossibile approvare l\'item');
  return handle<any>(res);
}

export async function rejectItem(id: string, reason?: string) {
  const res = await fetch(`${BASE_URL}/api/market/${id}/reject`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error('Impossibile rifiutare l\'item');
  return handle<any>(res);
}

// 👥 USERS FUNCTIONS
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/api/admin/users`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function updateUserStatus(id: string, status: string) {
  const res = await fetch(`${BASE_URL}/api/admin/users/${id}/status`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Impossibile aggiornare lo stato utente');
  return handle<any>(res);
}

// ⚙️ SYSTEM FUNCTIONS
export async function getSystemSettings() {
  const res = await fetch(`${BASE_URL}/api/admin/settings`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

// 📊 NOTIFICATIONS FUNCTIONS
export async function getRecentNotifications(limit: number = 5) {
  const res = await fetch(`${BASE_URL}/api/admin/notifications/recent?limit=${limit}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function getUnreadCount() {
  const res = await fetch(`${BASE_URL}/api/admin/notifications/unreadCount`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

// 🎫 TICKET FUNCTIONS
export async function respondToTicket(id: string, message: string) {
  const res = await fetch(`${BASE_URL}/api/support/${id}/respond`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Impossibile rispondere al ticket');
  return handle<any>(res);
}

export async function closeTicket(id: string) {
  const res = await fetch(`${BASE_URL}/api/support/${id}/close`, {
    method: 'POST',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Impossibile chiudere il ticket');
  return handle<any>(res);
}

// 🔄 COMPATIBILITÀ - Funzioni legacy per compatibilità
export async function pingAPI() {
  return pingSystem();
}

// 🔧 GENERIC API FUNCTIONS
export async function apiGet(url: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: headers(),
    cache: 'no-store',
  });
  return handle<any>(res);
}

export async function apiDelete(url: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Errore nella richiesta DELETE');
  return handle<any>(res);
}

export async function apiPost(url: string, data?: any) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: headers(),
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!res.ok) throw new Error('Errore nella richiesta POST');
  return handle<any>(res);
}

export async function getNotifications(filters?: {
  type?: string;
  priority?: string;
  status?: string;
}) {
  return fetchNotifications(filters);
}

export async function markNotificationAsRead(id: number) {
  return markRead(String(id));
}

// RIMOSSO DUPLICATO - archiveNotification già definita sopra

export async function cleanupArchivedNotifications(days: number = 30) {
  return cleanupArchived();
}