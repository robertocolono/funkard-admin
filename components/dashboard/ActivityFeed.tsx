"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  User, 
  Settings, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: string;
  type: "user" | "system" | "admin" | "notification";
  action: string;
  user: string;
  timestamp: string;
  details?: string;
  status: "success" | "warning" | "error";
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data per ora - sarà sostituito con AdminAuditLog
    const mockActivities: ActivityItem[] = [
      {
        id: "1",
        type: "admin",
        action: "Risolto notifica sistema",
        user: "Admin",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        details: "Notifica #123 risolta con successo",
        status: "success"
      },
      {
        id: "2",
        type: "system",
        action: "Cleanup automatico completato",
        user: "Sistema",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        details: "Eliminati 15 record archiviati",
        status: "success"
      },
      {
        id: "3",
        type: "user",
        action: "Nuovo utente registrato",
        user: "Sistema",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        details: "Utente #1250 registrato",
        status: "success"
      },
      {
        id: "4",
        type: "notification",
        action: "Errore rilevato",
        user: "Sistema",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        details: "Timeout connessione database",
        status: "error"
      },
      {
        id: "5",
        type: "admin",
        action: "Configurazione aggiornata",
        user: "Admin",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        details: "Impostazioni sistema modificate",
        status: "success"
      }
    ];

    // Simula caricamento
    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4 text-blue-500" />;
      case "system":
        return <Settings className="h-4 w-4 text-green-500" />;
      case "admin":
        return <Shield className="h-4 w-4 text-purple-500" />;
      case "notification":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return "Ora";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m fa`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h fa`;
    return date.toLocaleDateString('it-IT');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Attività Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg animate-pulse">
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
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
              <Activity className="h-5 w-5" />
              Attività Recente
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {activities.length}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Nessuna attività recente
              </p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">
                      {activity.action}
                    </h4>
                    {getStatusIcon(activity.status)}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-1">
                    {activity.user} • {formatTime(activity.timestamp)}
                  </p>
                  
                  {activity.details && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {activity.details}
                    </p>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                </div>
              </motion.div>
            ))
          )}
          
          {activities.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground text-center">
                Attività aggiornata in tempo reale
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
