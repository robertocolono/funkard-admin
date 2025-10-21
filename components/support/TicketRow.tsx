'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/useSession';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Lock, Unlock, MessageSquare, ExternalLink } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  email: string;
  status: string;
  priority: string;
  category: string;
  locked?: boolean;
  assignedTo?: string;
  createdAt: string;
}

interface TicketRowProps {
  ticket: Ticket;
  onUpdate: () => void;
}

export function TicketRow({ ticket, onUpdate }: TicketRowProps) {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleAssign = async () => {
    if (!user?.token) return;
    
    setIsLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/support/assign/${ticket.id}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
      });
      onUpdate();
    } catch (error) {
      console.error('Errore assegnazione ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnassign = async () => {
    if (!user?.token) return;
    
    setIsLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/support/unassign/${ticket.id}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
      });
      onUpdate();
    } catch (error) {
      console.error('Errore rilascio ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-green-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const canManageTicket = user?.role === 'SUPER_ADMIN' || user?.role === 'SUPPORT';
  const isAssignedToMe = ticket.assignedTo === user?.email;
  const isLockedByOther = ticket.locked && !isAssignedToMe;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-800 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Link 
              href={`/dashboard/support/${ticket.id}`}
              className="text-white font-medium hover:text-yellow-400 transition-colors flex items-center gap-1"
            >
              {ticket.subject}
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Badge className={`${getStatusColor(ticket.status)} text-white text-xs`}>
              {ticket.status}
            </Badge>
            <Badge className={`${getPriorityColor(ticket.priority)} text-white text-xs`}>
              {ticket.priority}
            </Badge>
            {ticket.locked && (
              <Badge className="bg-orange-500 text-white text-xs flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Bloccato
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{ticket.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{ticket.category}</span>
            </div>
            <span>{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {canManageTicket && (
            <>
              {!ticket.locked ? (
                <Button 
                  onClick={handleAssign} 
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                >
                  {isLoading ? '...' : 'Prendi in carico'}
                </Button>
              ) : isAssignedToMe ? (
                <Button 
                  onClick={handleUnassign} 
                  disabled={isLoading}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  {isLoading ? '...' : 'Rilascia'}
                </Button>
              ) : (
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  <span>In carico a {ticket.assignedTo}</span>
                </div>
              )}
            </>
          )}
          
          <Link 
            href={`/dashboard/support/${ticket.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
}
