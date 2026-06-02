'use client';

import { AutonomousCommunity } from '@/types/courses';
import { useRouter } from 'next/navigation';

export function CCAAselector({
  communities,
  selectedCCAA,
}: {
  communities: AutonomousCommunity[];
  selectedCCAA: string;
}) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {communities.map((comm) => {
        const isActive = comm.slug === selectedCCAA;
        const isEnabled = comm.status === 'active';

        return (
          <button
            key={comm.id}
            onClick={() => {
              if (isEnabled) router.push(`/cursosgratuitos/${comm.slug}`);
            }}
            disabled={!isEnabled}
            className={`p-4 rounded-lg border-2 transition
              ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : isEnabled
                    ? 'border-gray-200 hover:border-blue-200'
                    : 'border-gray-100 opacity-50'
              }`}
          >
            <div className="font-semibold text-sm">{comm.name}</div>
            <div className="text-xs mt-1">
              {isEnabled ? (
                <span className="text-green-600">✅ Activo</span>
              ) : (
                <span className="text-amber-600">⏳ En desarrollo</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
