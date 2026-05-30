"use client";

export default function WhatIncludes() {
  const features = [
    { num: "01", title: "Estrategia personalizada" },
    { num: "02", title: "Resolución de problemas" },
    { num: "03", title: "Simulacros reales" },
    { num: "04", title: "Registro de tus calificaciones" },
    { num: "05", title: "Tutorías semanales" },
    { num: "06", title: "Corrección de tus \"Ponte a prueba\"" },
    { num: "07", title: "100% online y a tu ritmo" },
    { num: "08", title: "Rúbricas de tribunal" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">07 — QUÉ INCLUYE</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Todo lo que necesitas en este camino.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.num} className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <p className="font-bold text-blue-900 text-lg">{f.num}</p>
              </div>
              <p className="text-gray-900 font-semibold text-sm">{f.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
