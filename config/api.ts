// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://funkard-backend.onrender.com",
  ADMIN_TOKEN: process.env.NEXT_PUBLIC_ADMIN_TOKEN || "your-admin-token-here",
  ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "contact.funkard@gmail.com",
  ADMIN_ROLE: process.env.NEXT_PUBLIC_ADMIN_ROLE || "owner",
  ENABLE_STAFF: process.env.NEXT_PUBLIC_ENABLE_STAFF === "true",
  CRON_SECRET: process.env.CRON_SECRET_TOKEN || "your-cron-secret-token-here",
}

// API Headers
export const getApiHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_CONFIG.ADMIN_TOKEN}`,
  'X-Admin-Email': API_CONFIG.ADMIN_EMAIL,
})

// Support API Endpoints
export const SUPPORT_ENDPOINTS = {
  TICKETS: `${API_CONFIG.BASE_URL}/api/admin/support/tickets`,
  TICKET_DETAIL: (id: string) => `${API_CONFIG.BASE_URL}/api/support/${id}`,
  REPLY: (id: string) => `${API_CONFIG.BASE_URL}/api/admin/support/reply/${id}`,
  CLOSE: (id: string) => `${API_CONFIG.BASE_URL}/api/admin/support/close/${id}`,
  STATS: `${API_CONFIG.BASE_URL}/api/admin/support/stats`,
}

// Notifications API Endpoints
export const NOTIFICATION_ENDPOINTS = {
  LIST: `${API_CONFIG.BASE_URL}/api/admin/notifications`,
  STREAM: `${API_CONFIG.BASE_URL}/api/admin/notifications/stream`,
  UNREAD_COUNT: `${API_CONFIG.BASE_URL}/api/admin/notifications/unreadCount`,
  RECENT: `${API_CONFIG.BASE_URL}/api/admin/notifications/recent`,
  MARK_READ: (id: string) => `${API_CONFIG.BASE_URL}/api/admin/notifications/${id}/read`,
  RESOLVE: (id: string) => `${API_CONFIG.BASE_URL}/api/admin/notifications/${id}/resolve`,
  ARCHIVE: (id: string) => `${API_CONFIG.BASE_URL}/api/admin/notifications/${id}/archive`,
  CLEANUP: `${API_CONFIG.BASE_URL}/api/admin/notifications/cleanup`,
}
