"use client";

import { useEffect, useState } from "react";
import { getSupportTickets } from "@/lib/api";

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ fetch reale pronto
    /*
    getSupportTickets()
      .then(setTickets)
      .catch(err => {
        console.error("Errore nel caricamento ticket:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing
    setTimeout(() => {
      setTickets([
        {
          id: "1",
          user: "mario.rossi@email.com",
          subject: "Problema con pagamento",
          message: "Non riesco a completare l'acquisto della carta Charizard",
          status: "open",
          priority: "high",
          createdAt: "2024-01-15T10:30:00Z"
        },
        {
          id: "2",
          user: "lucia.bianchi@email.com", 
          subject: "Richiesta rimborso",
          message: "Vorrei richiedere un rimborso per un acquisto duplicato",
          status: "in_progress",
          priority: "medium",
          createdAt: "2024-01-14T15:45:00Z",
          adminResponse: "Stiamo verificando la transazione"
        },
        {
          id: "3",
          user: "giovanni.verdi@email.com",
          subject: "Domanda su spedizione",
          message: "Quando arriverà il mio ordine?",
          status: "closed",
          priority: "low",
          createdAt: "2024-01-13T12:00:00Z",
          adminResponse: "Il tuo ordine è stato spedito e arriverà entro 2-3 giorni lavorativi"
        }
      ]);
      setLoading(false);
    }, 700);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Support - Ticket Assistenza</h2>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Caricamento ticket...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tickets.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Nessun ticket trovato</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                    <p className="text-gray-600">{ticket.user}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(ticket.createdAt).toLocaleString('it-IT')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700">{ticket.message}</p>
                </div>

                {ticket.adminResponse && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Risposta Admin:</p>
                    <p className="text-gray-700">{ticket.adminResponse}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {ticket.status === 'open' && (
                    <>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Rispondi
                      </button>
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                        In Progress
                      </button>
                    </>
                  )}
                  {ticket.status === 'in_progress' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Chiudi
                    </button>
                  )}
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
