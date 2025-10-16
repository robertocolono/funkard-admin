import { PendingItem, Ticket, User, Stats, SystemSettings } from './types';

const base = process.env.NEXT_PUBLIC_API_URL!;

const getAuthHeaders = () => ({
  "X-Admin-Token": localStorage.getItem("funkard_admin_token") || ""
});

// Dashboard API
export async function getStats(): Promise<Stats> {
  const res = await fetch(`${base}/api/admin/stats`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

// Market API
export async function getPendingMarket(): Promise<PendingItem[]> {
  const res = await fetch(`${base}/api/admin/valuation/pending`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch pending market');
  return res.json();
}

export async function getItemDetails(itemName: string): Promise<PendingItem> {
  const res = await fetch(`${base}/api/admin/valuation/item/${encodeURIComponent(itemName)}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch item details');
  return res.json();
}

export async function approveItem(itemId: string, price: number): Promise<void> {
  const res = await fetch(`${base}/api/admin/valuation/approve`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId, price })
  });
  if (!res.ok) throw new Error('Failed to approve item');
}

export async function rejectItem(itemId: string, reason: string): Promise<void> {
  const res = await fetch(`${base}/api/admin/valuation/reject`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId, reason })
  });
  if (!res.ok) throw new Error('Failed to reject item');
}

// Support API
export async function getSupportTickets(): Promise<Ticket[]> {
  const res = await fetch(`${base}/api/admin/support/tickets`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch support tickets');
  return res.json();
}

export async function respondToTicket(ticketId: string, response: string): Promise<void> {
  const res = await fetch(`${base}/api/admin/support/respond`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticketId, response })
  });
  if (!res.ok) throw new Error('Failed to respond to ticket');
}

export async function closeTicket(ticketId: string): Promise<void> {
  const res = await fetch(`${base}/api/admin/support/close`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticketId })
  });
  if (!res.ok) throw new Error('Failed to close ticket');
}

// Users API
export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${base}/api/admin/users`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function updateUserStatus(userId: string, status: 'active' | 'suspended'): Promise<void> {
  const res = await fetch(`${base}/api/admin/users/status`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, status })
  });
  if (!res.ok) throw new Error('Failed to update user status');
}

// Settings API
export async function getSystemSettings(): Promise<SystemSettings> {
  const res = await fetch(`${base}/api/admin/settings`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch system settings');
  return res.json();
}

// Dashboard Analytics API
export async function getMarketOverview(): Promise<any[]> {
  const res = await fetch(`${base}/api/admin/valuation/overview`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch market overview');
  return res.json();
}

export async function getSupportStats(): Promise<any[]> {
  const res = await fetch(`${base}/api/admin/support/stats`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch support stats');
  return res.json();
}

// Notifications API
export async function getNotifications(): Promise<any[]> {
  const res = await fetch(`${base}/api/admin/notifications`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function resolveNotification(id: string): Promise<void> {
  const res = await fetch(`${base}/api/admin/notifications/resolve/${id}`, {
    method: "POST",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to resolve notification');
}
