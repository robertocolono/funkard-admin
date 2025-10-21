'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { fetchTicketById, sendAdminMessage, updateTicketStatus } from '@/lib/funkardApi';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

// ✅ Helper ruolo (semplificato)
function useAdminRole() {
  if (typeof window === 'undefined') return 'guest';
  return localStorage.getItem('funkard_admin_role') || 'guest';
}

export default function TicketDetailPage() {
  const { id } = useParams();
  const role = useAdminRole();
  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const canManage =
    role === 'super_admin' || (role === 'support' && ticket?.assignedTo === 'me');
  const canReply = ['support', 'admin', 'super_admin'].includes(role);

  // Carica ticket
  const loadTicket = async () => {
    try {
      const data = await fetchTicketById(id as string);
      setTicket(data);
      setMessages(data.messages || []);
    } catch (e) {
      console.error(e);
      toast.error('Errore nel caricamento del ticket');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicket();
    const interval = setInterval(loadTicket, 8000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await sendAdminMessage(id as string, newMessage);
      setNewMessage('');
      await loadTicket();
    } catch {
      toast.error('Errore invio messaggio');
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateTicketStatus(id as string, newStatus);
      toast.success(`Stato aggiornato a ${newStatus}`);
      await loadTicket();
    } catch {
      toast.error('Errore aggiornamento stato');
    }
  };

  const handleAssign = async () => {
    try {
      await updateTicketStatus(id as string, 'ASSIGNED');
      toast.success('Ticket assegnato a te');
      await loadTicket();
    } catch {
      toast.error('Errore durante assegnazione');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-400">
        <Loader2 className="animate-spin mr-2" /> Caricamento ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Ticket non trovato o errore di connessione.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* HEADER INFO */}
      <div className="border-b border-neutral-800 pb-3 mb-3">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-yellow-500 mb-1">{ticket.subject}</h1>
            <p className="text-sm text-gray-400">
              ID: {ticket.id} — {ticket.email}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {role === 'support' && ticket.assignedTo !== 'me' && (
              <button
                onClick={handleAssign}
                className="px-3 py-1 bg-blue-500/10 border border-blue-500 text-blue-400 rounded text-xs hover:bg-blue-500/20 transition"
              >
                Assegna a me
              </button>
            )}

            {canManage && (
              <>
                <button
                  onClick={() => handleStatusChange('IN_PROGRESS')}
                  className="px-3 py-1 bg-yellow-500/10 border border-yellow-500 text-yellow-400 rounded text-xs hover:bg-yellow-500/20 transition"
                >
                  In lavorazione
                </button>
                <button
                  onClick={() => handleStatusChange('RESOLVED')}
                  className="px-3 py-1 bg-green-500/10 border border-green-500 text-green-400 rounded text-xs hover:bg-green-500/20 transition"
                >
                  Risolto
                </button>
                <button
                  onClick={() => handleStatusChange('CLOSED')}
                  className="px-3 py-1 bg-neutral-800 border border-neutral-700 text-gray-400 rounded text-xs hover:bg-neutral-700 transition"
                >
                  Chiudi
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
          <span>
            Stato:{' '}
            <span className={`font-medium ${
              ticket.status === 'NEW'
                ? 'text-red-400'
                : ticket.status === 'IN_PROGRESS'
                ? 'text-yellow-400'
                : ticket.status === 'RESOLVED'
                ? 'text-green-400'
                : 'text-gray-400'
            }`}>
              {ticket.status}
            </span>
          </span>
          <span>• Priorità: {ticket.priority}</span>
          <span>• Categoria: {ticket.category}</span>
          <span>• Assegnato a: {ticket.assignedTo || 'Nessuno'}</span>
          <span>• Ultimo aggiornamento: {new Date(ticket.updatedAt).toLocaleString('it-IT')}</span>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.fromAdmin ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-md text-sm ${
                m.fromAdmin
                  ? 'bg-yellow-500 text-black'
                  : 'bg-neutral-800 text-gray-200'
              }`}
            >
              {m.message}
            </div>
            <span className="text-[10px] text-gray-500 mt-1">
              {new Date(m.createdAt).toLocaleString('it-IT')}
              {m.fromAdmin && ' • Admin'}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      {canReply && (
        <div className="mt-3 border-t border-neutral-800 pt-3 flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Scrivi una risposta..."
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md text-gray-100 text-sm p-2 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-500"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={sending}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md transition disabled:bg-yellow-500/40"
          >
            {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}