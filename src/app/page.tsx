import ReportForm from "@/components/ReportForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ backgroundColor: "#FFE003" }}>
            <span className="text-3xl">🚫</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">No hay</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Reporta productos faltantes en tu local Ferrocenter
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <ReportForm />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Ferrocenter · Sistema de control de inventario
        </p>
      </div>
    </main>
  );
}
