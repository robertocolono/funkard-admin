"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecentNotifications } from "@/lib/api";

interface RecentNotification {
  id: number;
  type: string;
  priority: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function RecentNotifications() {
  const [notifications, setNotifications] = useState<RecentNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecentNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Errore fetch notifiche recenti:", err);
        setError("Errore nel caricamento");
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
    // Aggiorna ogni 30 secondi
    const interval = setInterval(fetchRecent, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "normal": return "bg-blue-500";
      case "low": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ERROR": return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case "SYSTEM": return <Clock className="h-3 w-3 text-blue-500" />;
      case "SUPPORT": return <MessageSquare className="h-3 w-3 text-green-500" />;
      default: return <Bell className="h-3 w-3 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('it-IT', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifiche Recenti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 bg-muted/30 rounded-lg animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifiche Recenti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Riprova
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifiche Recenti
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {notifications.length}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Nessuna notifica recente
              </p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  {getTypeIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {notification.title}
                      </h4>
                      <Badge 
                        className={`text-white text-xs ${getPriorityColor(notification.priority)}`}
                      >
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          
          {notifications.length > 0 && (
            <div className="pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = "/dashboard/notifications"}
                className="w-full text-xs"
              >
                Vedi tutte le notifiche
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
