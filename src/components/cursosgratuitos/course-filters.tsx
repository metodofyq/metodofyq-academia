// src/components/cursosgratuitos/course-filters.tsx
'use client';

import { CourseFilter } from '@/types/courses';
import { Input } from '@/components/ui/input';

export function CourseFilters({
  filters,
  onFiltersChange,
}: {
  filters: CourseFilter;
  onFiltersChange: (filters: CourseFilter) => void;
}) {
  return (
    <div className="space-y-4 mb-8 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Buscar por título..."
          value={filters.searchTerm || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, searchTerm: e.target.value })
          }
          className="flex-1"
        />

        <select
          value={filters.modality || 'all'}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              modality: e.target.value === 'all' ? undefined : (e.target.value as any),
            })
          }
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">Todas modalidades</option>
          <option value="online">Online</option>
          <option value="presencial">Presencial</option>
          <option value="hibrida">Híbrido</option>
        </select>

        <select
          value={filters.status || 'all'}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value === 'all' ? undefined : e.target.value,
            })
          }
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">Todos estados</option>
          <option value="open">Abierto</option>
          <option value="coming_soon">Próximamente</option>
        </select>
      </div>
    </div>
  );
}