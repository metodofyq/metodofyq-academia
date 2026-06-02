'use client';

import { FreeCourse } from '@/types/courses';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export function CourseCard({ course }: { course: FreeCourse }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOpen = course.registration_status === 'open';
  const compatIcon = course.compatibility_score >= 9 ? '🏆' : '📘';

  async function handleSave() {
    if (!user) {
      alert('Debes estar logueado');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from('saved_courses').insert({
        user_id: user.id,
        course_id: course.id,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm leading-snug">{course.title}</h3>
        <span className="text-2xl ml-2">{compatIcon}</span>
      </div>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {course.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="outline">{course.hours_certified}h</Badge>
        <Badge variant="secondary">{course.modality}</Badge>
        {isOpen && <Badge className="bg-green-100">Abierto</Badge>}
      </div>

      <div className="text-xs text-gray-500 space-y-1 mb-3">
        <div>📅 {course.start_date}</div>
        <div>👥 {course.vacancies} plazas</div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleSave}
          variant={saved ? 'default' : 'outline'}
          size="sm"
          disabled={loading}
          className="flex-1"
        >
          {saved ? '✅ Guardado' : '💾 Guardar'}
        </Button>
        <Button asChild size="sm">
          <a href={course.url} target="_blank" rel="noopener noreferrer">
            Ver →
          </a>
        </Button>
      </div>
    </div>
  );
}
