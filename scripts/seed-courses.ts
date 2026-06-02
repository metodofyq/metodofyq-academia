import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import { scrapeXtecCourses } from "./scrapers/xtec-scraper";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error("❌ Faltan variables de entorno");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

const communities = [
  { name: "Cataluña", slug: "cataluna", status: "active" },
  { name: "Andalucía", slug: "andalucia", status: "coming_soon" },
  { name: "Galicia", slug: "galicia", status: "coming_soon" },
  { name: "Madrid", slug: "madrid", status: "coming_soon" },
  { name: "Valencia", slug: "valencia", status: "coming_soon" },
  { name: "Aragón", slug: "aragon", status: "coming_soon" },
  { name: "Asturias", slug: "asturias", status: "coming_soon" },
  { name: "Baleares", slug: "baleares", status: "coming_soon" },
  { name: "Canarias", slug: "canarias", status: "coming_soon" },
  { name: "Cantabria", slug: "cantabria", status: "coming_soon" },
  { name: "Castilla-La Mancha", slug: "castilla-la-mancha", status: "coming_soon" },
  { name: "Castilla y León", slug: "castilla-leon", status: "coming_soon" },
  { name: "Extremadura", slug: "extremadura", status: "coming_soon" },
  { name: "La Rioja", slug: "la-rioja", status: "coming_soon" },
  { name: "Murcia", slug: "murcia", status: "coming_soon" },
  { name: "Navarra", slug: "navarra", status: "coming_soon" },
  { name: "País Vasco", slug: "pais-vasco", status: "coming_soon" },
  { name: "Ceuta", slug: "ceuta", status: "coming_soon" },
  { name: "Melilla", slug: "melilla", status: "coming_soon" },
];

async function seed() {
  try {
    console.log("🌱 Iniciando seed con datos scraped de XTEC...\n");

    // 1. Seed CCAA
    console.log("📍 Seeding 19 comunidades autónomas...");
    const { data: ccaaData, error: ccaaError } = await supabase
      .from("autonomous_communities")
      .insert(communities)
      .select();

    if (ccaaError) throw ccaaError;
    console.log(`✅ ${ccaaData?.length} CCAA creadas\n`);

    // Obtener ID de Cataluña
    const { data: catData } = await supabase
      .from("autonomous_communities")
      .select("id")
      .eq("slug", "cataluna")
      .single();

    if (!catData) throw new Error("Cataluña no encontrada");

    // 2. SCRAPEAR XTEC
    console.log("🌐 Scrapeando XTEC en tiempo real...\n");
    const scrapedCourses = await scrapeXtecCourses();

    if (scrapedCourses.length === 0) {
      console.warn("⚠️ No se encontraron cursos en XTEC, usando JSON fallback");
      // Fallback a JSON si scraping falla
      const fs = require('fs');
      const seedJson = JSON.parse(fs.readFileSync("seed_data_cataluna_xtec.json", "utf-8"));
      scrapedCourses.push(...seedJson.courses);
    }

    // 3. Preparar cursos
    console.log("🔄 Preparando cursos...");
    const coursesWithCcaaId = scrapedCourses.map((course: any) => ({
      ccaa_id: catData.id,
      title: course.title || "Curso XTEC",
      description: course.description || "Curso de formación del Departament d'Educació",
      provider: "XTEC - Departament d'Educació",
      provider_name: "XTEC",
      url: course.url || "https://xtec.gencat.cat/ca/formacio/",
      hours_certified: course.hours || 25,
      modality: course.modality || "online",
      start_date: course.startDate || "2025-09-15",
      end_date: course.endDate || "2025-12-20",
      registration_deadline: course.registrationDeadline || "2025-09-01",
      vacancies: course.vacancies || 100,
      registration_status: course.registrationStatus || "open",
      certification: course.certification || "Departament d'Educació",
      specialties: ["Todas"],
      course_type: "formacion_continua",
      compatibility_score: 8,
      tags: ["xtec", "cataluna", "scrapeado"],
      source_url: course.url || "https://xtec.gencat.cat/ca/formacio/",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    // 4. Insertar en lotes
    console.log("📤 Insertando cursos en Supabase...");
    const batchSize = 10;
    let totalInserted = 0;

    for (let i = 0; i < coursesWithCcaaId.length; i += batchSize) {
      const batch = coursesWithCcaaId.slice(i, i + batchSize);
      const { data: cursoData, error: cursoError } = await supabase
        .from("free_courses")
        .insert(batch)
        .select();

      if (cursoError) throw cursoError;
      totalInserted += cursoData?.length || 0;
      console.log(`   ✅ Lote ${Math.floor(i / batchSize) + 1}: ${cursoData?.length} cursos`);
    }

    console.log(`\n✅ Total de cursos insertados: ${totalInserted}\n`);
    console.log("🎉 Seed completado!");
    console.log("\n📊 Resumen:");
    console.log(`   - CCAA: ${ccaaData?.length}`);
    console.log(`   - Cursos: ${totalInserted}`);
    console.log(`   - Cataluña: ACTIVO ✅`);

  } catch (error) {
    console.error("\n❌ Error en seed:", error);
    process.exit(1);
  }
}

seed();
