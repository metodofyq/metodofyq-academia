"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-900">Método FyQ</h1>
        </div>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#metodo" className="text-gray-700 hover:text-blue-900">Método</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-900">Precios</a>
          <a href="#faq" className="text-gray-700 hover:text-blue-900">FAQ</a>
        </nav>
        <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800">
          Inscribirse
        </button>
      </div>
    </header>
  );
}
