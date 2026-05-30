import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PruebaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-blue-950 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="h-10 w-auto flex items-center">
            <Image
              src="/logo.png"
              alt="Método FyQ"
              width={200}
              height={24}
              className="h-10 w-auto"
              priority
            />
          </div>
          <Link href="/" className="flex items-center gap-2 text-blue-200 hover:text-white">
            <ChevronLeft size={20} />
            Volver
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl text-center space-y-12">
          {/* Title */}
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Prueba nuestro sistema
            </h1>
            <p className="text-xl text-blue-200">
              Página y recursos en construcción
            </p>
          </div>

          {/* Construction Icon */}
          <div className="text-8xl">🔨</div>

          {/* CTAs */}
          <div className="space-y-4 pt-8">
            <Link
              href="/recursos"
              className="block w-full px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              📥 Te recomendamos descargar nuestros recursos gratuitos
            </Link>
            <Link
              href="/recursos/acceso?email=preview@metodofyq.com&ccaa=Cataluña"
              className="block w-full px-8 py-4 bg-cyan-400 text-blue-900 font-bold rounded-lg hover:bg-cyan-300 transition-colors text-lg"
            >
              📚 Probar el estudio del Tema nº59
            </Link>
          </div>

          {/* Extra info */}
          <div className="text-blue-200 text-sm pt-8">
            <p>Ambos recursos te ayudarán a entender nuestro método de preparación</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-800 bg-blue-950 py-8 px-6 text-center">
        <p className="text-blue-300">© 2026 Método FyQ · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
