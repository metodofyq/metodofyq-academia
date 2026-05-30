"use client";

export default function Manifesto() {
  const reasons = [
    { num: "01", title: "No practicar lo suficiente." },
    { num: "02", title: "No saber gestionar el tiempo." },
    { num: "03", title: "No medir el nivel con simulacros." },
    { num: "04", title: "No tener seguimiento personalizado." },
    { num: "05", title: "No conocer los criterios de corrección del tribunal." },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">02 — MANIFIESTO</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          La mayoría no suspende <span className="text-blue-500">por falta de teoría o ejercicios.</span> Suspende por:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {reasons.map((r) => (
            <div key={r.num} className="border border-gray-300 p-6 rounded-lg">
              <p className="text-blue-900 font-bold text-xl mb-2">{r.num}</p>
              <p className="text-gray-900 font-semibold">{r.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
