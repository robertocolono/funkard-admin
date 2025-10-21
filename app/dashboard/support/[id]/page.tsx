'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from '@/lib/useSession';
import { useTicketSSE } from '@/hooks/useTicketSSE';
import { cn } from '@/lib/utils';
import { MessageSquare, User, Clock, Tag, AlertCircle, Send, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TicketDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useSession();
  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadTicket = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/support/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      
      if (!res.ok) {
        throw new Error('Errore nel caricamento ticket');
      }
      
      const data = await res.json();
      setTicket(data.ticket);
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Errore loadTicket:', err);
      toast({ 
        title: 'Errore nel caricamento ticket', 
        description: 'Impossibile caricare i dettagli del ticket',
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const sendReply = async () => {
    if (!reply.trim() || sending) return;
    
    setSending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/support/reply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ message: reply }),
      });
      
      if (res.ok) {
        setReply('');
        await loadTicket();
        toast({ 
          title: 'Messaggio inviato ✅', 
          description: 'Il messaggio è stato inviato all\'utente'
        });
      } else {
        throw new Error('Errore nell\'invio del messaggio');
      }
    } catch (err) {
      console.error('Errore sendReply:', err);
      toast({ 
        title: 'Errore durante l\'invio', 
        description: 'Impossibile inviare il messaggio',
        variant: 'destructive' 
      });
    } finally {
      setSending(false);
    }
  };

  const handleAssign = async () => {
    if (assigning) return;
    
    setAssigning(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/support/assign/${id}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (res.ok) {
        await loadTicket();
        toast({ 
          title: '🎧 Ticket preso in carico', 
          description: 'Hai preso in carico questo ticket'
        });
      } else {
        throw new Error('Errore nell\'assegnazione');
      }
    } catch (err) {
      console.error('Errore handleAssign:', err);
      toast({ 
        title: 'Errore nell\'assegnazione', 
        description: 'Impossibile prendere in carico il ticket',
        variant: 'destructive' 
      });
    } finally {
      setAssigning(false);
    }
  };

  const handleUnassign = async () => {
    if (assigning) return;
    
    setAssigning(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/support/unassign/${id}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (res.ok) {
        await loadTicket();
        toast({ 
          title: '🔓 Ticket rilasciato', 
          description: 'Il ticket è tornato disponibile'
        });
      } else {
        throw new Error('Errore nel rilascio');
      }
    } catch (err) {
      console.error('Errore handleUnassign:', err);
      toast({ 
        title: 'Errore nel rilascio', 
        description: 'Impossibile rilasciare il ticket',
        variant: 'destructive' 
      });
    } finally {
      setAssigning(false);
    }
  };

  // Auto-scroll in fondo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // SSE per aggiornamenti in tempo reale del ticket specifico
  useTicketSSE({
    ticketId: id as string,
    onTicketUpdate: async (data) => {
      console.log('📡 Ticket aggiornato via SSE:', data);
      await loadTicket();
    },
    onMessageUpdate: async (data) => {
      console.log('💬 Nuovo messaggio via SSE:', data);
      await loadTicket();
    }
  });

  useEffect(() => {
    if (user?.token) {
      loadTicket();
    }
  }, [id, user?.token]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading || !ticket) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Caricamento ticket...</p>
        </div>
      </div>
    );
  }

  const canManageTicket = user?.role === 'SUPER_ADMIN' || user?.role === 'SUPPORT';
  const isAssignedToMe = ticket.assignedTo === user?.email;
  const isLockedByOther = ticket.locked && !isAssignedToMe;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl font-bold text-white">{ticket.subject}</h1>
                <Badge className={cn("px-3 py-1 text-xs font-semibold", getStatusColor(ticket.status))}>
                  {ticket.status}
                </Badge>
                <Badge className={cn("px-3 py-1 text-xs font-semibold", getPriorityColor(ticket.priority))}>
                  {ticket.priority}
                </Badge>
                {ticket.locked && (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-3 py-1 text-xs font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Bloccato
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{ticket.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{ticket.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(ticket.createdAt).toLocaleString('it-IT')}</span>
                </div>
                {ticket.assignedTo && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Assegnato a {ticket.assignedTo}</span>
                  </div>
                )}
              </div>
            </div>

            {/* AZIONI */}
            {canManageTicket && (
              <div className="flex gap-3">
                {!ticket.locked ? (
                  <Button
                    onClick={handleAssign}
                    disabled={assigning}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  >
                    {assigning ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    {assigning ? 'Assegnando...' : 'Prendi in carico'}
                  </Button>
                ) : isAssignedToMe ? (
                  <Button
                    onClick={handleUnassign}
                    disabled={assigning}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  >
                    {assigning ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Unlock className="w-4 h-4" />
                    )}
                    {assigning ? 'Rilasciando...' : 'Rilascia'}
                  </Button>
                ) : (
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>In carico a {ticket.assignedTo}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CHAT MESSAGGI */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Conversazione</h2>
          </div>
          
          <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 h-[50vh] overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p>Nessun messaggio ancora</p>
                <p className="text-sm">Inizia la conversazione con l'utente</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'max-w-[80%] p-4 rounded-lg',
                    msg.fromAdmin
                      ? 'ml-auto bg-yellow-500 text-black'
                      : 'mr-auto bg-zinc-800 text-gray-100'
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleString('it-IT')}
                    {msg.fromAdmin && (
                      <span className="ml-2 text-yellow-600 font-semibold">Admin</span>
                    )}
                  </p>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* INPUT MESSAGGIO */}
        {ticket.locked && isAssignedToMe && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendReply()}
                placeholder="Scrivi un messaggio all'utente..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                disabled={sending}
              />
              <Button
                onClick={sendReply}
                disabled={!reply.trim() || sending}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {sending ? 'Invio...' : 'Invia'}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Premi Invio per inviare il messaggio
            </p>
          </div>
        )}

        {/* INFO AGGIUNTIVE */}
        {!ticket.locked && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-blue-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Ticket non assegnato</span>
            </div>
            <p className="text-xs mt-1">
              Prendi in carico questo ticket per iniziare a rispondere all'utente
            </p>
          </div>
        )}

        {isLockedByOther && (
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 text-orange-300">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Ticket assegnato ad altro support</span>
            </div>
            <p className="text-xs mt-1">
              Questo ticket è attualmente gestito da {ticket.assignedTo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}