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
      a: "Sí. Los simulacros y materiales se adaptan a las convocatorias específicas de tu comunidad autónoma, con temas y criterios de evaluación propios.",
    },
    {
      q: "¿Cómo funciona la corrección de ejercicios y temas?",
      a: "Entregas el material en los plazos acordados y te lo devolvemos corregido con comentarios detallados, usando las mismas rúbricas que emplean los tribunales.",
    },
    {
      q: "¿Puedo comprar solo una prueba si ya tengo otras preparadas?",
      a: "Sí. Puedes contratar únicamente la prueba que necesitas: Temas, Problemas, Programación o Defensa, por 450 € cada una.",
    },
    {
      q: "¿Y si suspendo la oposición después de la preparación?",
      a: "Es algo que puede ocurrir. Si has cumplido el 90% de las tareas propuestas, te devolvemos el dinero o renuevas la preparación para la próxima convocatoria.",
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">10 — FAQ</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Lo que nos <span className="text-blue-500">preguntan más</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full text-left px-6 py-4 bg-white hover:bg-gray-50 font-semibold text-gray-900 flex justify-between items-center"
              >
                {faq.q}
                <span>{active === i ? "−" : "+"}</span>
              </button>
              {active === i && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-300">
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
