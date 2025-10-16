import { apiClient } from "@/lib/apiClient";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications`;

export interface AdminNotification {
  id: number;
  type: string;
  message: string;
  createdAt: string;
  resolved: boolean;
  title?: string;
  severity?: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  productId?: string;
  userId?: string;
  isRead?: boolean;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: {
    ERROR: number;
    WARNING: number;
    SUCCESS: number;
    INFO: number;
  };
}

/**
 * Recupera tutte le notifiche attive (non risolte)
 */
export async function getActiveNotifications(): Promise<AdminNotification[]> {
  return await apiClient(`${BASE_URL}/active`, {
    method: "GET",
  });
}

/**
 * Segna una notifica come risolta
 */
export async function markNotificationAsResolved(id: number): Promise<void> {
  await apiClient(`${BASE_URL}/${id}/resolve`, {
    method: "PATCH",
  });
}

/**
 * Alias per compatibilità
 */
export const markAsResolved = markNotificationAsResolved;

/**
 * Recupera le notifiche archiviate (risolte)
 */
export async function getArchivedNotifications(): Promise<AdminNotification[]> {
  return await apiClient(`${BASE_URL}/archived`, {
    method: "GET",
  });
}

/**
 * Statistiche notifiche
 */
export async function getNotificationStats(): Promise<NotificationStats> {
  return await apiClient(`${BASE_URL}/stats`, {
    method: "GET",
  });
}

/**
 * Marca tutte le notifiche come lette
 */
export async function markAllAsRead(): Promise<void> {
  await apiClient(`${BASE_URL}/mark-all-read`, {
    method: "PATCH",
  });
}
