import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProfileEditor } from '@/components/profile/profile-editor'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { count: totalTopics } = await supabase
    .from('topic_progress')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', user.id)
    .eq('is_unlocked', true)

  const { count: totalExercises } = await supabase
    .from('exercise_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', user.id)

  const { count: correctExercises } = await supabase
    .from('exercise_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', user.id)
    .eq('is_correct', true)

  const accuracy = totalExercises
    ? Math.round(((correctExercises ?? 0) / totalExercises) * 100)
    : 0

  if (!profile) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Mi perfil</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Temas iniciados', value: totalTopics ?? 0 },
          { label: 'Ejercicios',      value: totalExercises ?? 0 },
          { label: '% Acierto',       value: `${accuracy}%` },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Datos personales</CardTitle>
            <Badge variant={profile.role === 'teacher' ? 'default' : 'secondary'}>
              {profile.role === 'teacher' ? 'Profesor' : profile.role === 'admin' ? 'Admin' : 'Alumno'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Miembro desde</p>
            <p className="font-medium capitalize">
              {format(new Date(profile.created_at), "d 'de' MMMM yyyy", { locale: es })}
            </p>
          </div>
          <Separator />
          <ProfileEditor profile={profile} />
        </CardContent>
      </Card>
    </div>
  )
}
