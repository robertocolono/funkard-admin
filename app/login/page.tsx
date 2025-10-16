"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/check`, {
      headers: { "X-Admin-Secret": secret }
    });
    if (res.ok) {
      localStorage.setItem("funkard_admin_token", secret);
      router.push("/dashboard");
    } else {
      setError("Chiave admin non valida");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-6 rounded-xl shadow-md w-80 border border-zinc-800">
        <h1 className="text-lg font-bold mb-4 text-center text-yellow-400">Funkard Admin</h1>
        <input
          type="password"
          placeholder="Admin Secret"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          className="w-full p-2 mb-3 bg-zinc-800 rounded border border-zinc-700 text-sm text-gray-200"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
        >
          Accedi
        </button>
      </form>
    </div>
  );
}
