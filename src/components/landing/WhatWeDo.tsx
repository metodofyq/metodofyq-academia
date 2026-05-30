"use client";

export default function WhatWeDo() {
  const differences = [
    {
      title: "Lo que sí hacemos diferente:",
      items: [
        "✓ Estrategia diseñada para ti, no para un grupo genérico.",
        "✓ Corrección de todo lo que entregas.",
        "✓ Simulacros con el tiempo y nivel de tribunal.",
        "✓ Acompañamiento continuo · WhatsApp, email y llamadas.",
        "✓ Compartir las rúbricas de calificación usadas por los tribunales.",
      ],
    },
    {
      title: "Lo que no vamos a hacer:",
      items: [
        "✗ Clases magistrales.",
        "✗ Entregar 75 temas como si tuvieras tiempo infinito.",
        "✗ Darte simulacros más fáciles que el examen real.",
        "✗ Corregir \"a veces\", vagamente y tarde.",
        "✗ Tratarte como uno más.",
      ],
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">03 — LO QUE HACEMOS</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Como academia 100% online</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {differences.map((section) => (
            <div key={section.title}>
              <h4 className="text-xl font-bold text-gray-900 mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
