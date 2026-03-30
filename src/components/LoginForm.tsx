"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Clave de acceso"
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      {error && <p className="text-red-600 text-sm">Clave incorrecta.</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-bold py-3 rounded-xl transition text-gray-900 disabled:opacity-50"
          style={{ backgroundColor: "#FFE003" }}
      >
        {loading ? "Verificando..." : "Ingresar"}
      </button>
    </form>
  );
}
