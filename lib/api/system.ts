export async function getCleanupLogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/system/cleanup/logs`, {
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Errore nel recupero log di sistema");
  return res.json();
}

export async function getSystemStatus() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/system/cleanup/status`, {
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Errore nel recupero stato sistema");
  return res.json();
}

export async function triggerCleanup() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/system/cleanup/trigger`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Errore nel trigger cleanup");
  return res.json();
}
