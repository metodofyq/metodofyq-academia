"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Pricing() {
  const [prices, setPrices] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await supabase
          .from("pricing")
          .select("*")
          .order("created_at");
        setPrices(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">08 — INVERSIÓN</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Dos formas de empezar. <span className="text-blue-500">Matrícula 1€</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {loading ? (
            <p>Cargando precios...</p>
          ) : prices && prices.length > 0 ? (
            prices.map((p: any) => (
              <div key={p.id} className={`p-8 rounded-lg ${p.recommended ? "bg-blue-100 border-2 border-blue-900" : "bg-white border border-gray-300"}`}>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h4>
                <p className="text-gray-600 mb-6">{p.description}</p>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  {p.price}€
                  <span className="text-sm text-gray-600"> / {p.frequency}</span>
                </p>
                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 font-semibold">
                  Comenzar
                </button>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {(p.features || []).map((f: string, i: number) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No hay precios disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
}
