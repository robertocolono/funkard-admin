// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

/**
 * API client generico per Funkard Admin.
 * Gestisce tutte le chiamate e include automaticamente i token.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_URL non definito nelle env");
  if (!ADMIN_TOKEN) console.warn("⚠️ NEXT_PUBLIC_ADMIN_TOKEN non impostato (solo per test locali)");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ADMIN_TOKEN}`,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ Errore API ${res.status}: ${text}`);
    throw new Error(`API error ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    return {} as T;
  }
}

/**
 * Wrapper comodo per GET (usato dalle varie sezioni)
 */
export function apiGet<T>(endpoint: string) {
  return apiRequest<T>(endpoint, { method: "GET" });
}

/**
 * Wrapper per POST
 */
export function apiPost<T>(endpoint: string, body?: any) {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body || {}),
  });
}

/**
 * Wrapper per PATCH
 */
export function apiPatch<T>(endpoint: string, body?: any) {
  return apiRequest<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body || {}),
  });
}

/**
 * Wrapper per DELETE
 */
export function apiDelete<T>(endpoint: string) {
  return apiRequest<T>(endpoint, { method: "DELETE" });
}

/**
 * Wrapper per PUT
 */
export function apiPut<T>(endpoint: string, body?: any) {
  return apiRequest<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body || {}),
  });
}

/**
 * Ping dell'API backend per verificare la connessione
 */
export async function pingAPI() {
  return apiGet<{
    status: string;
    message: string;
    timestamp: string;
  }>("/api/admin/ping");
}

/**
 * Recupera statistiche generali del dashboard
 */
export async function getStats() {
  return apiGet<{
    users: number;
    products: number;
    sales: number;
    tickets: number;
  }>("/api/admin/stats");
}

/**
 * Recupera lista utenti
 */
export async function getUsers() {
  return apiGet<Array<{
    id: string;
    email: string;
    name: string;
    type: "private" | "business";
    totalCards: number;
    totalSpent: number;
    createdAt: string;
    lastLogin: string;
  }>>("/api/admin/users");
}

/**
 * Recupera lista carte market
 */
export async function getMarketItems() {
  return apiGet<Array<{
    id: string;
    name: string;
    category: string;
    seller: string;
    price: number;
    status: "active" | "sold" | "pending";
    createdAt: string;
  }>>("/api/admin/market");
}

/**
 * Recupera dettaglio carta singola
 */
export async function getMarketItem(id: string) {
  return apiGet<{
    id: string;
    name: string;
    category: string;
    seller: string;
    price: number;
    status: "active" | "sold" | "pending";
    createdAt: string;
    description: string;
    condition: "mint" | "near_mint" | "excellent" | "good" | "fair" | "poor";
    images: string[];
    history: Array<{
      date: string;
      action: string;
      user: string;
    }>;
  }>(`/api/admin/market/${id}`);
}

/**
 * Recupera ticket supporto
 */
export async function getSupportTickets() {
  return apiGet<Array<{
    id: string;
    user: string;
    subject: string;
    message: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high";
    createdAt: string;
    lastUpdate: string;
    adminResponse?: string;
  }>>("/api/admin/support/tickets");
}

// ===== NOTIFICHE ADMIN =====

/**
 * Recupera notifiche admin attive con filtri
 */
export async function getNotifications(filters?: {
  type?: string;
  priority?: string;
  status?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.type) params.append("type", filters.type);
  if (filters?.priority) params.append("priority", filters.priority);
  if (filters?.status) params.append("status", filters.status);
  
  const query = params.toString();
  const endpoint = query ? `/api/admin/notifications?${query}` : "/api/admin/notifications";
  
  return apiGet<Array<{
    id: number;
    type: string;
    priority: string;
    title: string;
    message: string;
    readStatus: boolean;
    readAt: string | null;
    createdAt: string;
    archived: boolean;
    resolvedAt: string | null;
    resolvedBy: string | null;
    history: string;
  }>>(endpoint);
}

/**
 * Recupera notifiche archiviate
 */
export async function getArchivedNotifications() {
  return apiGet<Array<{
    id: number;
    type: string;
    priority: string;
    title: string;
    message: string;
    createdAt: string;
    archivedAt: string;
    resolvedAt: string | null;
    resolvedBy: string | null;
    history: string;
  }>>("/api/admin/notifications/archive");
}

/**
 * Recupera dettaglio notifica
 */
