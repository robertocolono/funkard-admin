// types/Notification.ts

export type NotificationType =
  | "market"
  | "grading"
  | "support"
  | "error"
  | "system";

export type NotificationStatus = "unread" | "resolved" | "archived";

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  importance: "low" | "medium" | "high";
  status: NotificationStatus;
  createdAt: string;
  resolvedAt?: string;
  metadata?: {
    source?: string;
    userId?: string;
    itemId?: string;
    ticketId?: string;
    errorCode?: string;
  };
}
