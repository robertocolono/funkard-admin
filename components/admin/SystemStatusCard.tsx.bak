"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface SystemStatus {
  result: string;
  deleted: number;
  timestamp: string;
}

interface SystemStatusCardProps {
  className?: string;
  showActions?: boolean;
}

export default function SystemStatusCard({ className = "", showActions = true }: SystemStatusCardProps) {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://funkard-api.onrender.com/api/admin/system/cleanup/status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.error("Errore fetch status cleanup:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (result: string) => {
    switch (result) {
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (result: string) => {
    switch (result) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className={`bg-neutral-900 border-neutral-800 text-white ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Trash2 className="w-5 h-5 text-blue-400" />
          🧹 Stato Cleanup Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-neutral-300">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Caricamento...</span>
          </div>
        ) : status ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-300">📆 Ultimo aggiornamento:</span>
              <span className="text-white text-sm">
                {new Date(status.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-300">🗑️ Log eliminati:</span>
              <span className="text-white font-semibold">{status.deleted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-300">✅ Stato:</span>
              <Badge className={getStatusColor(status.result)}>
                {getStatusIcon(status.result)}
                <span className="ml-1">{status.result}</span>
              </Badge>
            </div>
            {showActions && (
              <div className="pt-3 border-t border-neutral-700">
                <Button 
                  onClick={fetchStatus}
                  variant="outline"
                  size="sm"
                  className="w-full bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Aggiorna Status
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-neutral-500">Nessun dato di manutenzione disponibile</p>
            {showActions && (
              <Button 
                onClick={fetchStatus}
                variant="outline"
                size="sm"
                className="w-full bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Carica Dati
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
