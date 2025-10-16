"use client";
import { PendingItem } from '@/lib/types';

interface PendingTableProps {
  data: PendingItem[];
}

export default function PendingTable({ data }: PendingTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-400 text-black';
      case 'approved': return 'bg-green-400 text-black';
      case 'rejected': return 'bg-red-400 text-black';
      default: return 'bg-gray-400 text-black';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'In Attesa';
      case 'approved': return 'Approvato';
      case 'rejected': return 'Rifiutato';
      default: return 'Sconosciuto';
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Prodotto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Prezzo Attuale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Giorni Senza Aggiornamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Stato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-200">{item.name}</div>
                    <div className="text-sm text-gray-400">ID: {item.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-black">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">€{item.currentPrice}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${item.daysSinceLastUpdate > 7 ? 'text-red-400' : 'text-gray-200'}`}>
                    {item.daysSinceLastUpdate} giorni
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a 
                    href={`/market/${encodeURIComponent(item.name)}`}
                    className="text-yellow-400 hover:text-yellow-300 mr-3"
                  >
                    Dettagli
                  </a>
                  <button className="text-green-400 hover:text-green-300 mr-3">
                    Approva
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    Rifiuta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Nessun prodotto in attesa di revisione
        </div>
      )}
    </div>
  );
}
