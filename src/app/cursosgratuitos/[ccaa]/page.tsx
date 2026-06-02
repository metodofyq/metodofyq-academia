'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AutonomousCommunity, FreeCourse, CourseFilter } from '@/types/courses';
import { CCAAselector } from '@/components/cursosgratuitos/ccaa-selector';
import { CourseFilters } from '@/components/cursosgratuitos/course-filters';
import { CourseCard } from '@/components/cursosgratuitos/course-card';

export default function CCAPage() {
  const { ccaa } = useParams();
  const [communities, setCommunities] = useState<AutonomousCommunity[]>([]);
  const [currentCommunity, setCurrentCommunity] = useState<AutonomousCommunity | null>(null);
  const [courses, setCourses] = useState<FreeCourse[]>([]);
  const [filters, setFilters] = useState<CourseFilter>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [ccaa, filters]);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();

    const { data: commData } = await supabase
      .from('autonomous_communities')
      .select('*')
      .order('name');
    setCommunities(commData || []);

    const current = commData?.find((c) => c.slug === ccaa);
    if (current) {
      setCurrentCommunity(current);

      if (current.status === 'active') {
        let query = supabase
          .from('free_courses')
          .select('*')
          .eq('ccaa_id', current.id);

        if (filters.modality) query = query.eq('modality', filters.modality);
        if (filters.searchTerm) {
          query = query.ilike('title', `%${filters.searchTerm}%`);
        }

        const { data: courseData } = await query.order('start_date');
        setCourses(courseData || []);
      }
    }

    setLoading(false);
  }

  if (!currentCommunity) {
    return <div className="text-center py-12">No encontrada</div>;
  }

  if (currentCommunity.status === 'coming_soon') {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">⏳ {currentCommunity.name}</h1>
        <p className="text-gray-600">Próximamente</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">📚 {currentCommunity.name}</h1>
      <CCAAselector communities={communities} selectedCCAA={ccaa as string} />
      <CourseFilters filters={filters} onFiltersChange={setFilters} />

      {loading ? (
        <div>Cargando...</div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">Sin cursos</div>
      )}
    </div>
  );
}
