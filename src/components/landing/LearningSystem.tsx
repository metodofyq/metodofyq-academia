"use client";

export default function LearningSystem() {
  const levels = [
    {
      level: "Nivel 0",
      title: "Estructura",
      desc: "Índice: apartados y subapartados.",
    },
    {
      level: "Nivel 1",
      title: "Ideas clave",
      desc: "Conceptos y palabras imprescindibles. Su ausencia penaliza",
    },
    {
      level: "Nivel 2",
      title: "Desarrollo técnico",
      desc: "Relaciones, fórmulas, explicaciones y contenido desarrollado.",
    },
    {
      level: "Nivel 3",
      title: "Redacción completa",
      desc: "Tema desarrollado con la rúbrica de tribunal. Extensión adaptada.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-300 mb-4">05 — SISTEMA DE APRENDIZAJE</h3>
        <h2 className="text-4xl font-bold mb-12">
          Los temas se aprenden <span className="italic">por capas.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {levels.map((l) => (
            <div key={l.level} className="border border-blue-400 p-6 rounded-lg">
              <p className="text-blue-300 font-semibold mb-2">{l.level}</p>
              <h4 className="text-xl font-bold mb-3">{l.title}</h4>
              <p className="text-blue-100 text-sm">{l.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-blue-800 p-8 rounded-lg mb-8">
          <p className="text-2xl font-bold mb-4">
            96 % de probabilidad de que se escoja tener un tema <span className="italic">estudiado</span> en el sorteo de la oposición.
          </p>
          <p className="text-blue-200">
            No estudiamos 75 temas. Estudiamos los 40 correctos.
          </p>
        </div>
        <p className="text-blue-100 leading-relaxed">
          Dominar bien 40 de los 75 temas posibles no es renunciar a nada. Es matemática aplicada al examen real. Te recomendamos los temas más rentables según tu comunidad autónoma, tu perfil y tu tiempo. Nos adaptamos siempre a lo que tú decidas.
        </p>
      </div>
    </section>
  );
}
