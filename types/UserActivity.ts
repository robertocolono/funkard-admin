// types/UserActivity.ts

export type ActivityType =
  | "login"
  | "logout"
  | "card_upload"
  | "card_sale"
  | "report"
  | "support_ticket"
  | "account_update"
  | "warning";

export interface UserActivity {
  id: string;
  userId: string;
  type: ActivityType;
  message: string;
  createdAt: string;
  severity: "low" | "medium" | "high";
  metadata?: {
    ip?: string;
    userAgent?: string;
    cardId?: string;
    orderId?: string;
    ticketId?: string;
  };
}
