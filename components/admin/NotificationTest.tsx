'use client';

import { useNotifications } from '@/context/NotificationContext';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellRing, CheckCircle, X } from 'lucide-react';

export function NotificationTest() {
  const { unreadCount, notifications, resetUnread, markAsRead } = useNotifications();
  const { admin } = useAuth();

  const simulateNotification = (type: string) => {
    // Simula aggiunta notifica
    const mockNotification = {
      type: type as any,
      ticketId: `ticket_${Date.now()}`,
      title: `Test ${type}`,
      description: `Simulazione notifica di tipo ${type}`,
    };
    
    // Aggiungi notifica simulata
    console.log('🧪 Simulazione notifica:', mockNotification);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new-ticket':
        return '🆕';
      case 'ticket-reply':
        return '💬';
      case 'ticket-assigned':
        return '🎯';
      case 'ticket-resolved':
        return '✅';
      case 'ticket-status-changed':
        return '📬';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new-ticket':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ticket-reply':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ticket-assigned':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ticket-resolved':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'ticket-status-changed':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification System Test
        </CardTitle>
        <CardDescription>
          Test del sistema di notifiche real-time per admin panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Info admin corrente */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="font-semibold mb-2">Admin Corrente</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Ruolo:</span>
              <Badge className="bg-blue-500 text-white">
                {admin?.role || 'N/A'}
              </Badge>
              <span className="text-sm text-gray-400">Email:</span>
              <span className="text-sm">{admin?.email || 'N/A'}</span>
            </div>
          </div>

          {/* Contatore notifiche */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Notifiche Non Lette</span>
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button onClick={resetUnread} variant="outline" size="sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Marca Tutte Lette
                </Button>
              </div>
            </div>
          </div>

          {/* Simulazione notifiche */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="font-semibold mb-3">Simula Notifiche</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button 
                onClick={() => simulateNotification('new-ticket')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                🆕 Nuovo Ticket
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-reply')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                💬 Risposta Utente
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-assigned')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                🎯 Ticket Assegnato
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-resolved')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                ✅ Ticket Risolto
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-status-changed')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                📬 Stato Cambiato
              </Button>
            </div>
          </div>

          {/* Lista notifiche */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="font-semibold mb-3">Notifiche Recenti</h3>
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p>Nessuna notifica</p>
                <p className="text-sm">Le notifiche appariranno qui quando arriveranno eventi SSE</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border flex items-center justify-between ${
                      notification.read ? 'bg-zinc-800' : 'bg-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div>
                        <div className="font-medium text-sm">
                          {notification.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {notification.description}
                        </div>
                        <div className="text-xs text-gray-500">
                          {notification.timestamp.toLocaleString('it-IT')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getNotificationColor(notification.type)}>
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <Button
                          onClick={() => markAsRead(notification.ticketId)}
                          variant="ghost"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info sistema */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Come funziona:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Le notifiche arrivano automaticamente via SSE dal backend</li>
              <li>• Il badge rosso mostra il numero di notifiche non lette</li>
              <li>• Cliccando su "Notifiche" nella navbar si azzerano i contatori</li>
              <li>• Le notifiche sono filtrate in base al ruolo admin</li>
              <li>• Il sistema è persistente e funziona in tempo reale</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
