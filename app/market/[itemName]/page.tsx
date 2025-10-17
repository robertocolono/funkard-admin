"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TrendChart from "@/components/TrendChart";
import { getItemDetails, approveItem, rejectItem } from "@/lib/api";
import { PendingItem } from "@/lib/types";

export default function ItemDetailPage() {
  const params = useParams();
  const itemName = params.itemName as string;
  
  const [item, setItem] = useState<PendingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestedPrice, setSuggestedPrice] = useState<number>(0);
  const [rejectReason, setRejectReason] = useState<string>("");

  useEffect(() => {
    if (itemName) {
      getItemDetails(itemName)
        .then(setItem)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [itemName]);

  const handleApprove = async () => {
    if (!item || !suggestedPrice) return;
    
    try {
      await approveItem(item.id);
      alert("Prodotto approvato con successo!");
      window.history.back();
    } catch (error) {
      console.error("Failed to approve item:", error);
      alert("Errore nell'approvazione del prodotto");
    }
  };

  const handleReject = async () => {
    if (!item || !rejectReason.trim()) return;
    
    try {
      await rejectItem(item.id);
      alert("Prodotto rifiutato con successo!");
      window.history.back();
    } catch (error) {
      console.error("Failed to reject item:", error);
      alert("Errore nel rifiuto del prodotto");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-yellow-400">Caricamento...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Prodotto non trovato</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => window.history.back()}
          className="text-yellow-400 hover:text-yellow-300 mb-4"
        >
          ← Torna alla lista
        </button>
        <h1 className="text-2xl font-bold text-yellow-400">{item.name}</h1>
        <p className="text-gray-400">Categoria: {item.category}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Informazioni Prodotto</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">ID:</span>
              <span className="text-gray-200">{item.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Prezzo Attuale:</span>
              <span className="text-gray-200">€{item.currentPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Giorni Senza Aggiornamento:</span>
              <span className={`${item.daysSinceLastUpdate > 7 ? 'text-red-400' : 'text-gray-200'}`}>
                {item.daysSinceLastUpdate} giorni
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Stato:</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                item.status === 'pending' ? 'bg-yellow-400 text-black' :
                item.status === 'approved' ? 'bg-green-400 text-black' :
                'bg-red-400 text-black'
              }`}>
                {item.status === 'pending' ? 'In Attesa' :
                 item.status === 'approved' ? 'Approvato' : 'Rifiutato'}
              </span>
            </div>
          </div>
        </div>

        <TrendChart 
          data={item.historicalData} 
          title="Andamento Prezzo Storico" 
        />
      </div>

      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-yellow-400">Azioni</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium mb-3 text-green-400">Approva Prodotto</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Prezzo Suggerito (€)
                </label>
                <input
                  type="number"
                  value={suggestedPrice}
                  onChange={(e) => setSuggestedPrice(Number(e.target.value))}
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-200"
                  placeholder="Inserisci il prezzo suggerito"
                />
              </div>
              <button
                onClick={handleApprove}
                disabled={!suggestedPrice}
                className="w-full py-2 bg-green-400 text-black font-semibold rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approva Prodotto
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium mb-3 text-red-400">Rifiuta Prodotto</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Motivo del Rifiuto
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-200 resize-none"
                  rows={3}
                  placeholder="Spiega il motivo del rifiuto..."
                />
              </div>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="w-full py-2 bg-red-400 text-black font-semibold rounded hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rifiuta Prodotto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
