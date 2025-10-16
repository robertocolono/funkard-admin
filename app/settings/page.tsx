"use client";
import { useEffect, useState } from "react";
import { getSystemSettings } from "@/lib/api";
import { SystemSettings } from "@/lib/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    getSystemSettings()
      .then(setSettings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-yellow-400">Caricamento...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Impossibile caricare le impostazioni</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">⚙️ Impostazioni Sistema</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stato Sistema */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Stato Sistema</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">API Status:</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                settings.apiStatus === 'online' 
                  ? 'bg-green-400 text-black' 
                  : 'bg-red-400 text-black'
              }`}>
                {settings.apiStatus === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Mail Service:</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                settings.mailEnabled 
                  ? 'bg-green-400 text-black' 
                  : 'bg-red-400 text-black'
              }`}>
                {settings.mailEnabled ? 'Attivo' : 'Disattivo'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Versione:</span>
              <span className="text-gray-200">{settings.version}</span>
            </div>
          </div>
        </div>

        {/* Configurazione Email */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Configurazione Email</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Admin:
              </label>
              <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-200">
                {settings.adminEmail}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Stato Mail:
              </label>
              <div className={`p-3 rounded-lg text-sm font-medium ${
                settings.mailEnabled 
                  ? 'bg-green-900 text-green-400' 
                  : 'bg-red-900 text-red-400'
              }`}>
                {settings.mailEnabled ? 'Servizio email attivo' : 'Servizio email disattivo'}
              </div>
            </div>
          </div>
        </div>

        {/* Backup e Manutenzione */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Backup e Manutenzione</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Ultimo Backup:</span>
              <span className="text-gray-200">
                {new Date(settings.lastBackup).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Ora Backup:</span>
              <span className="text-gray-200">
                {new Date(settings.lastBackup).toLocaleTimeString()}
              </span>
            </div>
            <button className="w-full py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500">
              Forza Backup Ora
            </button>
          </div>
        </div>

        {/* Informazioni API */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Informazioni API</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                URL API:
              </label>
              <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-200 text-sm">
                {process.env.NEXT_PUBLIC_API_URL}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Status Endpoint:
              </label>
              <div className={`p-3 rounded-lg text-sm font-medium ${
                settings.apiStatus === 'online' 
                  ? 'bg-green-900 text-green-400' 
                  : 'bg-red-900 text-red-400'
              }`}>
                {settings.apiStatus === 'online' ? 'API raggiungibile' : 'API non raggiungibile'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-yellow-400">Note</h3>
        <div className="text-sm text-gray-400 space-y-2">
          <p>• Le impostazioni sono in modalità read-only per sicurezza</p>
          <p>• Per modificare le configurazioni, contattare l'amministratore di sistema</p>
          <p>• Il backup viene eseguito automaticamente ogni 24 ore</p>
          <p>• In caso di problemi con l'API, verificare lo stato del server backend</p>
        </div>
      </div>
    </div>
  );
}
