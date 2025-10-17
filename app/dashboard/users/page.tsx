"use client";

import { useState, useEffect } from "react";
import { getUsers, updateUserStatus } from "@/services/adminService";
import { AdminUser } from "@/types/User";
import { Users, Ban, Eye, UserMinus, Search, Activity, User as UserIcon, Mail, Phone, MapPin } from "lucide-react";
import { mockActivities } from "@/lib/mockActivities";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "suspended" | "banned">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "activity">("profile");

  // Carica utenti dal backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("❌ Errore caricamento utenti:", err);
        // Fallback a mock data se API non disponibile
        setUsers([
          {
            id: "u1",
            name: "Luca Rossi",
            email: "luca@example.com",
            joinedAt: "2025-09-10T10:15:00Z",
            lastLogin: "2025-10-16T22:30:00Z",
            status: "active",
            cards: 12,
            orders: 4,
            reports: 0,
          },
        ]);
      }
    };

    loadUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      (filter === "all" || u.status === filter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const changeStatus = (id: string, status: AdminUser["status"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 border-green-600 bg-green-50";
      case "suspended":
        return "text-yellow-600 border-yellow-600 bg-yellow-50";
      case "banned":
        return "text-red-600 border-red-600 bg-red-50";
      default:
        return "text-gray-600 border-gray-600 bg-gray-50";
    }
  };

  const getActivityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-gray-200 bg-gray-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6" /> Gestione Utenti
        </h1>

        <div className="flex flex-wrap gap-2">
          {["all", "active", "suspended", "banned"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 text-sm rounded-md transition ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilter(f as any)}
            >
              {f === "all" ? "Tutti" : f === "active" ? "Attivi" : f === "suspended" ? "Sospesi" : "Bannati"}
            </button>
          ))}
        </div>
      </div>

      {/* Ricerca */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cerca per nome o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Statistiche rapide */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Attivi</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === "active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <UserMinus className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sospesi</p>
              <p className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.status === "suspended").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Ban className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Bannati</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter(u => u.status === "banned").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Totale</p>
              <p className="text-2xl font-bold text-blue-600">
                {users.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista utenti */}
      <div className="grid gap-4">
        {filtered.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => setSelected(u)}
          >
            <div className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {u.avatar ? (
                  <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{u.name}</h3>
                <p className="text-sm text-gray-600">{u.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(u.status)}`}>
                    {u.status.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    Carte: {u.cards}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    Ordini: {u.orders}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    Segnalazioni: {u.reports}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>Ultimo accesso:</p>
                <p>{new Date(u.lastLogin).toLocaleString("it-IT")}</p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nessun utente trovato con i filtri selezionati.
            </p>
          </div>
        )}
      </div>

      {/* Modale dettagli utente */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {selected.avatar ? (
                      <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selected.name}</h2>
                    <p className="text-gray-600">{selected.email}</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selected.status)}`}>
                      {selected.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                    activeTab === "profile"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Profilo
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                    activeTab === "activity"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Attività
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Informazioni Contatto</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{selected.email}</span>
                        </div>
                        {selected.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{selected.phone}</span>
                          </div>
                        )}
                        {selected.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{selected.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Statistiche Account</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <strong>Registrato il:</strong> {new Date(selected.joinedAt).toLocaleDateString("it-IT")}
                        </p>
                        <p className="text-sm">
                          <strong>Ultimo accesso:</strong> {new Date(selected.lastLogin).toLocaleString("it-IT")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            Carte: {selected.cards}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            Ordini: {selected.orders}
                          </span>
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                            Segnalazioni: {selected.reports}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockActivities
                    .filter((a) => a.userId === selected.id)
                    .map((a) => (
                      <div
                        key={a.id}
                        className={`p-3 rounded-lg border flex items-start justify-between ${getActivityColor(a.severity)}`}
                      >
                        <div>
                          <div className="flex items-center gap-2 font-medium text-sm">
                            <Activity className="w-4 h-4 text-gray-600" />
                            {a.type.replace("_", " ").toUpperCase()}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{a.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(a.createdAt).toLocaleString("it-IT")}
                          </p>
                        </div>
                      </div>
                    ))}

                  {mockActivities.filter((a) => a.userId === selected.id).length === 0 && (
                    <p className="text-gray-500 text-sm text-center mt-10">
                      Nessuna attività recente.
                    </p>
                  )}
                </div>
              )}

              {/* Footer con azioni */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <div className="flex gap-2">
                  {selected.status !== "suspended" && (
                    <button
                      onClick={() => changeStatus(selected.id, "suspended")}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition flex items-center gap-1"
                    >
                      <UserMinus className="w-4 h-4" />
                      Sospendi
                    </button>
                  )}
                  {selected.status !== "banned" && (
                    <button
                      onClick={() => changeStatus(selected.id, "banned")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-1"
                    >
                      <Ban className="w-4 h-4" />
                      Banna
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}