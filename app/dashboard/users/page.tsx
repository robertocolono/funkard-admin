"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ fetch reale pronto
    /*
    getUsers()
      .then(setUsers)
      .catch(err => {
        console.error("Errore nel caricamento utenti:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing
    setTimeout(() => {
      setUsers([
        {
          id: "1",
          email: "mario.rossi@email.com",
          name: "Mario Rossi",
          type: "private",
          totalCards: 25,
          totalSpent: 1250
        },
        {
          id: "2",
          email: "lucia.bianchi@email.com",
          name: "Lucia Bianchi",
          type: "business",
          totalCards: 150,
          totalSpent: 8750
        },
        {
          id: "3",
          email: "giovanni.verdi@email.com",
          name: "Giovanni Verdi",
          type: "private",
          totalCards: 8,
          totalSpent: 320
        }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Utenti</h2>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Caricamento utenti...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Tipo</th>
                <th className="p-4 font-medium">Carte</th>
                <th className="p-4 font-medium">Speso</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nessun utente trovato
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-gray-600">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        u.type === 'business' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {u.type === 'business' ? 'Business' : 'Privato'}
                      </span>
                    </td>
                    <td className="p-4">{u.totalCards}</td>
                    <td className="p-4">€{u.totalSpent.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
