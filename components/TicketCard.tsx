"use client";
import { useState } from 'react';
import { Ticket } from '@/lib/types';
import { respondToTicket, closeTicket } from '@/lib/api';

interface TicketCardProps {
  ticket: Ticket;
  onUpdate?: () => void;
}

export default function TicketCard({ ticket, onUpdate }: TicketCardProps) {
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400 text-black';
      case 'medium': return 'bg-yellow-400 text-black';
      case 'low': return 'bg-green-400 text-black';
      default: return 'bg-gray-400 text-black';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-400 text-black';
      case 'in_progress': return 'bg-yellow-400 text-black';
      case 'closed': return 'bg-green-400 text-black';
      default: return 'bg-gray-400 text-black';
    }
  };

  const handleRespond = async () => {
    if (!response.trim()) return;
    
    setIsResponding(true);
    try {
      await respondToTicket(ticket.id, response);
      setResponse('');
      onUpdate?.();
    } catch (error) {
      console.error('Failed to respond to ticket:', error);
    } finally {
      setIsResponding(false);
    }
  };

  const handleClose = async () => {
    try {
      await closeTicket(ticket.id);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to close ticket:', error);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">{ticket.subject}</h3>
          <p className="text-sm text-gray-400">Da: {ticket.user}</p>
          <p className="text-sm text-gray-400">Creato: {new Date(ticket.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Media' : 'Bassa'}
          </span>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
            {ticket.status === 'open' ? 'Aperto' : ticket.status === 'in_progress' ? 'In Corso' : 'Chiuso'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-200">{ticket.message}</p>
      </div>

      {ticket.adminResponse && (
        <div className="mb-4 p-4 bg-zinc-800 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-400 mb-2">Risposta Admin:</h4>
          <p className="text-gray-200">{ticket.adminResponse}</p>
        </div>
      )}

      {ticket.status !== 'closed' && (
        <div className="border-t border-zinc-800 pt-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Risposta:
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-200 resize-none"
              rows={3}
              placeholder="Scrivi la tua risposta..."
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRespond}
              disabled={!response.trim() || isResponding}
              className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResponding ? 'Invio...' : 'Rispondi'}
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-red-400 text-black font-semibold rounded hover:bg-red-500"
            >
              Chiudi Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
