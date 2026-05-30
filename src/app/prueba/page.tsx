import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PruebaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Header simple */}
      <header className="sticky top-0 z-50 bg-blue-950 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Método FyQ
          </Link>
          <Link href="/" className="flex items-center gap-2 text-blue-200 hover:text-white">
            <ChevronLeft size={20} />
            Volver
          </Link>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="space-y-8">
          <div>
            <h1 className="text-6xl font-bold text-white mb-4">
              Prueba nuestro sistema
            </h1>
            <p className="text-2xl text-blue-200">
              Experimenta la metodología Método FyQ antes de comprometerte
            </p>
          </div>

          {/* Construction message */}
          <div className="mt-16 p-12 bg-blue-700 rounded-xl border-2 border-cyan-400">
            <div className="text-6xl mb-4">🔨</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Página en construcción
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Estamos preparando una versión de prueba interactiva con:
            </p>
            <ul className="text-left inline-block space-y-3 text-blue-100">
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎓</span>
                <span>Acceso a 1 tema completo de Física o Química</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <span>Algoritmo SM-2 de repetición espaciada en acción</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">💪</span>
                <span>10 ejercicios autocorregidos</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <span>Dashboard de progreso personalizado</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>Plan de estudio de 7 días recomendado</span>
              </li>
            </ul>
          </div>

          {/* Trial signup */}
          <div className="mt-12 p-8 bg-blue-700 rounded-lg border border-cyan-400">
            <p className="text-blue-100 mb-4">
              ¡Acceso gratis durante 7 días, sin tarjeta de crédito!
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded text-gray-900"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-900 rounded font-semibold hover:bg-blue-50"
              >
                Probar ahora
              </button>
            </form>
          </div>

          {/* What you'll experience */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-700 rounded-lg">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold mb-2">1 Tema completo</h3>
              <p className="text-blue-200 text-sm">Con todos los niveles de profundidad (N0 a N3)</p>
            </div>
            <div className="p-6 bg-blue-700 rounded-lg">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold mb-2">Ejercicios reales</h3>
              <p className="text-blue-200 text-sm">Al nivel del examen con corrección inmediata</p>
            </div>
            <div className="p-6 bg-blue-700 rounded-lg">
              <div className="text-4xl mb-3">🗓️</div>
              <h3 className="font-bold mb-2">7 días de acceso</h3>
              <p className="text-blue-200 text-sm">Suficiente para comprender el método</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <p className="text-blue-200 mb-6">
              ¿Prefieres conocer primero nuestros recursos gratuitos?
            </p>
            <Link
              href="/recursos"
              className="inline-block px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50"
            >
              Ver recursos
            </Link>
          </div>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-blue-950 text-blue-300 py-8 px-6 text-center border-t border-blue-800">
        <p>© 2026 Método FyQ · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