export async function getNotification(id: number) {
  return apiGet<{
    id: number;
    type: string;
    priority: string;
    title: string;
    message: string;
    readStatus: boolean;
    readAt: string | null;
    createdAt: string;
    archived: boolean;
    resolvedAt: string | null;
    resolvedBy: string | null;
    history: string;
  }>(`/api/admin/notifications/${id}`);
}

/**
 * Segna notifica come letta
 */
export async function markNotificationAsRead(id: number) {
  return apiPost(`/api/admin/notifications/${id}/read`);
}

/**
 * Risolvi notifica con nota opzionale
 */
export async function resolveNotification(id: number, note?: string) {
  return apiPost(`/api/admin/notifications/${id}/resolve`, { note });
}

/**
 * Archivia notifica con nota opzionale
 */
export async function archiveNotification(id: number, note?: string) {
  return apiPost(`/api/admin/notifications/${id}/archive`, { note });
}

/**
 * Conta notifiche non lette
 */
export async function getUnreadCount() {
  return apiGet<{ unreadCount: number }>("/api/admin/notifications/unreadCount");
}

/**
 * Recupera notifiche recenti per SSE
 */
export async function getRecentNotifications() {
  return apiGet<Array<{
    id: number;
    type: string;
    priority: string;
    title: string;
    message: string;
    createdAt: string;
  }>>("/api/admin/notifications/recent");
}

/**
 * Cleanup notifiche archiviate
 */
export async function cleanupArchivedNotifications(days: number = 30) {
  return apiDelete<{ deleted: number; olderThanDays: number }>(`/api/admin/notifications/cleanup?days=${days}`);
}

/**
 * Recupera impostazioni sistema
 */
export async function getSystemSettings() {
  return apiGet<{
    mailEnabled: boolean;
    adminEmail: string;
    apiStatus: "online" | "offline";
    lastBackup: string;
    version: string;
  }>("/api/admin/settings");
}

/**
 * Azioni admin per carte market
 */
export async function approveMarketItem(id: string) {
  return apiPatch(`/api/admin/market/${id}/approve`);
}

export async function rejectMarketItem(id: string, reason?: string) {
  return apiPatch(`/api/admin/market/${id}/reject`, { reason });
}

export async function deactivateMarketItem(id: string) {
  return apiPatch(`/api/admin/market/${id}/deactivate`);
}

/**
 * Azioni admin per ticket supporto
 */
export async function respondToTicket(id: string, response: string) {
  return apiPost(`/api/admin/support/tickets/${id}/respond`, { response });
}

export async function closeTicket(id: string) {
  return apiPatch(`/api/admin/support/tickets/${id}/close`);
}

/**
 * Azioni admin per utenti
 */
export async function updateUserStatus(id: string, status: "active" | "suspended" | "banned") {
  return apiPatch(`/api/admin/users/${id}/status`, { status });
}

/**
 * Azioni sistema
 */
export async function triggerBackup() {
  return apiPost("/api/admin/system/backup");
}

export async function clearCache() {
  return apiPost("/api/admin/system/clear-cache");
}

export async function cleanupNotifications() {
  return apiPost("/api/admin/system/cleanup-notifications");
}

/**
 * Recupera valutazioni pending
 */
export async function getPendingValuations() {
  return apiGet<Array<{
    id: string;
    name: string;
    category: string;
    currentPrice: number;
    historicalData: number[];
    daysSinceLastUpdate: number;
    status: "pending";
  }>>("/api/admin/valuation/pending");
}

/**
 * Controlla stato valutazione
 */
export async function checkValuationStatus(itemName: string) {
  return apiGet<{
    status: "pending" | "approved" | "rejected";
    lastCheck: string;
    nextCheck?: string;
  }>(`/api/admin/valuation/check/${itemName}`);
}

/**
 * Funzioni legacy per compatibilità
 */
export async function getPendingMarket() {
  return getPendingValuations();
}

export async function getItemDetails(itemName: string) {
  return apiGet<{
    id: string;
    name: string;
    category: string;
    currentPrice: number;
    historicalData: number[];
    daysSinceLastUpdate: number;
    status: "pending" | "approved" | "rejected";
  }>(`/api/admin/valuation/${itemName}`);
}

export async function approveItem(itemName: string) {
  return apiPatch(`/api/admin/valuation/${itemName}/approve`);
}

export async function rejectItem(itemName: string) {
  return apiPatch(`/api/admin/valuation/${itemName}/reject`);
}