"use client";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Tu plaza no se consigue estudiando más.
          <br />
          <span className="text-blue-500">Se consigue estudiando mejor.</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          « Necesitas un método y entrenar el examen real. »
        </p>
        <div className="grid grid-cols-4 gap-4 text-sm mb-12">
          <div>
            <p className="font-semibold text-gray-900">Especialidad</p>
            <p className="text-gray-600">Física y Química</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Cuerpo</p>
            <p className="text-gray-600">Profesores Secundaria</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Modalidad</p>
            <p className="text-gray-600">100% Online · 1 a 1</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Inicio</p>
            <p className="text-gray-600">6 de julio</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-800 font-semibold">
            Descarga nuestros recursos gratuitos
          </button>
          <a
            href="https://instagram.com/metodofyq"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 font-semibold"
          >
            Contacta con nosotros
          </a>
        </div>
      </div>
    </section>
  );
}
