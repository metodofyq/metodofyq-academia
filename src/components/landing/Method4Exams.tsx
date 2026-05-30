"use client";

export default function Method4Exams() {
  const exams = [
    {
      num: "01",
      title: "Programación didáctica",
      points: [
        "Empezamos por la programación para quitártela de encima cuanto antes.",
        "Guía paso a paso.",
        "Adecuación legislativa.",
        "Consejos para destacar y correcciones basadas en la rúbrica que usan los tribunales.",
        "Ejemplo de programación ya aprobada.",
        "Contenido para la defensa.",
      ],
    },
    {
      num: "02",
      title: "Problemas",
      points: [
        "Enunciados y resolución de problemas por dificultad para las 17 temáticas de FyQ.",
        "Envío progresivo semanal de teoría aplicada a los ejercicios.",
        "\"Ponte a prueba\" semanal para entregar y corrección a final de cada temática.",
        "Simulacros reales e inspirados en anteriores convocatorias evaluados con la rúbrica de tribunal.",
      ],
    },
    {
      num: "03",
      title: "Temas",
      points: [
        "Estrategia personalizada: te recomendamos los temas más rentables, pero escoges tú.",
        "Recomendación: dominar 40 de los 75 temas posibles.",
        "Sistema de aprendizaje progresivo en 4 niveles de profundidad: Nivel 0 hasta Nivel 3.",
        "Entiende cómo corrige el tribunal antes de memorizar.",
      ],
    },
    {
      num: "04",
      title: "Defensa de la programación",
      points: [
        "Guía para escoger el contenido a exponer.",
        "Cómo maquetar la presentación.",
        "Cómo destacar entre tu competencia.",
        "Preguntas típicas de tribunal aplicadas a tu programación.",
        "2 evaluaciones de grabaciones con vídeo.",
        "1 evaluación de exposición en directo.",
      ],
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">04 — MÉTODO</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Olvídate de las <span className="text-blue-500">clases magistrales.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exams.map((exam) => (
            <div key={exam.num} className="bg-blue-100 p-8 rounded-lg">
              <p className="text-blue-900 font-bold text-sm mb-2">PRUEBA {exam.num}</p>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">{exam.title}</h4>
              <ul className="space-y-3 text-gray-800">
                {exam.points.map((point, i) => (
                  <li key={i} className="text-sm">• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
