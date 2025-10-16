"use client";
import { useEffect, useState } from "react";
import UserRow from "@/components/UserRow";
import { getUsers } from "@/lib/api";
import { User } from "@/lib/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'private' | 'business'>('all');

  const loadUsers = () => {
    getUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { 
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    filter === 'all' || user.type === filter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-yellow-400">Caricamento...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">👥 Gestione Utenti</h1>
        <div className="flex space-x-2">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500">
            Esporta Dati
          </button>
        </div>
      </div>

      {/* Filtri */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded font-semibold ${
            filter === 'all' 
              ? 'bg-yellow-400 text-black' 
              : 'bg-zinc-800 text-gray-200 hover:bg-zinc-700'
          }`}
        >
          Tutti ({users.length})
        </button>
        <button
          onClick={() => setFilter('private')}
          className={`px-4 py-2 rounded font-semibold ${
            filter === 'private' 
              ? 'bg-yellow-400 text-black' 
              : 'bg-zinc-800 text-gray-200 hover:bg-zinc-700'
          }`}
        >
          Privati ({users.filter(u => u.type === 'private').length})
        </button>
        <button
          onClick={() => setFilter('business')}
          className={`px-4 py-2 rounded font-semibold ${
            filter === 'business' 
              ? 'bg-yellow-400 text-black' 
              : 'bg-zinc-800 text-gray-200 hover:bg-zinc-700'
          }`}
        >
          Business ({users.filter(u => u.type === 'business').length})
        </button>
      </div>

      {/* Tabella Utenti */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Utente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Carte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Speso Totale
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ultimo Accesso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Registrato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredUsers.map((user) => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onUpdate={loadUsers}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Nessun utente trovato per i filtri selezionati
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Mostrando {filteredUsers.length} utenti
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-zinc-800 text-gray-200 rounded hover:bg-zinc-700">
            Precedente
          </button>
          <button className="px-3 py-1 bg-zinc-800 text-gray-200 rounded hover:bg-zinc-700">
            Successiva
          </button>
        </div>
      </div>
    </div>
  );
}
