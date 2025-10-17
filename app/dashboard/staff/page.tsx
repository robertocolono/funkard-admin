"use client";

import { useState, useEffect } from "react";
import { Shield, UserPlus, Loader2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

interface StaffUser {
  id: string;
  email: string;
  role: "owner" | "admin" | "moderator" | "analyst";
  permissions: Record<string, boolean>;
  lastLogin: string;
  status: "active" | "suspended";
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Fetch reale pronto, da attivare dopo fix backend:
    /*
    apiGet<StaffUser[]>("/api/admin/staff")
      .then(setStaff)
      .catch(err => {
        console.error("Errore nel caricamento staff:", err);
      })
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing UI
    setTimeout(() => {
      setStaff([
        {
          id: "1",
          email: "contact.funkard@gmail.com",
          role: "owner",
          permissions: { market: true, support: true, notifications: true, settings: true },
          lastLogin: "2025-01-15T08:00:00Z",
          status: "active",
        },
        {
          id: "2",
          email: "mod1@funkard.com",
          role: "moderator",
          permissions: { market: true, support: true, notifications: false, settings: false },
          lastLogin: "2025-01-14T21:45:00Z",
          status: "active",
        },
        {
          id: "3",
          email: "analyst@funkard.com",
          role: "analyst",
          permissions: { market: false, support: false, notifications: true, settings: false },
          lastLogin: "2025-01-13T15:30:00Z",
          status: "active",
        },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Gestione Staff</h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition">
          <UserPlus className="w-4 h-4" /> Aggiungi membro
        </button>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Ruolo</th>
              <th className="py-3 px-4 text-left">Ultimo accesso</th>
              <th className="py-3 px-4 text-left">Stato</th>
              <th className="py-3 px-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="py-3 px-4 font-medium">{s.email}</td>
                <td className="py-3 px-4">
                  <RoleBadge role={s.role} />
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(s.lastLogin).toLocaleString("it-IT")}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={s.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/dashboard/staff/${s.id}`}
                    className="text-gray-500 hover:text-black transition"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    owner: "bg-black text-white",
    admin: "bg-blue-100 text-blue-700",
    moderator: "bg-yellow-100 text-yellow-700",
    analyst: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`px-2 py-1 text-xs rounded-md font-medium ${colors[role] || "bg-gray-200"}`}
    >
      {role.toUpperCase()}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  return (
    <span className={`px-2 py-1 text-xs rounded-md font-medium ${color}`}>
      {status === "active" ? "Attivo" : "Sospeso"}
    </span>
  );
}
