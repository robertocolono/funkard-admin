'use client';

import { useSSENotifications } from '@/providers/SSENotificationProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function SSEStatus() {
  const { isConnected, reconnect, lastNotification } = useSSENotifications();

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <Badge variant="outline" className="text-green-400 border-green-400">
          <Wifi className="h-3 w-3 mr-1" />
          Live
        </Badge>
      ) : (
        <Badge variant="outline" className="text-red-400 border-red-400">
          <WifiOff className="h-3 w-3 mr-1" />
          Disconnesso
        </Badge>
      )}
      
      <Button
        size="sm"
        variant="ghost"
        onClick={reconnect}
        className="h-6 w-6 p-0"
      >
        <RefreshCw className="h-3 w-3" />
      </Button>
      
      {lastNotification && (
        <div className="text-xs text-neutral-400">
          Ultima: {new Date(lastNotification.createdAt || Date.now()).toLocaleTimeString('it-IT')}
        </div>
      )}
    </div>
  );
}
