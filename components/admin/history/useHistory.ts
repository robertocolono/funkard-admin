"use client";
import { useState, useEffect } from "react";

export function useHistory(type: string, targetId: number) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type || !targetId) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/history/${type}/${targetId}`)
      .then(res => res.json())
      .then(setHistory)
      .finally(() => setLoading(false));
  }, [type, targetId]);

  return { history, loading };
}
