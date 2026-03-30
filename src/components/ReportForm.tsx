"use client";

import { useEffect, useState } from "react";

export default function ReportForm() {
  const [locales, setLocales] = useState<string[]>([]);
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [local, setLocal] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  useEffect(() => {
    fetch("/api/locales")
      .then((r) => r.json())
      .then((data: string[]) => {
        setLocales(data);
        if (data.length > 0) setLocal(data[0]);
      })
      .catch(() => setLocales([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!producto.trim() || !local) return;
    setEstado("enviando");

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ producto: producto.trim(), cantidad, local }),
      });
      setEstado(res.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  }

  function handleNuevo() {
    setProducto("");
    setCantidad(1);
    setEstado("idle");
  }

  if (estado === "ok") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#2EBC22" }}>¡Reporte enviado!</h2>
        <p className="text-gray-600 mb-6">
          <strong>{producto}</strong> fue registrado para <strong>{local}</strong>.
        </p>
        <button
          onClick={handleNuevo}
          className="font-semibold px-6 py-3 rounded-xl transition text-gray-900"
          style={{ backgroundColor: "#FFE003" }}
        >
          Reportar otro producto
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Producto faltante <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          placeholder="Ej: Cemento gris 50kg, tubo PVC 1/2..."
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
          style={{ outlineColor: "#FFE003" }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Cantidad sugerida
        </label>
        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
          style={{ outlineColor: "#FFE003" }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Local <span className="text-red-500">*</span>
        </label>
        {locales.length === 0 ? (
          <p className="text-sm text-gray-400">Cargando locales...</p>
        ) : (
          <select
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
            style={{ outlineColor: "#FFE003" }}
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        )}
      </div>

      {estado === "error" && (
        <p className="text-red-600 text-sm">Error al enviar. Intenta nuevamente.</p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full font-bold py-3 rounded-xl transition text-lg text-gray-900 disabled:opacity-50"
        style={{ backgroundColor: estado === "enviando" ? "#FFE003aa" : "#FFE003" }}
      >
        {estado === "enviando" ? "Enviando..." : "Reportar producto"}
      </button>
    </form>
  );
}
