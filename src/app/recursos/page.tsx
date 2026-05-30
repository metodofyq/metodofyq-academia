"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const CCAA_OPTIONS = [
  "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
  "Castilla–La Mancha", "Castilla y León", "Cataluña", "Extremadura",
  "Galicia", "La Rioja", "Madrid", "Murcia", "Navarra", "País Vasco",
  "Valencia", "Ceuta y Melilla",
];

export default function RecursosPage() {
  const [email, setEmail] = useState("");
  const [ccaa, setCcaa] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Guardar en tabla leads
      const { error: err } = await supabase.from("leads").insert([
        {
          email,
          ccaa,
          situacion: "recursos-gratuitos",
          source: "recursos"
        },
      ]);

      if (err) {
        // Si el email ya existe, simplemente permitir acceso
        if (err.code === "23505") {
          router.push(`/recursos/acceso?email=${encodeURIComponent(email)}&ccaa=${encodeURIComponent(ccaa)}`);
        } else {
          setError("Hubo un error. Intenta de nuevo.");
        }
      } else {
        router.push(`/recursos/acceso?email=${encodeURIComponent(email)}&ccaa=${encodeURIComponent(ccaa)}`);
      }
    } catch (err) {
      console.error(err);
      setError("Error al procesar tu solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            Método FyQ
          </Link>
          <Link href="/" className="flex items-center gap-2 text-blue-900 hover:text-blue-800">
            <ChevronLeft size={20} />
            Volver
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Recursos Gratuitos
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Todo lo que necesitas para comenzar tu preparación
          </p>
          <p className="text-gray-500">
            Simulacros, temas desarrollados y ejercicios resueltos paso a paso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <div>
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-10 border-t-4 border-blue-900">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Lock className="text-blue-900" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Acceso a Recursos
                  </h2>
                  <p className="text-sm text-gray-600">Completamente gratuito</p>
                </div>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed">
                Para acceso inmediato a nuestros recursos gratuitos, cuéntanos tu comunidad autónoma y déjanos tu email. Así podemos personalizar los materiales según tu convocatoria.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* CCAA Select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Comunidad Autónoma
                  </label>
                  <select
                    value={ccaa}
                    onChange={(e) => setCcaa(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona tu CCAA</option>
                    {CCAA_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors text-lg"
                >
                  {loading ? "Accediendo..." : "Acceder a recursos"}
                </button>

                {/* Privacy Notice */}
                <p className="text-xs text-gray-500 text-center">
                  Tus datos están seguros. No compartimos tu información con terceros.
                </p>
              </form>
            </div>
          </div>

          {/* Right: Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Obtendrás acceso a:
            </h3>

            {[
              {
                icon: "🧪",
                title: "Simulacro inspirado en Cataluña 2026",
                desc: "Examen completo con estructura y nivel real",
              },
              {
                icon: "📚",
                title: "Estudio de Tema nº59",
                desc: "Desarrollado con nuestro sistema de 4 niveles",
              },
              {
                icon: "✏️",
                title: "Problemas resueltos paso a paso",
                desc: "Explicaciones detalladas de simulacros anteriores",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}

            {/* Badge */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-8">
              <p className="text-sm text-blue-900">
                <span className="font-bold">✓ Acceso inmediato</span> - No esperes, descarga ahora mismo
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12 px-6 mt-16">
        <div className="max-w-5xl mx-auto text-center text-gray-600">
          <p>© 2026 Método FyQ · Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
