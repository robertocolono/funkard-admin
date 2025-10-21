'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { fetchTicketById, replyToTicket, assignTicket, closeTicket } from '@/lib/funkardApi';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
  fromAdmin: boolean;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  email: string;
  assignedTo?: string | null;
  locked: boolean;
  messages: Message[];
  createdAt: string;
}

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params?.id as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [role, setRole] = useState<'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT' | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  /** ✅ Carica il ticket */
  const loadTicket = useCallback(async () => {
    try {
      const data = await fetchTicketById(ticketId);
      setTicket(data);
    } catch (err) {
      console.error('Errore caricamento ticket', err);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  /** 📡 Invia un messaggio */
  const handleReply = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await replyToTicket(ticketId, newMessage);
      setNewMessage('');
      await loadTicket();
    } catch (err) {
      alert('Errore invio messaggio');
    } finally {
      setSending(false);
    }
  };

  /** 🧩 Prendi in carico ticket */
  const handleAssign = async () => {
    try {
      const email = localStorage.getItem('funkard_admin_email');
      if (!email) return alert('Email admin non trovata.');
      await assignTicket(ticketId, email);
      await loadTicket();
    } catch {
      alert('Errore assegnazione ticket');
    }
  };

  /** ✅ Chiudi ticket */
  const handleClose = async () => {
    if (!confirm('Sei sicuro di voler chiudere questo ticket?')) return;
    try {
      await closeTicket(ticketId);
      await loadTicket();
    } catch {
      alert('Errore chiusura ticket');
    }
  };

  /** 🔐 Recupera ruolo admin */
  useEffect(() => {
    const storedRole = localStorage.getItem('funkard_role') as
      | 'SUPER_ADMIN'
      | 'ADMIN'
      | 'SUPPORT'
      | null;
    setRole(storedRole);
    loadTicket();

    // Polling aggiornamenti
    const interval = setInterval(loadTicket, 7000);
    return () => clearInterval(interval);
  }, [loadTicket]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-gray-400">
        Caricamento ticket...
      </div>
    );

  if (!ticket)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Ticket non trovato.
      </div>
    );

  const isAssignedToMe =
    ticket.assignedTo &&
    ticket.assignedTo === localStorage.getItem('funkard_admin_email');

  const canReply =
    role === 'SUPER_ADMIN' || (role === 'SUPPORT' && isAssignedToMe);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{ticket.subject}</h1>
            <p className="text-gray-400 text-sm">
              Ticket #{ticket.id} • {ticket.category} • Priorità:{' '}
              <span className="text-yellow-400 font-semibold">{ticket.priority}</span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Creato il {new Date(ticket.createdAt).toLocaleString('it-IT')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold uppercase',
                ticket.status === 'OPEN' && 'bg-green-500/20 text-green-400',
                ticket.status === 'IN_PROGRESS' && 'bg-yellow-500/20 text-yellow-400',
                ticket.status === 'RESOLVED' && 'bg-blue-500/20 text-blue-400',
                ticket.status === 'CLOSED' && 'bg-gray-600/20 text-gray-400'
              )}
            >
              {ticket.status}
            </span>

            {role === 'SUPPORT' && !ticket.assignedTo && (
              <button
                onClick={handleAssign}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Prendi in carico
              </button>
            )}

            {role === 'SUPER_ADMIN' && (
              <button
                onClick={handleClose}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Chiudi Ticket
              </button>
            )}
          </div>
        </div>

        {/* CHAT */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'p-3 rounded-lg w-fit max-w-[80%]',
                msg.fromAdmin
                  ? 'bg-yellow-500/20 text-yellow-100 self-end ml-auto'
                  : 'bg-zinc-800 text-gray-200'
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {msg.fromAdmin ? 'Staff' : ticket.email} •{' '}
                {new Date(msg.createdAt).toLocaleTimeString('it-IT')}
              </p>
            </div>
          ))}
        </div>

        {/* BOX MESSAGGIO */}
        {canReply && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Scrivi una risposta..."
              className="flex-1 bg-zinc-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none min-h-[80px]"
            />
            <button
              onClick={handleReply}
              disabled={sending}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/50 text-black font-semibold px-6 rounded-lg transition-colors"
            >
              {sending ? 'Invio...' : 'Invia'}
            </button>
          </div>
        )}

        {!canReply && (
          <p className="text-gray-500 text-sm italic text-center">
            {ticket.assignedTo
              ? ticket.assignedTo === localStorage.getItem('funkard_admin_email')
                ? 'Ticket assegnato a te.'
                : `Ticket gestito da ${ticket.assignedTo}.`
              : 'Ticket non ancora preso in carico.'}
          </p>
        )}
      </div>
    </div>
  );
}