'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AutonomousCommunity, FreeCourse, CourseFilter } from '@/types/courses';
import { CCAAselector } from '@/components/cursosgratuitos/ccaa-selector';
import { CourseFilters } from '@/components/cursosgratuitos/course-filters';
import { CourseCard } from '@/components/cursosgratuitos/course-card';

export default function CursosGratuitosPage() {
  const [communities, setCommunities] = useState<AutonomousCommunity[]>([]);
  const [courses, setCourses] = useState<FreeCourse[]>([]);
  const [filters, setFilters] = useState<CourseFilter>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunities();
    loadCourses();
  }, [filters]);

  async function loadCommunities() {
    const supabase = createClient();
    const { data } = await supabase
      .from('autonomous_communities')
      .select('*')
      .order('name');
    setCommunities(data || []);
  }

  async function loadCourses() {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from('free_courses')
      .select('*')
      .eq('registration_status', 'open');

    if (filters.modality) query = query.eq('modality', filters.modality);
    if (filters.searchTerm) {
      query = query.ilike('title', `%${filters.searchTerm}%`);
    }

    const { data } = await query.order('start_date');
    setCourses(data || []);
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          📚 Cursos Gratuitos Homologados
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Encuentra cursos certificados para aumentar tu puntuación en oposiciones docentes.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Selecciona tu comunidad</h2>
      <CCAAselector communities={communities} selectedCCAA="cataluna" />

      <CourseFilters filters={filters} onFiltersChange={setFilters} />

      {loading ? (
        <div className="text-center py-12">Cargando...</div>
      ) : courses.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 mb-6">{courses.length} cursos encontrados</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          No se encontraron cursos
        </div>
      )}
    </div>
  );
}
