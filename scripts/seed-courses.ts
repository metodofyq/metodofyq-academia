import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no están configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

const communities = [
  { name: 'Cataluña', slug: 'cataluna', status: 'active' },
  { name: 'Andalucía', slug: 'andalucia', status: 'coming_soon' },
  { name: 'Galicia', slug: 'galicia', status: 'coming_soon' },
  { name: 'Madrid', slug: 'madrid', status: 'coming_soon' },
  { name: 'Valencia', slug: 'valencia', status: 'coming_soon' },
  { name: 'Aragón', slug: 'aragon', status: 'coming_soon' },
  { name: 'Asturias', slug: 'asturias', status: 'coming_soon' },
  { name: 'Baleares', slug: 'baleares', status: 'coming_soon' },
  { name: 'Canarias', slug: 'canarias', status: 'coming_soon' },
  { name: 'Cantabria', slug: 'cantabria', status: 'coming_soon' },
  { name: 'Castilla-La Mancha', slug: 'castilla-la-mancha', status: 'coming_soon' },
  { name: 'Castilla y León', slug: 'castilla-leon', status: 'coming_soon' },
  { name: 'Extremadura', slug: 'extremadura', status: 'coming_soon' },
  { name: 'La Rioja', slug: 'la-rioja', status: 'coming_soon' },
  { name: 'Murcia', slug: 'murcia', status: 'coming_soon' },
  { name: 'Navarra', slug: 'navarra', status: 'coming_soon' },
  { name: 'País Vasco', slug: 'pais-vasco', status: 'coming_soon' },
  { name: 'Ceuta', slug: 'ceuta', status: 'coming_soon' },
  { name: 'Melilla', slug: 'melilla', status: 'coming_soon' },
];

async function seed() {
  try {
    console.log('🌱 Iniciando seed de cursos gratuitos...\n');

    // 1. Seed CCAA
    console.log('📍 Seeding 19 comunidades autónomas...');
    const { data: ccaaData, error: ccaaError } = await supabase
      .from('autonomous_communities')
      .insert(communities)
      .select();

    if (ccaaError) throw new Error(`Error seeding CCAA: ${ccaaError.message}`);
    console.log(`✅ ${ccaaData?.length || 0} CCAA creadas\n`);

    // Obtener ID de Cataluña
    const { data: catData, error: catError } = await supabase
      .from('autonomous_communities')
      .select('id')
      .eq('slug', 'cataluna')
      .single();

    if (catError || !catData) throw new Error('Cataluña no encontrada');

    // 2. Seed cursos
    console.log('📚 Leyendo seed data de cursos...');
    const seedPath = path.join(process.cwd(), 'seed_data_cataluna_xtec.json');

    if (!fs.existsSync(seedPath)) {
      throw new Error(`Archivo no encontrado: ${seedPath}`);
    }

    const seedJson = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    const courses = seedJson.courses || [];

    console.log(`📊 Encontrados ${courses.length} cursos para Cataluña`);

    // Mapear cursos con ccaa_id y remover campo ccaa
    const cursosWithCcaaId = courses.map((course: any) => {
      const { ccaa, ...rest } = course;
      return {
        ...rest,
        ccaa_id: catData.id,
      };
    });

    console.log('🚀 Insertando cursos en Supabase...');
    const { data: cursoData, error: cursoError } = await supabase
      .from('free_courses')
      .insert(cursosWithCcaaId)
      .select();

    if (cursoError) throw new Error(`Error seeding cursos: ${cursoError.message}`);
    console.log(`✅ ${cursoData?.length || 0} cursos creados\n`);

    console.log('🎉 ¡Seed completado exitosamente!');
    console.log(`\n📊 Resumen:`);
    console.log(`   - 19 CCAA registradas (1 activa, 18 próximamente)`);
    console.log(`   - 25 cursos para Cataluña`);
  } catch (error) {
    console.error('❌ Error en seed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

seed();
