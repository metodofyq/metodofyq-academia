"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const CCAA_OPTIONS = [
  "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
  "Castilla–La Mancha", "Castilla y León", "Cataluña", "Extremadura",
  "Galicia", "La Rioja", "Madrid", "Murcia", "Navarra", "País Vasco",
  "Valencia", "Ceuta y Melilla",
];

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [ccaa, setCcaa] = useState("");
  const [situacion, setSituacion] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: err } = await supabase.from("leads").insert([
      { email, ccaa, situacion },
    ]);

    if (err) {
      console.error("Error:", err);
      setError("Hubo un error. Inténtalo de nuevo.");
    } else {
      setSuccess(true);
      setEmail("");
      setCcaa("");
      setSituacion("");
      setTimeout(() => setSuccess(false), 5000);
    }
    setLoading(false);
  };

  return (
    <section className="py-20 px-6 bg-blue-900 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          ¿Listo para prepararte <span className="italic">de verdad</span>?
        </h2>
        <p className="text-blue-200 mb-12">
          Las plazas son limitadas y se abren el 1 de junio.
          <br />
          No esperes al último momento — los que empiezan antes llegan más descansados.
        </p>

        {success && (
          <div className="mb-6 p-4 bg-green-500 rounded-lg">
            ✓ Correo guardado correctamente. Te contactaremos pronto.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500 rounded-lg">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-blue-800 p-8 rounded-lg">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded text-gray-900"
          />
          <select
            value={ccaa}
            onChange={(e) => setCcaa(e.target.value)}
            required
            className="w-full px-4 py-3 rounded text-gray-900"
          >
            <option value="">Selecciona tu comunidad autónoma</option>
            {CCAA_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={situacion}
            onChange={(e) => setSituacion(e.target.value)}
            className="w-full px-4 py-3 rounded text-gray-900"
          >
            <option value="">Tu situación (opcional)</option>
            <option value="primer-vez">Es mi primer intento</option>
            <option value="varias-convocatorias">Llevo varias convocatorias</option>
            <option value="indecisos">Aún estoy en duda</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-900 font-bold py-3 rounded hover:bg-blue-100 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Quiero una plaza"}
          </button>
        </form>
      </div>
    </section>
  );
}
