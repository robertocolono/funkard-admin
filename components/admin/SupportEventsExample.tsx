'use client';

import { useSupportEvents } from '@/hooks/useSupportEvents';
import { useSession } from '@/lib/useSession';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Shield, Bell } from 'lucide-react';

export function SupportEventsExample() {
  const { user } = useSession();
  
  // Inizializza eventi SSE per notifiche real-time
  useSupportEvents(user?.role, user?.id);

  const getRoleInfo = (role?: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return {
          icon: <Shield className="w-4 h-4" />,
          color: 'bg-red-500',
          description: 'Vede tutti gli eventi e notifiche'
        };
      case 'ADMIN':
        return {
          icon: <Users className="w-4 h-4" />,
          color: 'bg-blue-500',
          description: 'Vede aggiornamenti e assegnazioni'
        };
      case 'SUPPORT':
        return {
          icon: <MessageSquare className="w-4 h-4" />,
          color: 'bg-green-500',
          description: 'Riceve solo eventi relativi ai ticket assegnati'
        };
      default:
        return {
          icon: <Bell className="w-4 h-4" />,
          color: 'bg-gray-500',
          description: 'Ruolo non riconosciuto'
        };
    }
  };

  const roleInfo = getRoleInfo(user?.role);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Support Events SSE
        </CardTitle>
        <CardDescription>
          Sistema di notifiche real-time per eventi support ticket
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Info utente corrente */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="font-semibold mb-2">Utente Corrente</h3>
            <div className="flex items-center gap-2 mb-2">
              {roleInfo.icon}
              <span className="font-medium">{user?.name || 'N/A'}</span>
              <Badge className={`${roleInfo.color} text-white`}>
                {user?.role || 'N/A'}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">{roleInfo.description}</p>
          </div>

          {/* Eventi supportati */}
          <div className="space-y-3">
            <h3 className="font-semibold">Eventi Supportati</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>ticket-update - Aggiornamento stato</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>new-message - Nuovo messaggio</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>ticket-assigned - Ticket assegnato</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>ticket-resolved - Ticket risolto</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>new-ticket - Nuovo ticket</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>ticket-unassigned - Ticket rilasciato</span>
              </div>
            </div>
          </div>

          {/* Come usare */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Come usare:</h4>
            <pre className="text-xs text-blue-800 bg-blue-100 p-2 rounded">
{`import { useSupportEvents } from '@/hooks/useSupportEvents';
import { useSession } from '@/lib/useSession';

export default function MyPage() {
  const { user } = useSession();
  
  // Inizializza eventi SSE
  useSupportEvents(user?.role, user?.id);
  
  return <div>La tua UI qui</div>;
}`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
