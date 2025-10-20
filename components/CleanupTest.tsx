"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

export default function CleanupTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testCleanup = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/cleanup/test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET_TOKEN || 'test-token'}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Errore durante il test');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-500" />
          Test Cleanup Notifiche
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Testa il sistema di pulizia automatica delle notifiche archiviate.
          Questo eliminerà le notifiche più vecchie di 30 giorni.
        </p>

        <Button 
          onClick={testCleanup} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testando cleanup...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" />
              Testa Cleanup
            </>
          )}
        </Button>

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Cleanup Completato</span>
            </div>
            <div className="text-sm text-green-700">
              <p><strong>Messaggio:</strong> {result.message}</p>
              <p><strong>Timestamp:</strong> {result.timestamp}</p>
              {result.data && (
                <p><strong>Dati:</strong> {JSON.stringify(result.data, null, 2)}</p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">Errore</span>
            </div>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Endpoint:</strong> /api/cleanup/test</p>
          <p><strong>Metodo:</strong> POST</p>
          <p><strong>Autenticazione:</strong> Bearer Token</p>
          <p><strong>Funzione:</strong> Elimina notifiche {'>'} 30 giorni</p>
        </div>
      </CardContent>
    </Card>
  );
}
