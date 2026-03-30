"use client";

import { useEffect, useState } from "react";
import { AnalysisResult } from "@/lib/analysis";

export default function DashboardView() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/analysis");
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4 animate-spin inline-block">⚙️</div>
        <p className="text-gray-500">Analizando registros con IA...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">Error al cargar el análisis.</p>
        <button onClick={load} className="text-sm underline text-gray-600">Reintentar</button>
      </div>
    );
  }

  const maxCantidad = data.topGlobal[0]?.cantidad || 1;

  return (
    <div className="space-y-8">
      {/* Resumen IA */}
      <div className="rounded-2xl border p-5">
        <h2 className="font-bold mb-2" style={{ color: "#2EBC22" }}>📊 Resumen ejecutivo</h2>
        <p className="text-gray-700 text-sm">{data.resumen}</p>
      </div>

      {/* Top global */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🌎 Top 10 productos globales</h2>
        {data.topGlobal.length === 0 ? (
          <p className="text-gray-400 text-sm">Sin datos aún.</p>
        ) : (
          <div className="space-y-3">
            {data.topGlobal.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-6">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1 gap-2">
                    <span className="text-sm font-medium text-gray-800">{item.producto}</span>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {item.cantidad} necesarios · {item.reportes} {item.reportes === 1 ? "reporte" : "reportes"}
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: "#FFE003", width: `${Math.min(100, (item.cantidad / maxCantidad) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Por local */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🏪 Producto más pedido por local</h2>
        {data.porLocal.length === 0 ? (
          <p className="text-gray-400 text-sm">Sin datos aún.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {data.porLocal.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{item.local}</p>
                <p className="font-semibold text-gray-800">{item.producto}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.cantidad} necesarios · {item.reportes} {item.reportes === 1 ? "reporte" : "reportes"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={load}
        className="text-sm text-gray-400 underline hover:text-gray-600 transition"
      >
        Actualizar análisis
      </button>
    </div>
  );
}
