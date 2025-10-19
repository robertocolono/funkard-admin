'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fetchSupportTicketById, updateTicketStatus } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import type { SupportTicket } from '@/types/SupportTicket';

// 🔸 Colori coerenti con la lista tickets
const STATUS_COLOR: Record<string, string> = {
  NEW: 'bg-red-600/30 text-red-400',
  IN_PROGRESS: 'bg-orange-500/30 text-orange-400',
  RESOLVED: 'bg-green-500/30 text-green-400',
  ARCHIVED: 'bg-neutral-600/30 text-neutral-300',
};

export default function SupportTicketDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [adminNote, setAdminNote] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSupportTicketById(id as string);
        setTicket(data);
        setNewStatus(data.status);
      } catch (e) {
        console.error('Errore caricamento ticket:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!ticket || !newStatus) return;
    
    setUpdating(true);
    try {
      await updateTicketStatus(ticket.id, newStatus, adminNote || undefined);
      const updatedTicket = await fetchSupportTicketById(id as string);
      setTicket(updatedTicket);
      setAdminNote('');
    } catch (error) {
      console.error('Errore aggiornamento ticket:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-6 text-neutral-400">Caricamento ticket...</p>;
  if (!ticket)
    return (
      <div className="p-6">
        <p className="text-neutral-400 mb-4">Ticket non trovato o eliminato.</p>
        <Button variant="outline" onClick={() => router.back()}>
          ← Torna ai ticket
        </Button>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Ticket Support <span className="text-neutral-500">#{ticket.id.slice(0, 8)}</span>
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          ← Torna alla lista
        </Button>
      </div>

      {/* INFORMAZIONI TICKET */}
      <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-4">
        <div className="flex gap-2 items-center">
          <Badge className={STATUS_COLOR[ticket.status]}>
            {ticket.status}
          </Badge>
          <span className="text-sm text-neutral-400">
            Creato: {new Date(ticket.createdAt).toLocaleString('it-IT')}
          </span>
        </div>

        <Separator className="my-2 bg-neutral-800" />

        <div className="grid gap-2 text-sm">
          <p>
            <span className="text-neutral-500">Da: </span>
            <span className="font-medium text-white">{ticket.email}</span>
          </p>

          <p>
            <span className="text-neutral-500">Oggetto: </span>
            <span className="font-medium text-amber-400">{ticket.subject}</span>
          </p>

          {ticket.updatedAt && (
            <p>
              <span className="text-neutral-500">Ultimo aggiornamento: </span>
              {new Date(ticket.updatedAt).toLocaleString('it-IT')}
            </p>
          )}

          {ticket.resolvedAt && (
            <p>
              <span className="text-neutral-500">Risolto il: </span>
              {new Date(ticket.resolvedAt).toLocaleString('it-IT')}
            </p>
          )}
        </div>

        <Separator className="my-3 bg-neutral-800" />

        <div>
          <p className="text-neutral-500 mb-2">Messaggio:</p>
          <p className="text-neutral-300 bg-neutral-950 p-3 rounded border border-neutral-800">
            {ticket.message}
          </p>
        </div>

        {ticket.adminNote && (
          <>
            <Separator className="my-3 bg-neutral-800" />
            <div>
              <p className="text-neutral-500 mb-2">Nota admin:</p>
              <p className="text-amber-300 bg-amber-950/20 p-3 rounded border border-amber-800/30">
                {ticket.adminNote}
              </p>
            </div>
          </>
        )}
      </Card>

      {/* AGGIORNA STATO */}
      <Card className="bg-neutral-900 border-neutral-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Aggiorna Stato</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-neutral-400 mb-2 block">Nuovo stato:</label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Seleziona stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">Nuovo</SelectItem>
                <SelectItem value="IN_PROGRESS">In lavorazione</SelectItem>
                <SelectItem value="RESOLVED">Risolto</SelectItem>
                <SelectItem value="ARCHIVED">Archiviato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-neutral-400 mb-2 block">Nota admin (opzionale):</label>
            <Textarea
              placeholder="Aggiungi una nota per questo ticket..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              className="bg-neutral-950 border-neutral-800"
            />
          </div>

          <Button
            onClick={handleStatusUpdate}
            disabled={updating || newStatus === ticket.status}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {updating ? 'Aggiornamento...' : 'Aggiorna Stato'}
          </Button>
        </div>
      </Card>

      {/* FOOTER INFORMATIVO */}
      <Card className="bg-neutral-950 border-neutral-900 p-5">
        <p className="text-xs text-neutral-500">
          Ticket di supporto generato automaticamente dal sistema Funkard.
          <br />
          Gli aggiornamenti di stato vengono tracciati nei log admin.
        </p>
      </Card>
    </motion.div>
  );
}