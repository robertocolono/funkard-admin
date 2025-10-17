"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Wifi, WifiOff } from "lucide-react";
import { pingAPI } from "@/lib/api";

export default function ApiStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    setStatus("checking");
    setError(null);
    
    try {
      const response = await pingAPI();
      setStatus("connected");
      setLastCheck(new Date());
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Errore di connessione");
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check ogni 30 secondi
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "checking":
        return <Badge variant="secondary">Verificando...</Badge>;
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connesso</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Errore</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {status === "connected" ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          Stato API Backend
        </CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm">
            {status === "checking" && "Verificando connessione..."}
            {status === "connected" && "Connesso al backend Funkard"}
            {status === "error" && "Errore di connessione"}
          </span>
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
            <strong>Errore:</strong> {error}
          </div>
        )}

        {lastCheck && (
          <div className="text-xs text-gray-500">
            Ultimo controllo: {lastCheck.toLocaleTimeString("it-IT")}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Endpoint:</strong> {process.env.NEXT_PUBLIC_API_URL}/api/admin/ping</p>
          <p><strong>Autenticazione:</strong> Bearer Token</p>
          <p><strong>Frequenza:</strong> Ogni 30 secondi</p>
        </div>

        <button
          onClick={checkConnection}
          disabled={status === "checking"}
          className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors disabled:opacity-50"
        >
          {status === "checking" ? "Verificando..." : "Riprova"}
        </button>
      </CardContent>
    </Card>
  );
}
