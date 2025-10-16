"use client";
import { useEffect, useState } from "react";
import PendingTable from "@/components/PendingTable";
import { getPendingMarket } from "@/lib/api";
import { PendingItem } from "@/lib/types";

export default function MarketPage() {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    getPendingMarket()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-yellow-400">Caricamento...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🧩 Market – Prodotti da revisionare</h1>
      <PendingTable data={items} />
    </div>
  );
}
