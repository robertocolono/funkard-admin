'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAdminSupportEvents } from '@/hooks/useAdminSupportEvents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, MessageSquare, Wifi, WifiOff } from 'lucide-react';
import { useState } from 'react';

export function AdminSSETest() {
  const { admin, isLoading } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  
  // Inizializza SSE per test
  useAdminSupportEvents(admin);

  const getRoleInfo = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return {
          icon: <Shield className="w-4 h-4" />,
          color: 'bg-red-500',
          description: 'Vede tutti gli eventi e notifiche di sistema'
        };
      case 'admin':
        return {
          icon: <Users className="w-4 h-4" />,
          color: 'bg-blue-500',
          description: 'Vede aggiornamenti e assegnazioni ticket'
        };
      case 'support':
        return {
          icon: <MessageSquare className="w-4 h-4" />,
          color: 'bg-green-500',
          description: 'Riceve solo eventi relativi ai ticket assegnati'
        };
      default:
        return {
          icon: <WifiOff className="w-4 h-4" />,
          color: 'bg-gray-500',
          description: 'Nessun admin loggato'
        };
    }
  };

  const roleInfo = getRoleInfo(admin?.role);

  const simulateEvents = () => {
    // Simula eventi per test
    console.log('🧪 Simulazione eventi SSE...');
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3">Caricamento admin...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          Admin SSE Connection Test
        </CardTitle>
        <CardDescription>
          Test della connessione SSE per eventi admin support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Info admin corrente */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="font-semibold mb-2">Admin Corrente</h3>
            <div className="flex items-center gap-2 mb-2">
              {roleInfo.icon}
              <span className="font-medium">{admin?.name || admin?.email || 'N/A'}</span>
              <Badge className={`${roleInfo.color} text-white`}>
                {admin?.role || 'N/A'}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">{roleInfo.description}</p>
          </div>

          {/* Stato connessione */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="font-semibold mb-2">Stato Connessione</h3>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Connesso</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">Disconnesso</span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Endpoint: {process.env.NEXT_PUBLIC_API_URL}/api/admin/support/stream
            </p>
          </div>

          {/* Eventi supportati */}
          <div className="space-y-3">
            <h3 className="font-semibold">Eventi Supportati</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>new-ticket - Nuovo ticket</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>ticket-reply - Risposta utente</span>
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
                <span>ticket-status-changed - Stato cambiato</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>system-event - Evento sistema</span>
              </div>
            </div>
          </div>

          {/* Test buttons */}
          <div className="flex gap-2">
            <Button onClick={simulateEvents} variant="outline">
              Simula Eventi
            </Button>
            <Button 
              onClick={() => setIsConnected(!isConnected)} 
              variant={isConnected ? "destructive" : "default"}
            >
              {isConnected ? 'Disconnetti' : 'Connetti'}
            </Button>
          </div>

          {/* Info debug */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Debug Info:</h4>
            <pre className="text-xs text-blue-800 bg-blue-100 p-2 rounded">
{`Admin ID: ${admin?.id || 'N/A'}
Role: ${admin?.role || 'N/A'}
Email: ${admin?.email || 'N/A'}
Token: ${admin?.token ? 'Presente' : 'Assente'}`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
