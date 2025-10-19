"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Trash2, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Server,
  Activity,
  HardDrive,
  Cpu
} from "lucide-react";

interface SystemStatus {
  result: string;
  deleted: number;
  timestamp: string;
}

interface SystemHealth {
  database: "online" | "offline";
  api: "online" | "offline";
  cleanup: "success" | "error" | "pending";
  lastBackup: string;
  diskUsage: number;
  memoryUsage: number;
}

export default function SystemStatus() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemStatus();
    fetchSystemHealth();
  }, []);

  const fetchSystemStatus = async () => {
    try {
      const res = await fetch("https://funkard-api.onrender.com/api/admin/system/cleanup/status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.error("Errore fetch status cleanup:", err);
    }
  };

  const fetchSystemHealth = async () => {
    try {
      // Mock data per ora - da sostituire con endpoint reale
      setHealth({
        database: "online",
        api: "online", 
        cleanup: status?.result === "success" ? "success" : "error",
        lastBackup: "2025-01-15T10:30:00Z",
        diskUsage: 75,
        memoryUsage: 60
      });
    } catch (err) {
      console.error("Errore fetch system health:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
      case "online":
        return "bg-green-100 text-green-800";
      case "error":
      case "offline":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "error":
      case "offline":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-gray-500" />
          <span className="text-gray-500">Caricamento stato sistema...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Server className="w-6 h-6 text-blue-600" />
            Stato Sistema
          </h1>
          <p className="text-gray-600 mt-1">Monitoraggio e manutenzione del sistema</p>
        </div>
        <Button 
          onClick={() => {
            setLoading(true);
            fetchSystemStatus();
            fetchSystemHealth();
          }}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Aggiorna
        </Button>
      </div>

      {/* Grid principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Stato Cleanup Log */}
        <Card className="bg-neutral-900 border-neutral-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Trash2 className="w-5 h-5 text-blue-400" />
              🧹 Stato Cleanup Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status ? (
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
              </div>
            ) : (
              <p className="text-neutral-500">Nessun dato di manutenzione disponibile</p>
            )}
          </CardContent>
        </Card>

        {/* Salute Database */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            {health ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stato:</span>
                  <Badge className={getStatusColor(health.database)}>
                    {getStatusIcon(health.database)}
                    <span className="ml-1">{health.database}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ultimo backup:</span>
                  <span className="text-sm">
                    {new Date(health.lastBackup).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Dati non disponibili</p>
            )}
          </CardContent>
        </Card>

        {/* Salute API */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              API Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {health ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stato:</span>
                  <Badge className={getStatusColor(health.api)}>
                    {getStatusIcon(health.api)}
                    <span className="ml-1">{health.api}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cleanup:</span>
                  <Badge className={getStatusColor(health.cleanup)}>
                    {getStatusIcon(health.cleanup)}
                    <span className="ml-1">{health.cleanup}</span>
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Dati non disponibili</p>
            )}
          </CardContent>
        </Card>

        {/* Utilizzo Risorse */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-600" />
              Risorse Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            {health ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Utilizzo Disco</span>
                    <span className="text-gray-800">{health.diskUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        health.diskUsage > 80 ? 'bg-red-500' : 
                        health.diskUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${health.diskUsage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Utilizzo Memoria</span>
                    <span className="text-gray-800">{health.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        health.memoryUsage > 80 ? 'bg-red-500' : 
                        health.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${health.memoryUsage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Dati non disponibili</p>
            )}
          </CardContent>
        </Card>

        {/* Azioni Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-orange-600" />
              Azioni Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => fetchSystemStatus()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Aggiorna Status
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  // TODO: Implementare trigger backup
                  console.log("Trigger backup");
                }}
              >
                <Database className="w-4 h-4 mr-2" />
                Trigger Backup
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  // TODO: Implementare cleanup manuale
                  console.log("Cleanup manuale");
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Cleanup Manuale
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informazioni Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-gray-600" />
              Info Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Versione:</span>
                <span className="text-gray-800">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ambiente:</span>
                <span className="text-gray-800">Production</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime:</span>
                <span className="text-gray-800">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ultimo deploy:</span>
                <span className="text-gray-800">15/01/2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
