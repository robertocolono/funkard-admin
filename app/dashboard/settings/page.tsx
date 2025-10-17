"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ fetch reale pronto
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings`)
    //   .then(res => res.json())
    //   .then(setSettings)
    //   .finally(() => setLoading(false));

    // Mock temporaneo per testing
    setTimeout(() => {
      setSettings({
        mailEnabled: true,
        adminEmail: "admin@funkard.com",
        apiStatus: "online",
        lastBackup: "2024-01-15T08:00:00Z",
        version: "1.2.3"
      });
      setLoading(false);
    }, 400);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Impostazioni Sistema</h2>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Caricamento impostazioni...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Sistema Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Stato Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${settings?.apiStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-700">API Status: {settings?.apiStatus}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${settings?.mailEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-700">Email: {settings?.mailEnabled ? 'Abilitata' : 'Disabilitata'}</span>
              </div>
            </div>
          </div>

          {/* Configurazione */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Configurazione</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Admin Email</span>
                <span className="text-gray-900 font-medium">{settings?.adminEmail}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Versione</span>
                <span className="text-gray-900 font-medium">v{settings?.version}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Ultimo Backup</span>
                <span className="text-gray-900 font-medium">
                  {settings?.lastBackup ? new Date(settings.lastBackup).toLocaleString('it-IT') : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Azioni Sistema */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Azioni Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Backup Manuale
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                Pulizia Cache
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Pulizia Notifiche
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                Log Sistema
              </button>
            </div>
          </div>

          {/* Informazioni Ambiente */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Informazioni Ambiente</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'Non configurato'}</p>
              <p><strong>Admin Token:</strong> {process.env.NEXT_PUBLIC_ADMIN_TOKEN ? 'Configurato' : 'Non configurato'}</p>
              <p><strong>Ambiente:</strong> {process.env.NODE_ENV || 'development'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
