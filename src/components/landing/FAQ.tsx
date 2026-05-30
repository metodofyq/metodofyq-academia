"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "¿Hace falta experiencia previa para apuntarme?",
      a: "No. Nos adaptamos tanto a quien se presenta por primera vez como a quien ya lleva varias convocatorias. El primer paso es conocerte y diseñar tu estrategia.",
    },
    {
      q: "¿Cuántas horas a la semana necesito dedicar?",
      a: "Depende de tus circunstancias. Parte de nuestro trabajo es ayudarte a calcular cuánto tiempo tienes realmente y organizar el estudio de la forma más rentable posible.",
    },
    {
      q: "¿El curso es válido para cualquier comunidad autónoma?",
      a: "Sí. Los simulacros y materiales se adaptan a la convocatoria de tu comunidad autónoma y sus correspondientes rúbricas de corrección, de las 4 pruebas.",
    },
    {
      q: "¿Cómo funciona la corrección de ejercicios y temas?",
      a: "Entregas el material en los plazos acordados y te lo devolvemos corregido con comentarios detallados, usando las mismas rúbricas que emplean los tribunales.",
    },
    {
      q: "¿Puedo comprar solo una prueba si ya tengo otras preparadas?",
      a: "Sí. Puedes contratar únicamente la prueba que necesitas: Temas, Problemas, Programación o Defensa, por 450 € cada una.",
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6 bg-blue-900 text-white">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-200 mb-4">10 — FAQ</h3>
        <h2 className="text-4xl font-bold text-white mb-12">
          Lo que nos <span className="text-cyan-300">preguntan más</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-blue-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full text-left px-6 py-4 bg-blue-800 hover:bg-blue-700 font-semibold text-white flex justify-between items-center"
              >
                {faq.q}
                <span>{active === i ? "−" : "+"}</span>
              </button>
              {active === i && (
                <div className="px-6 py-4 bg-blue-900 text-blue-100 border-t border-blue-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
