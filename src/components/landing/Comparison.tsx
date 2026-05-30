"use client";

export default function Comparison() {
  const features = [
    { feature: "Simulacros adaptados y de años anteriores.", metodofyq: true, tradicional: false },
    { feature: "Entrenamiento por bloques", metodofyq: true, tradicional: "General" },
    { feature: "Problemas clasificados por dificultad", metodofyq: true, tradicional: false },
    { feature: "Corrección personalizada", metodofyq: true, tradicional: "A veces" },
    { feature: "Preparación personalizada.", metodofyq: "Adaptado a ti", tradicional: false },
    { feature: "Medición real de nivel.", metodofyq: true, tradicional: false },
    { feature: "Material centrado en aprobar según tu CCAA.", metodofyq: true, tradicional: false },
    { feature: "Temas redactables en tiempo de examen.", metodofyq: true, tradicional: "Demasiado técnicos" },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">06 — COMPARATIVA</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          No somos una <span className="text-blue-500">academia más.</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Característica</th>
                <th className="text-center py-4 px-4 font-semibold text-blue-900">Método FyQ</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-600">Academia Tradicional</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-900">{f.feature}</td>
                  <td className="text-center py-4 px-4">
                    {f.metodofyq === true ? "✓ Sí" : f.metodofyq}
                  </td>
                  <td className="text-center py-4 px-4 text-gray-600">
                    {f.tradicional === false ? "— No" : f.tradicional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
