import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header simple */}
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

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="space-y-8">
          <div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              Recursos Gratuitos
            </h1>
            <p className="text-2xl text-gray-600">
              Descargas, guías y materiales para preparar tu oposición
            </p>
          </div>

          {/* Construction message */}
          <div className="mt-16 p-12 bg-blue-100 rounded-xl border-2 border-blue-900">
            <div className="text-6xl mb-4">🔨</div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Página en construcción
            </h2>
            <p className="text-lg text-blue-800 mb-8">
              Estamos preparando una colección increíble de recursos gratuitos para ti:
            </p>
            <ul className="text-left inline-block space-y-3 text-blue-800">
              <li className="flex items-center gap-3">
                <span className="text-2xl">📥</span>
                <span>Guías descargables en PDF</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span>Plantillas de estudio</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>Consejos de expertos</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🧪</span>
                <span>Ejercicios de prueba gratuitos</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span>Aplicación móvil de repaso</span>
              </li>
            </ul>
          </div>

          {/* Email signup */}
          <div className="mt-12 p-8 bg-gray-100 rounded-lg">
            <p className="text-gray-700 mb-4">
              📧 Déjanos tu email y te avisaremos cuando los recursos estén disponibles:
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded border border-gray-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-900 text-white rounded font-semibold hover:bg-blue-800"
              >
                Notificarme
              </button>
            </form>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <p className="text-gray-600 mb-6">
              Mientras tanto, puedes conocer nuestro método de preparación:
            </p>
            <Link
              href="/#prueba"
              className="inline-block px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800"
            >
              Prueba nuestro sistema
            </Link>
          </div>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-6 text-center">
        <p>© 2026 Método FyQ · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
