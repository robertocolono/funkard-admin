'use client';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function ToastTestPanel() {
  const { toast } = useToast();

  const testToasts = [
    {
      title: '🎫 Nuovo ticket ricevuto',
      description: '#123 - Problema pagamento da mario.rossi@email.com',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      title: '💬 Nuovo messaggio',
      description: 'Ticket #123 - Mario Rossi: Ho ancora problemi con il pagamento',
      icon: <User className="w-4 h-4" />,
    },
    {
      title: '🎧 Ticket assegnato a te',
      description: 'Hai preso in carico il ticket #123 - Problema pagamento',
      icon: <AlertCircle className="w-4 h-4" />,
    },
    {
      title: '✅ Ticket risolto',
      description: 'Ticket #123 - Problema pagamento è stato chiuso',
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      title: '📬 Ticket aggiornato',
      description: 'Ticket #123 ora è in_progress',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      title: '⚡ Priorità cambiata',
      description: 'Ticket #123 ora ha priorità HIGH',
      icon: <AlertCircle className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Test Toast Notifications
        </CardTitle>
        <CardDescription>
          Testa i diversi tipi di notifiche toast che vengono mostrate per gli eventi SSE
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {testToasts.map((toastData, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => {
                toast({
                  title: toastData.title,
                  description: toastData.description,
                  duration: 4000,
                });
              }}
              className="h-auto p-4 flex flex-col items-start gap-2 text-left"
            >
              <div className="flex items-center gap-2">
                {toastData.icon}
                <span className="font-semibold">{toastData.title}</span>
              </div>
              <span className="text-sm text-gray-600">{toastData.description}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Come funziona:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• I toast vengono mostrati automaticamente quando arrivano eventi SSE</li>
            <li>• Ogni tipo di evento ha un toast specifico con icona e colore</li>
            <li>• I toast sono filtrati in base al ruolo dell'utente</li>
            <li>• La durata varia in base all'importanza dell'evento</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
