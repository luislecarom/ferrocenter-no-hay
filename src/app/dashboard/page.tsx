import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardView from "@/components/DashboardView";
import LoginForm from "@/components/LoginForm";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("dashboard_auth");
  const isAuthed = auth?.value === process.env.DASHBOARD_PASSWORD;

  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-3xl">📊</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">Ingresa la clave para acceder</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <LoginForm />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard — No hay</h1>
            <p className="text-gray-500 text-sm mt-1">Análisis de productos faltantes</p>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 underline">
            Ir al formulario
          </a>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <DashboardView />
        </div>
      </div>
    </main>
  );
}
