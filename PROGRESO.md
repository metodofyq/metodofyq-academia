# Progreso Método FyQ

## ✓ Completado en esta sesión (30 de mayo 2026)

### Infrastructure & Setup
- ✓ Migraciones SQL creadas:
  - `005_leads_table.sql` — Tabla para captura de emails desde landing
  - `006_pricing_table.sql` — Tabla con planes de precios (datos iniciales incluidos)
- ✓ Variables de entorno configuradas en `.env.local` (placeholder)

### Landing Page (13 componentes)
- ✓ 01 — `Header.tsx` — Navegación sticky + botón CTA
- ✓ 02 — `Hero.tsx` — Claim principal del producto
- ✓ 03 — `Origin.tsx` — Story del fundador (bg azul)
- ✓ 04 — `Manifesto.tsx` — 5 razones por las que fallan los oposit
- ✓ 05 — `WhatWeDo.tsx` — Lo que hacemos vs. no hacemos
- ✓ 06 — `Method4Exams.tsx` — 4 pruebas del examen (programación, problemas, temas, defensa)
- ✓ 07 — `LearningSystem.tsx` — 4 niveles de aprendizaje (Nivel 0-3)
- ✓ 08 — `Comparison.tsx` — Tabla comparativa vs academia tradicional
- ✓ 09 — `WhatIncludes.tsx` — 8 features incluidos (círculos numerados)
- ✓ 10 — `Pricing.tsx` — Dinámico desde BD (2 planes)
- ✓ 11 — `CCAA.tsx` — Mapa de cobertura (18 regiones)
- ✓ 12 — `LeadCapture.tsx` — Formulario email + CCAA + situación (escribe a `leads`)
- ✓ 13 — `FAQ.tsx` — 6 preguntas con acordeón
- ✓ 14 — `Footer.tsx` — Contacto + links legales

### Actualización de página
- ✓ `src/app/page.tsx` reescrito para renderizar toda la landing

### Diseño & Colores
- ✓ Patrón de colores alternado: Light → Dark (basado en Hero + Origin)
  - Secciones pares (1,3,5,7,9,11,13): Blanco/Gris claro
  - Secciones impares (2,4,6,8,10,12): Azul oscuro (blue-900)
- ✓ Logo: `public/logo.png` con diseño final
- ✓ Header: Navegación mejorada con items nuevos
  - "Recursos gratuitos"
  - "Prueba nuestro sistema"

### Cambios de contenido
- ✓ Hero: Botón actualizado a "Descarga nuestros recursos gratuitos"
- ✓ Pricing: Texto de cuotas "(o 9 cuotas de 140€)" debajo del precio
- ✓ FAQ: Eliminada pregunta sobre suspensión
- ✓ FAQ: Actualizada respuesta sobre CCAA con rúbricas
- ✓ CCAA: Botón "Consulta las próximas CCAA con convocatoria"

## 🚀 Listo para arrancar en local

### ✅ Estado actual
- Logo: ✓ En place (`public/logo.png`)
- Credenciales Supabase: ✓ Configuradas en `.env.local`
- Migraciones: ✓ Creadas (005_leads, 006_pricing)
- Componentes: ✓ 13 componentes + patrones de color
- Contenido: ✓ Actualizado según especificaciones

### Ejecución (3 pasos)

```bash
# 1️⃣ Instalar dependencias
npm install

# 2️⃣ Ejecutar migraciones en Supabase
npx supabase db push

# 3️⃣ Arrancar servidor de desarrollo
npm run dev
```

Luego abre en navegador: **http://localhost:3000**

## ✅ Checklist de verificación

Cuando cargue en **http://localhost:3000**, verifica:

### Visual & Navegación
- [ ] ✓ Logo Método FyQ visible en header
- [ ] ✓ Nav items: "Método", "Precios", "FAQ", "Recursos gratuitos", "Prueba nuestro sistema"
- [ ] ✓ Patrón de colores correcto (blanco ↔ azul alternado)
- [ ] ✓ Header sticky al scroll

### Landing (13 secciones)
- [ ] ✓ 01 Hero: Botón "Descarga nuestros recursos gratuitos"
- [ ] ✓ 02 Origin: Fondo azul oscuro con historia
- [ ] ✓ 03 Manifesto: 5 razones por las que fallan
- [ ] ✓ 04 WhatWeDo: Lo que hacemos vs. no hacemos
- [ ] ✓ 05 Method4Exams: 4 pruebas del examen
- [ ] ✓ 06 LearningSystem: 4 niveles Nivel 0-3
- [ ] ✓ 07 Comparison: Tabla vs academia tradicional
- [ ] ✓ 08 WhatIncludes: 8 features (círculos numerados)
- [ ] ✓ 09 Pricing: Planes dinámicos (carga desde BD)
- [ ] ✓ 10 CCAA: Mapa con botón "Consulta próximas CCAA"
- [ ] ✓ 11 LeadCapture: Formulario gris claro
- [ ] ✓ 12 FAQ: 5 preguntas con acordeón (sin suspensión)
- [ ] ✓ 13 Footer: Contacto + links

### Funcionalidad
- [ ] ✓ Pricing carga 2 planes desde BD (Curso completo + 1 prueba)
- [ ] ✓ Precios muestran: "1134€ / pago único" + "(o 9 cuotas de 140€)" debajo
- [ ] ✓ FAQ funciona: click abre/cierra respuesta
- [ ] ✓ Formulario: email + CCAA + situación

### Test del formulario
1. Scroll a sección gris claro "¿Listo para prepararte de verdad?"
2. Rellena: `test@example.com` + CCAA (cualquiera) + situación (opcional)
3. Click "Quiero una plaza"
4. Mensaje de éxito: "✓ Correo guardado correctamente"
5. Verifica en Supabase dashboard → tabla `leads` que aparece el registro

## 📅 Timeline del proyecto

- **Hoy (30 mayo)**: Landing capturando leads en localhost
- **Mañana (31 mayo)**: Deploy a Vercel (opcional hoy)
- **1 junio**: Convocatorias abiertas — landing recibe leads reales
- **6 julio**: Primer curso comienza

## 💡 Notas técnicas

### RLS (Row-Level Security)
- `leads`: Cualquiera puede insertar, solo auth pueden leer
- `pricing`: Cualquiera puede leer (es pública)
- Diseño pensado para producción

### Styling
- Tailwind CSS 100%
- Colores principales: `blue-900` (oscuro), `blue-500` (acento)
- Responsive: Mobile-first con `md:` breakpoints

### Componentes
- Todos `"use client"` (React clients)
- Pricing y LeadCapture usan Supabase JS client
- FAQ con estado interno (accordion)

## ⚠️ Si hay errores

### "Cannot find module '@/components/landing/...'"
→ Verifica que las carpetas `src/components/landing/` existen con todos los `.tsx`

### "Supabase client not configured"
→ Llena `.env.local` con credenciales reales (no placeholders)

### "Table leads doesn't exist"
→ Ejecuta: `npx supabase db push` de nuevo

### "Connection refused at localhost:3000"
→ Verifica que `npm run dev` se ejecutó sin errores

## 🎯 Siguiente sesión

Una vez funcione en localhost:
- [ ] Deploy a Vercel (conectar dominio de Hostinger)
- [ ] Flujo de registro real (login/signup)
- [ ] Panel del estudiante
- [ ] Selección de 40 temas
- [ ] Plan de estudio
