// FRONTEND ADMIN — API System
export async function getCleanupLogs(): Promise<any[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/system/cleanup/logs`, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load cleanup logs");
  return res.json();
}

export async function getCleanupLast(): Promise<{timestamp:string; result:'success'|'error'; deleted:number} | null> {
  // Se non hai un endpoint "last", leggiamo i log e prendiamo l'ultimo.
  const logs = await getCleanupLogs();
  if (!logs?.length) return null;
  const last = logs[logs.length - 1];
  return { timestamp: last.timestamp, result: last.result, deleted: last.deleted ?? 0 };
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
