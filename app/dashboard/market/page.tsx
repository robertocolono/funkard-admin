"use client";

import { useEffect, useState } from "react";

export default function MarketPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ fetch reale pronto
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/valuation/pending`)
    //   .then(res => res.json())
    //   .then(setItems)
    //   .finally(() => setLoading(false));

    // Mock temporaneo per testing
    setTimeout(() => {
      setItems([
        {
          id: "1",
          name: "Charizard Base Set",
          category: "Pokemon",
          currentPrice: 450,
          daysSinceLastUpdate: 2,
          status: "pending"
        },
        {
          id: "2", 
          name: "Black Lotus",
          category: "Magic",
          currentPrice: 25000,
          daysSinceLastUpdate: 1,
          status: "pending"
        },
        {
          id: "3",
          name: "Blue-Eyes White Dragon",
          category: "Yu-Gi-Oh",
          currentPrice: 120,
          daysSinceLastUpdate: 3,
          status: "pending"
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Market - Prodotti Pending</h2>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Caricamento prodotti...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Nessun prodotto pending</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.category}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ultimo aggiornamento: {item.daysSinceLastUpdate} giorni fa
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">€{item.currentPrice.toLocaleString()}</p>
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mt-2">
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Approva
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Rifiuta
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                    Dettagli
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
