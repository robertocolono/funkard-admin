"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCleanupLast } from "@/lib/api/system";

type Health = {
  lastResult: "success" | "error" | "unknown";
  lastDeleted: number | null;
  lastAt: string | null;
};

const AdminHealthCtx = createContext<Health>({ lastResult: "unknown", lastDeleted: null, lastAt: null });

export function useAdminHealth() {
  return useContext(AdminHealthCtx);
}

export function AdminHealthProvider({ children }: { children: React.ReactNode }) {
  const [health, setHealth] = useState<Health>({ lastResult: "unknown", lastDeleted: null, lastAt: null });

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const last = await getCleanupLast();
        if (!mounted) return;
        if (!last) {
          setHealth({ lastResult: "unknown", lastDeleted: null, lastAt: null });
          return;
        }
        setHealth({ lastResult: last.result, lastDeleted: last.deleted, lastAt: last.timestamp });

        // Toast solo se errore
        if (last.result === "error") {
          // minimal toast senza dipendenze
          const el = document.createElement("div");
          el.className =
            "fixed top-4 right-4 z-[1000] bg-red-600 text-white rounded-lg px-4 py-3 shadow-lg";
          el.textContent = "⚠️ Cleanup fallito: controlla Sistema → Log cleanup";
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 5000);
        }
      } catch {
        if (!mounted) return;
        setHealth({ lastResult: "unknown", lastDeleted: null, lastAt: null });
      }
    };

    load();
    const id = setInterval(load, 5 * 60 * 1000); // ogni 5 minuti
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const value = useMemo(() => health, [health]);
  return <AdminHealthCtx.Provider value={value}>{children}</AdminHealthCtx.Provider>;
}
