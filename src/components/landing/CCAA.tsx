"use client";

export default function CCAA() {
  const regions = [
    { code: "AND", name: "Andalucía" },
    { code: "ARA", name: "Aragón" },
    { code: "AST", name: "Asturias" },
    { code: "BAL", name: "Baleares" },
    { code: "CAN", name: "Canarias" },
    { code: "CAB", name: "Cantabria" },
    { code: "CLM", name: "Castilla–La Mancha" },
    { code: "CYL", name: "Castilla y León" },
    { code: "CAT", name: "Cataluña" },
    { code: "EXT", name: "Extremadura" },
    { code: "GAL", name: "Galicia" },
    { code: "RIO", name: "La Rioja" },
    { code: "MAD", name: "Madrid" },
    { code: "MUR", name: "Murcia" },
    { code: "NAV", name: "Navarra" },
    { code: "PVA", name: "País Vasco" },
    { code: "VAL", name: "Valencia" },
    { code: "CYM", name: "Ceuta y Melilla" },
  ];

  return (
    <section className="py-20 px-6 bg-blue-900 text-white">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-200 mb-4">09 — COBERTURA</h3>
        <h2 className="text-4xl font-bold text-white mb-8">
          Adaptado a <span className="text-cyan-300">tu convocatoria.</span>
        </h2>
        <button className="mb-12 px-6 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 text-sm font-semibold">
          Consulta las próximas CCAA con convocatoria
        </button>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {regions.map((r) => (
            <div key={r.code} className="bg-blue-800 p-4 rounded-lg text-center border border-blue-700">
              <p className="text-xs font-semibold text-blue-300 mb-1">{r.code}</p>
              <p className="text-sm font-semibold text-white">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
