"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMarketItem } from "@/lib/api";

interface MarketItemDetail {
  id: string;
  name: string;
  category: string;
  seller: string;
  price: number;
  status: "active" | "sold" | "pending";
  createdAt: string;
  description: string;
  condition: "mint" | "near_mint" | "excellent" | "good" | "fair" | "poor";
  images: string[];
  history: {
    date: string;
    action: string;
    user: string;
  }[];
}

export default function MarketItemDetailPage() {
  const params = useParams();
  const [item, setItem] = useState<MarketItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Fetch reale pronto, da attivare dopo fix backend:
    /*
    getMarketItem(params.id as string)
      .then(setItem)
      .catch(err => {
        console.error("Errore nel caricamento dettaglio carta:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing UI
    setTimeout(() => {
      setItem({
        id: params.id as string,
        name: "Charizard Holo 1st Edition",
        category: "Pokémon",
        seller: "mike_collector",
        price: 1299.99,
        status: "active",
        createdAt: "2025-01-14T10:32:00Z",
        description: "Carta Charizard Holo Prima Edizione in condizioni eccellenti. Provenienza certificata.",
        condition: "near_mint",
        images: [
          "https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Charizard+Front",
          "https://via.placeholder.com/300x400/4ecdc4/ffffff?text=Charizard+Back"
        ],
        history: [
          {
            date: "2025-01-14T10:32:00Z",
            action: "Carta pubblicata",
            user: "mike_collector"
          },
          {
            date: "2025-01-14T11:15:00Z",
            action: "Verifica autenticità completata",
            user: "admin"
          }
        ]
      });
      setLoading(false);
    }, 600);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Caricamento dettagli...</p>
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

  if (!item) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <p className="text-yellow-600">Carta non trovata</p>
      </div>
    );
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "mint": return "bg-green-100 text-green-800";
      case "near_mint": return "bg-blue-100 text-blue-800";
      case "excellent": return "bg-yellow-100 text-yellow-800";
      case "good": return "bg-orange-100 text-orange-800";
      case "fair": return "bg-red-100 text-red-800";
      case "poor": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-gray-600">ID: {item.id}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-zinc-800 transition">
            Modifica
          </button>
          <button className="px-4 py-2 bg-yellow-400 text-black text-sm rounded-lg hover:bg-yellow-500 transition">
            Esporta
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informazioni principali */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Informazioni Carta</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Categoria:</span>
              <span className="font-medium">{item.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Venditore:</span>
              <span className="font-medium">{item.seller}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prezzo:</span>
              <span className="font-bold text-lg">€{item.price.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stato:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                item.status === "active"
                  ? "bg-green-100 text-green-700"
                  : item.status === "sold"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {item.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Condizione:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(item.condition)}`}>
                {item.condition.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data creazione:</span>
              <span className="font-medium">{new Date(item.createdAt).toLocaleString('it-IT')}</span>
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Descrizione</h3>
          <p className="text-gray-700">{item.description}</p>
        </div>

        {/* Immagini */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Immagini</h3>
          <div className="grid grid-cols-2 gap-4">
            {item.images.map((image, index) => (
              <div key={index} className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${item.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cronologia */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Cronologia</h3>
          <div className="space-y-3">
            {item.history.map((entry, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{entry.action}</p>
                  <p className="text-sm text-gray-600">da {entry.user}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleString('it-IT')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Azioni admin */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Azioni Amministratore</h3>
        <div className="flex gap-2 flex-wrap">
          {item.status === "active" && (
            <>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Disattiva Carta
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                Richiedi Verifica
              </button>
            </>
          )}
          {item.status === "pending" && (
            <>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Approva Carta
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Rifiuta Carta
              </button>
            </>
          )}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Contatta Venditore
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
            Log Completo
          </button>
        </div>
      </div>
    </div>
  );
}
