"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pingAPI } from "@/lib/api";

interface SystemStatus {
  api: "online" | "offline" | "checking";
  database: "online" | "offline" | "checking";
  lastCheck: string;
  uptime: string;
}

export default function SystemStatusCard() {
  const [status, setStatus] = useState<SystemStatus>({
    api: "checking",
    database: "checking",
    lastCheck: "",
    uptime: "",
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkSystemStatus = async () => {
    setIsChecking(true);
    try {
      // Ping API
      const apiResult = await pingAPI();
      setStatus(prev => ({
        ...prev,
        api: "online",
        lastCheck: new Date().toLocaleString(),
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        api: "offline",
        lastCheck: new Date().toLocaleString(),
      }));
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkSystemStatus();
    // Check ogni 5 minuti
    const interval = setInterval(checkSystemStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "offline":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      default:
        return "Controllo...";
    }
  };

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
              <Server className="h-5 w-5" />
              Stato Sistema
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={checkSystemStatus}
              disabled={isChecking}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* API Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">API Backend</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.api)}
              <Badge 
                className={`text-white text-xs ${getStatusColor(status.api)}`}
              >
                {getStatusLabel(status.api)}
              </Badge>
            </div>
          </div>

          {/* Database Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Database</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.database)}
              <Badge 
                className={`text-white text-xs ${getStatusColor(status.database)}`}
              >
                {getStatusLabel(status.database)}
              </Badge>
            </div>
          </div>

          {/* Info aggiuntive */}
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Ultimo controllo: {status.lastCheck || "Mai"}</p>
              <p>Uptime: {status.uptime || "N/A"}</p>
            </div>
          </div>

          {/* Azioni rapide */}
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={checkSystemStatus}
              disabled={isChecking}
              className="w-full text-xs"
            >
              {isChecking ? "Controllo in corso..." : "Verifica stato"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
