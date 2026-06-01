import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single() as { data: { full_name: string | null } | null }

  const firstName = profile?.full_name?.split(' ')[0] ?? 'estudiante'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold capitalize">
          Hola, {firstName} 👋
        </h1>
      </div>

      <div className="rounded-lg border border-dashed p-12 text-center space-y-4">
        <div className="text-5xl">🚀</div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard en desarrollo</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Estamos construyendo tu panel personalizado con plan de estudio, tareas diarias,
          seguimiento de progreso y mucho más.
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Volver a la landing
          </a>
        </div>
      </div>
    </div>
  )
}
