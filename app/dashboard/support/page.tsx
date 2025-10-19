'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchSupportTickets, updateTicketStatus } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import type { SupportTicket, SupportTicketFilters } from '@/types/SupportTicket';

// 🔹 Mappa colori per gli stati
const STATUS_COLOR: Record<string, string> = {
  NEW: 'bg-red-600/30 text-red-400',
  IN_PROGRESS: 'bg-orange-500/30 text-orange-400',
  RESOLVED: 'bg-green-500/30 text-green-400',
  ARCHIVED: 'bg-neutral-600/30 text-neutral-300',
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SupportTicketFilters>({ 
    status: 'all', 
    search: '' 
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSupportTickets();
      setTickets(data);
    } catch (e) {
      console.error('Errore caricamento ticket:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const statusMatch = filters.status === 'all' || t.status === filters.status;
      const searchMatch = !filters.search || 
        t.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.message.toLowerCase().includes(filters.search.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [tickets, filters]);

  const handleStatusUpdate = async (id: string, status: string, note?: string) => {
    try {
      await updateTicketStatus(id, status, note);
      await load();
    } catch (error) {
      console.error('Errore aggiornamento ticket:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-semibold text-white">
          Support Tickets
        </h1>
        <div className="text-sm text-neutral-400">
          {filtered.length} ticket{filtered.length !== 1 ? 's' : ''} trovati
        </div>
      </motion.div>

      {/* FILTRI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3"
      >
        <Select
          value={filters.status}
          onValueChange={(v) => setFilters((f) => ({ ...f, status: v }))}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti</SelectItem>
            <SelectItem value="NEW">Nuovi</SelectItem>
            <SelectItem value="IN_PROGRESS">In lavorazione</SelectItem>
            <SelectItem value="RESOLVED">Risolti</SelectItem>
            <SelectItem value="ARCHIVED">Archiviati</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Cerca per email, oggetto o messaggio..."
          className="w-64"
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
        />

        <Button onClick={load} disabled={loading}>
          {loading ? 'Caricamento...' : 'Aggiorna'}
        </Button>
      </motion.div>

      {/* LISTA TICKETS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {loading ? (
          <p className="text-neutral-400">Caricamento ticket...</p>
        ) : filtered.length === 0 ? (
          <p className="text-neutral-400">Nessun ticket trovato.</p>
        ) : (
          <div className="grid gap-3">
            {filtered.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-neutral-900 border-neutral-800 p-5 hover:border-orange-500/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={STATUS_COLOR[ticket.status]}>
                          {ticket.status}
                        </Badge>
                        <span className="text-xs text-neutral-500">
                          {new Date(ticket.createdAt).toLocaleString('it-IT')}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">
                        {ticket.subject}
                      </h3>
                      
                      <p className="text-neutral-400 text-sm mb-2 line-clamp-2">
                        {ticket.message}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span>Da: {ticket.email}</span>
                        {ticket.adminNote && (
                          <span className="text-amber-400">
                            Nota admin: {ticket.adminNote}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Link href={`/dashboard/support/${ticket.id}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          Dettagli
                        </Button>
                      </Link>
                      
                      {ticket.status === 'NEW' && (
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => handleStatusUpdate(ticket.id, 'IN_PROGRESS', 'Preso in carico')}
                        >
                          Prendi in carico
                        </Button>
                      )}
                      
                      {ticket.status === 'IN_PROGRESS' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate(ticket.id, 'RESOLVED', 'Risolto')}
                        >
                          Risolvi
                        </Button>
                      )}
                      
                      {ticket.status === 'RESOLVED' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(ticket.id, 'ARCHIVED', 'Archiviato')}
                        >
                          Archivia
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}