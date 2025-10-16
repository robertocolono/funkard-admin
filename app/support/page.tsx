"use client";
import { useEffect, useState } from "react";
import TicketCard from "@/components/TicketCard";
import { getSupportTickets } from "@/lib/api";
import { Ticket } from "@/lib/types";

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = () => {
    getSupportTickets()
      .then(setTickets)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { 
    loadTickets();
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
      <h1 className="text-2xl font-bold mb-4">🎧 Support Clienti</h1>
      {tickets.length === 0 ? (
        <p className="text-gray-400">Nessun ticket aperto.</p>
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => (
            <TicketCard 
              key={t.id} 
              ticket={t} 
              onUpdate={loadTickets}
            />
          ))}
        </div>
      )}
    </div>
  );
}
