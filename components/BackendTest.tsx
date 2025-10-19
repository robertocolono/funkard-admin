"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  pingSystem,
  fetchNotifications,
  fetchSupportTickets,
  fetchAdminLogs
} from "@/lib/api";
import { CheckCircle, XCircle, Loader2, Database, Bell, Users, MessageSquare, ShoppingBag, Settings } from "lucide-react";

interface TestResult {
  name: string;
  status: "pending" | "success" | "error";
  message: string;
  data?: any;
}

export default function BackendTest() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const tests = [
    { name: "Ping Sistema", icon: Database, fn: pingSystem },
    { name: "Notifiche", icon: Bell, fn: fetchNotifications },
    { name: "Ticket Supporto", icon: MessageSquare, fn: fetchSupportTickets },
    { name: "Logs Admin", icon: Settings, fn: fetchAdminLogs },
  ];

  const runTests = async () => {
    setLoading(true);
    setResults([]);

    for (const test of tests) {
      setResults(prev => [...prev, {
        name: test.name,
        status: "pending",
        message: "Testando...",
      }]);

      try {
        const data = await test.fn();
        setResults(prev => prev.map(r => 
          r.name === test.name 
            ? { 
                ...r, 
                status: "success", 
                message: `✅ ${test.name} - ${Array.isArray(data) ? data.length : 'OK'} elementi`,
                data 
              }
            : r
        ));
      } catch (error: any) {
        setResults(prev => prev.map(r => 
          r.name === test.name 
            ? { 
                ...r, 
                status: "error", 
                message: `❌ ${test.name} - ${error.message}` 
              }
            : r
        ));
      }
    }

    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Successo</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Errore</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">In corso</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Database className="w-6 h-6" /> Test Connessione Backend
        </h1>
        <Button 
          onClick={runTests} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Database className="w-4 h-4" />
          )}
          {loading ? "Testando..." : "Avvia Test"}
        </Button>
      </div>

      <div className="grid gap-4">
        {tests.map((test, index) => {
          const result = results.find(r => r.name === test.name);
          const Icon = test.icon;
          
          return (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    {test.name}
                  </div>
                  {result && getStatusBadge(result.status)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {result ? getStatusIcon(result.status) : <div className="w-4 h-4" />}
                  <span className="text-sm text-gray-600">
                    {result ? result.message : "In attesa di test..."}
                  </span>
                </div>
                
                {result?.data && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {results.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Riepilogo Test</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {results.filter(r => r.status === "success").length}
                </div>
                <div className="text-gray-600">Successi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {results.filter(r => r.status === "error").length}
                </div>
                <div className="text-gray-600">Errori</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {results.length}
                </div>
                <div className="text-gray-600">Totale</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
