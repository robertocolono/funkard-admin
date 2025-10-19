export interface AdminNotificationDTO {
  id: string;
  title: string;
  message: string;
  type: 'new_card' | 'new_user' | 'new_sale' | 'system_alert' | 'market_event' | 'product_update' | 'grading_error';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  read: boolean;
  archivedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationFilters {
  type: string;
  priority: string;
  state: string;
  q: string;
}