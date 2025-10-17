import { 
  apiGet, 
  apiPatch, 
  apiDelete,
  getNotifications,
  getArchivedNotifications,
  markNotificationAsRead,
  archiveNotification,
  deleteNotification
} from "@/lib/api";

export interface AdminNotification {
  id: number;
  title: string;
  message: string;
  type: "ERROR" | "MARKET" | "SUPPORT" | "SYSTEM" | "GRADING";
  priority: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  created_at: string;
  // Campi opzionali per compatibilità
  read_status?: boolean;
  archived_at?: string;
  // Legacy fields per compatibilità
  createdAt?: string;
  resolved?: boolean;
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
  return await getNotifications();
}

/**
 * Segna una notifica come letta
 */
export async function markNotificationAsResolved(id: number): Promise<void> {
  await markNotificationAsRead(id);
}

/**
 * Alias per compatibilità
 */
export const markAsResolved = markNotificationAsResolved;

/**
 * Recupera le notifiche archiviate (risolte)
 */
export async function getArchivedNotificationsList(): Promise<AdminNotification[]> {
  return await getArchivedNotifications();
}

/**
 * Statistiche notifiche
 */
export async function getNotificationStats(): Promise<NotificationStats> {
  // TODO: Implementare endpoint per statistiche
  return {
    total: 0,
    unread: 0,
    byType: {
      ERROR: 0,
      WARNING: 0,
      SUCCESS: 0,
      INFO: 0,
    },
  };
}

/**
 * Archivia una notifica
 */
export async function archiveNotificationById(id: number): Promise<void> {
  await archiveNotification(id);
}

/**
 * Elimina una notifica definitivamente
 */
export async function deleteNotificationById(id: number): Promise<void> {
  await deleteNotification(id);
}

/**
 * Marca tutte le notifiche come lette
 */
export async function markAllAsRead(): Promise<void> {
  // TODO: Implementare endpoint per marcare tutte come lette
  console.log("markAllAsRead non ancora implementato");
}
