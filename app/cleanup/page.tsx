"use client";

import CleanupTest from "@/components/CleanupTest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Clock, Trash2, Shield } from "lucide-react";

export default function CleanupPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">🧹 Sistema Cleanup</h1>
        <p className="text-gray-600">
          Gestisci la pulizia automatica delle notifiche archiviate
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Frequenza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Giornaliera</p>
            <p className="text-xs text-gray-500">Ogni giorno alle 02:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-500" />
              Eliminazione
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">30+ giorni</p>
            <p className="text-xs text-gray-500">Notifiche archiviate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              Sicurezza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Token</p>
            <p className="text-xs text-gray-500">Autenticazione sicura</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-500" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">Attivo</p>
            <p className="text-xs text-gray-500">Sistema funzionante</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Component */}
      <CleanupTest />

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Documentazione Cleanup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">🔧 Configurazione</h3>
            <div className="bg-gray-50 p-3 rounded text-sm font-mono">
              <p>CRON_SECRET_TOKEN=your_secret_token</p>
              <p>NEXT_PUBLIC_API_URL=https://funkard-api.onrender.com</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">📡 Endpoint API</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">DELETE</span>
                <code>/api/cleanup/notifications</code>
                <span className="text-gray-500">- Cleanup automatico</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/api/cleanup/test</code>
                <span className="text-gray-500">- Test manuale</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">⏰ Cron Job (Vercel)</h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p><strong>URL:</strong> https://your-app.vercel.app/api/cleanup/notifications</p>
              <p><strong>Metodo:</strong> DELETE</p>
              <p><strong>Headers:</strong> Authorization: Bearer {`{CRON_SECRET_TOKEN}`}</p>
              <p><strong>Frequenza:</strong> 0 2 * * * (ogni giorno alle 02:00)</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🛡️ Sicurezza</h3>
            <ul className="text-sm space-y-1">
              <li>• Token di autenticazione obbligatorio</li>
              <li>• Solo metodi DELETE/POST consentiti</li>
              <li>• Logging completo delle operazioni</li>
              <li>• Gestione errori robusta</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
