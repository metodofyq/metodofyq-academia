# Progreso Método FyQ

## ✓ Completado en esta sesión

### Infrastructure
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

## 🚀 Próximos pasos: Arranque local

### Paso 1: Llenar credenciales Supabase
Edita `.env.local` con tus valores reales (from Supabase dashboard):
```bash
# Abre tu proyecto en https://supabase.com
# Busca Settings → API → Project URL y anon key
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-real
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Ejecutar migraciones
```bash
npx supabase db push
```
Esto creará las tablas `leads` y `pricing` en tu BD Supabase.

### Paso 4: Arrancar el servidor
```bash
npm run dev
```

Visita: **http://localhost:3000**

## ✅ Verificación de éxito

Cuando todo funcione, deberías ver:
1. ✓ Landing completa sin errores (scroll de arriba a abajo)
2. ✓ Header sticky en azul oscuro
3. ✓ Todas las 13 secciones visibles
4. ✓ Botón "Quiero una plaza" que abre formulario azul
5. ✓ Precios cargando desde BD (2 planes: Curso completo + 1 prueba)
6. ✓ FAQ con acordeón funcional
7. ✓ Formulario escribiendo a tabla `leads` cuando envías

### Prueba del formulario
1. Abre la página
2. Scroll hasta la sección azul "¿Listo para prepararte?"
3. Rellena:
   - Email: `test@example.com`
   - CCAA: Cualquiera
   - Situación: Cualquiera
4. Click "Quiero una plaza"
5. Verifica en Supabase dashboard → `leads` que aparece el registro

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
