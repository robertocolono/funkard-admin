'use client';

import { useNotifications } from '@/context/NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellRing, CheckCircle, X, Plus } from 'lucide-react';

export function NotificationDrawerTest() {
  const { unreadCount, notifications, addNotification, markAllAsRead, resetUnread } = useNotifications();

  const simulateNotification = (type: string) => {
    const mockNotification = {
      type: type as any,
      ticketId: `ticket_${Date.now()}`,
      title: `Test ${type}`,
      description: `Simulazione notifica di tipo ${type} - Questo è un messaggio di test per verificare il funzionamento del drawer`,
    };
    
    // Simula aggiunta notifica
    console.log('🧪 Simulazione notifica:', mockNotification);
    
    // Aggiungi notifica simulata
    addNotification(mockNotification);
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
          Notification Drawer Test
        </CardTitle>
        <CardDescription>
          Test del drawer di notifiche real-time per admin panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Info stato */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Stato Notifiche</span>
                <Badge className="bg-red-500 text-white">
                  {unreadCount} non lette
                </Badge>
                <Badge className="bg-blue-500 text-white">
                  {notifications.length} totali
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button onClick={markAllAsRead} variant="outline" size="sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Marca Tutte Lette
                </Button>
                <Button onClick={resetUnread} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-1" />
                  Reset
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
                <Plus className="w-4 h-4 mr-2" />
                🆕 Nuovo Ticket
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-reply')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                💬 Risposta Utente
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-assigned')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                🎯 Ticket Assegnato
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-resolved')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                ✅ Ticket Risolto
              </Button>
              <Button 
                onClick={() => simulateNotification('ticket-status-changed')}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
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
                <p className="text-sm">Clicca sui pulsanti sopra per simulare notifiche</p>
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
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info sistema */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Come funziona il Drawer:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Clicca sull'icona 🔔 nella navbar per aprire il drawer</li>
              <li>• Le notifiche arrivano automaticamente via SSE</li>
              <li>• Il badge rosso mostra il numero di notifiche non lette</li>
              <li>• Clicca su una notifica per marcarla come letta</li>
              <li>• Usa "Segna tutte lette" per azzerare i contatori</li>
              <li>• Il drawer è responsive e funziona su mobile</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
