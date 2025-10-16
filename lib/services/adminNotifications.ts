const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function getAdminNotificationsArchive(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/notifications/archive`, {
    headers: { 
      "X-Admin-Token": token,
      "Content-Type": "application/json"
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Errore nel caricamento archivio notifiche");
  return res.json();
}

export async function getAdminNotifications(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/notifications`, {
    headers: { 
      "X-Admin-Token": token,
      "Content-Type": "application/json"
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Errore nel caricamento notifiche");
  return res.json();
}

export async function markNotificationAsRead(token: string, notificationId: string) {
  const res = await fetch(`${API_BASE}/api/admin/notifications/${notificationId}/read`, {
    method: "PATCH",
    headers: { 
      "X-Admin-Token": token,
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) throw new Error("Errore nel marcare come letta");
  return res.json();
}

export async function markAllNotificationsAsRead(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/notifications/read-all`, {
    method: "PATCH",
    headers: { 
      "X-Admin-Token": token,
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) throw new Error("Errore nel marcare tutte come lette");
  return res.json();
}
