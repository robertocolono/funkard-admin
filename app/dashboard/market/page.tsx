"use client";

import { useEffect, useState } from "react";

interface MarketItem {
  id: string;
  name: string;
  category: string;
  seller: string;
  price: number;
  status: "active" | "sold" | "pending";
  createdAt: string;
}

export default function MarketPage() {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Fetch reale pronto, da attivare dopo fix backend:
    /*
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/market`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Errore ${res.status}`);
        return res.json();
      })
      .then(setItems)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing UI
    setTimeout(() => {
      setItems([
        {
          id: "c_001",
          name: "Charizard Holo 1st Edition",
          category: "Pokémon",
          seller: "mike_collector",
          price: 1299.99,
          status: "active",
          createdAt: "2025-01-14T10:32:00Z"
        },
        {
          id: "c_002",
          name: "Blue-Eyes White Dragon",
          category: "Yu-Gi-Oh!",
          seller: "yugi_master",
          price: 349.5,
          status: "sold",
          createdAt: "2025-01-12T15:00:00Z"
        },
        {
          id: "c_003",
          name: "Black Lotus",
          category: "Magic: The Gathering",
          seller: "mtg_legend",
          price: 25000.0,
          status: "pending",
          createdAt: "2025-01-15T08:45:00Z"
        },
        {
          id: "c_004",
          name: "Pikachu Illustrator",
          category: "Pokémon",
          seller: "pokemon_fan",
          price: 5000.0,
          status: "active",
          createdAt: "2025-01-13T14:20:00Z"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Caricamento dati...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">Errore: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Market</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-zinc-800 transition">
            Aggiorna
          </button>
          <button className="px-4 py-2 bg-yellow-400 text-black text-sm rounded-lg hover:bg-yellow-500 transition">
            Esporta CSV
          </button>
        </div>
      </header>

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-left">Venditore</th>
              <th className="p-3 text-left">Prezzo (€)</th>
              <th className="p-3 text-left">Stato</th>
              <th className="p-3 text-left">Data</th>
              <th className="p-3 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  Nessuna carta trovata
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-mono text-xs">{item.id}</td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{item.seller}</td>
                  <td className="p-3 font-semibold">€{item.price.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "sold"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("it-IT")}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition">
                        Dettagli
                      </button>
                      {item.status === "active" && (
                        <button className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition">
                          Disattiva
                        </button>
                      )}
                      {item.status === "pending" && (
                        <button className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition">
                          Approva
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Statistiche rapide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Carte Attive</h3>
          <p className="text-2xl font-bold text-green-600">
            {items.filter(item => item.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Vendite Totali</h3>
          <p className="text-2xl font-bold text-blue-600">
            {items.filter(item => item.status === "sold").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">In Attesa</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {items.filter(item => item.status === "pending").length}
          </p>
        </div>
      </div>
    </div>
  );
}