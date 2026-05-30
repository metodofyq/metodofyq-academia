"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download, BookOpen, FileText } from "lucide-react";

export default function AccesoRecursosPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const ccaa = searchParams.get("ccaa") || "";

  const recursos = [
    {
      id: 1,
      icon: "🧪",
      title: "Simulacro inspirado en Cataluña 2026",
      description: "Examen completo con estructura y nivel real del tribunal de Cataluña",
      contenido: [
        "✓ 3 ejercicios de problemas (nivel examen)",
        "✓ Defensa de programación (20 minutos)",
        "✓ Respuestas con rúbrica de corrección",
      ],
      size: "4.2 MB",
      type: "PDF",
    },
    {
      id: 2,
      icon: "📚",
      title: "Estudio de Tema nº59 con nuestro sistema",
      description: "Tema desarrollado en los 4 niveles de profundidad del método Método FyQ",
      contenido: [
        "✓ Nivel 0: Estructura y conceptos clave",
        "✓ Nivel 1: Ideas fundamentales",
        "✓ Nivel 2: Desarrollo técnico completo",
        "✓ Nivel 3: Redacción de examen",
      ],
      size: "2.8 MB",
      type: "PDF",
    },
    {
      id: 3,
      icon: "✏️",
      title: "Problemas resueltos paso a paso",
      description: "10 problemas de simulacros anteriores con solución detallada y explicaciones",
      contenido: [
        "✓ 10 problemas con soluciones completas",
        "✓ Explicaciones paso a paso",
        "✓ Criterios de corrección",
        "✓ Estrategias de resolución",
      ],
      size: "3.5 MB",
      type: "PDF",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            Método FyQ
          </Link>
          <Link href="/recursos" className="flex items-center gap-2 text-blue-900 hover:text-blue-800">
            <ChevronLeft size={20} />
            Atrás
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-3">
              ¡Hola{email ? `, ${email.split("@")[0]}` : ""}! 🎉
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Aquí están tus recursos gratuitos personalizados para {ccaa || "tu comunidad autónoma"}.
            </p>
            <p className="text-blue-200">
              Descarga ahora y comienza tu preparación con el método que ha ayudado a cientos de estudiantes a aprobar.
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {recursos.map((recurso) => (
            <div
              key={recurso.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border border-gray-200"
            >
              {/* Header with Icon */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 text-center border-b border-gray-200">
                <div className="text-6xl mb-4">{recurso.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{recurso.title}</h3>
              </div>

              {/* Description */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {recurso.description}
                </p>

                {/* Content List */}
                <div className="mb-6 space-y-3">
                  {recurso.contenido.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* File Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-6 pb-6 border-b border-gray-200">
                  <span className="flex items-center gap-1">
                    <FileText size={14} />
                    {recurso.type}
                  </span>
                  <span>{recurso.size}</span>
                </div>

                {/* Download Button */}
                <button className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Descargar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Próximos pasos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">1️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Descarga los recursos</h3>
                <p className="text-gray-600 text-sm">Obtén acceso inmediato a todos los materiales</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">2️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Estudia a tu ritmo</h3>
                <p className="text-gray-600 text-sm">Usa nuestros materiales como prefieras</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">3️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Prueba nuestro sistema</h3>
                <p className="text-gray-600 text-sm">Cuando estés listo, accede a nuestra plataforma completa</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            ¿Quieres llevar tu preparación al siguiente nivel?
          </h2>
          <p className="mb-6 text-blue-100">
            Accede a nuestro sistema completo con plan personalizado, seguimiento semanal y corrección de ejercicios.
          </p>
          <Link
            href="/prueba"
            className="inline-block px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Prueba nuestro sistema gratis
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-600 text-sm">
          <p>
            Estos recursos son gratuitos y se enviaron a <span className="font-semibold">{email}</span>
          </p>
          <p className="mt-2">
            ¿Preguntas? Contactanos en <span className="text-blue-900 font-semibold">hola@metodofyq.com</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2026 Método FyQ · Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
