"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, ToggleLeft, ToggleRight, User, Mail, Calendar, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

interface StaffDetail {
  id: string;
  email: string;
  role: "owner" | "admin" | "moderator" | "analyst";
  permissions: Record<string, boolean>;
  lastLogin: string;
  status: "active" | "suspended";
  createdAt: string;
  totalActions: number;
  recentActivity: Array<{
    action: string;
    timestamp: string;
    target: string;
  }>;
}

export default function StaffDetailPage() {
  const params = useParams();
  const [staff, setStaff] = useState<StaffDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Fetch reale pronto, da attivare dopo fix backend:
    /*
    apiGet<StaffDetail>(`/api/admin/staff/${params.id}`)
      .then(setStaff)
      .catch(err => {
        console.error("Errore nel caricamento dettaglio staff:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing UI
    setTimeout(() => {
      setStaff({
        id: params.id as string,
        email: "mod1@funkard.com",
        role: "moderator",
        permissions: {
          market: true,
          support: true,
          notifications: false,
          settings: false,
        },
        status: "active",
        createdAt: "2024-06-15T10:00:00Z",
        lastLogin: "2025-01-14T21:45:00Z",
        totalActions: 127,
        recentActivity: [
          {
            action: "Approvato prodotto",
            timestamp: "2025-01-14T20:30:00Z",
            target: "Charizard Holo"
          },
          {
            action: "Risposto ticket",
            timestamp: "2025-01-14T18:15:00Z",
            target: "Ticket #t_003"
          },
          {
            action: "Aggiornato prezzo",
            timestamp: "2025-01-14T16:45:00Z",
            target: "Blue-Eyes White Dragon"
          }
        ]
      });
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleTogglePermission = (permission: string) => {
    if (staff) {
      setStaff({
        ...staff,
        permissions: {
          ...staff.permissions,
          [permission]: !staff.permissions[permission]
        }
      });
    }
  };

  const handleSuspend = () => {
    if (staff) {
      setStaff({
        ...staff,
        status: staff.status === "active" ? "suspended" : "active"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Caricamento dettagli staff...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">Errore: {error}</p>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <p className="text-yellow-600">Membro staff non trovato</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/dashboard/staff"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-semibold">{staff.email}</h2>
          <p className="text-gray-600">
            Ruolo: <span className="font-medium">{staff.role.toUpperCase()}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informazioni principali */}
        <div className="lg:col-span-1 space-y-6">
          {/* Dettagli membro */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informazioni Membro
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{staff.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Creato:</span>
                <span className="font-medium">
                  {new Date(staff.createdAt).toLocaleDateString("it-IT")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Ultimo accesso:</span>
                <span className="font-medium">
                  {new Date(staff.lastLogin).toLocaleString("it-IT")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Azioni totali:</span>
                <span className="font-medium">{staff.totalActions}</span>
              </div>
            </div>
          </div>

          {/* Azioni */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Azioni</h3>
            <div className="space-y-2">
              <button 
                onClick={handleSuspend}
                className={`w-full px-4 py-2 rounded-lg transition ${
                  staff.status === "active" 
                    ? "bg-red-600 text-white hover:bg-red-700" 
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {staff.status === "active" ? "Sospendi" : "Riattiva"} Membro
              </button>
            </div>
          </div>
        </div>

        {/* Permessi e attività */}
        <div className="lg:col-span-2 space-y-6">
          {/* Permessi */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Gestione Permessi
            </h3>
            <div className="space-y-3">
              {Object.entries(staff.permissions).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center border rounded-lg px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div>
                    <span className="font-medium capitalize">{key}</span>
                    <p className="text-sm text-gray-600">
                      {key === "market" && "Gestione marketplace e prodotti"}
                      {key === "support" && "Gestione ticket e supporto utenti"}
                      {key === "notifications" && "Gestione notifiche sistema"}
                      {key === "settings" && "Accesso impostazioni e manutenzione"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission(key)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    {value ? (
                      <ToggleRight className="text-green-600 w-6 h-6" />
                    ) : (
                      <ToggleLeft className="text-gray-400 w-6 h-6" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Attività recenti */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Attività Recenti</h3>
            <div className="space-y-3">
              {staff.recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">su {activity.target}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString("it-IT")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
