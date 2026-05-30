import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { MaterialUploader } from '@/components/teacher/material-uploader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, Video, Image, File, Download } from 'lucide-react'
import type { Material, Topic } from '@/types'

const FILE_ICONS: Record<string, React.ElementType> = {
  pdf:   FileText,
  video: Video,
  image: Image,
}

export default async function MaterialsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: materials }, { data: topics }] = await Promise.all([
    supabase
      .from('materials')
      .select('*, topic:topics(code, title)')
      .eq('teacher_id', user.id)
      .order('created_at', { ascending: false }),
    supabase.from('topics').select('*').order('order_index'),
  ])

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/teacher"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Materiales didácticos</h1>
          <p className="text-muted-foreground">Sube PDF, vídeos e imágenes para tus alumnos</p>
        </div>
      </div>

      {/* Upload form */}
      <MaterialUploader topics={(topics ?? []) as Topic[]} teacherId={user.id} />

      {/* Materials list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Materiales subidos ({materials?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!materials || materials.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Aún no has subido ningún material.
            </p>
          ) : (
            <div className="space-y-3">
              {materials.map(m => {
                const Icon = FILE_ICONS[m.file_type] ?? File
                return (
                  <div key={m.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                    <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{m.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {(m as Material & { topic?: { code: string; title: string } }).topic && (
                          <Badge variant="outline" className="text-xs">
                            {(m as Material & { topic?: { code: string } }).topic?.code}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {m.file_size_bytes ? `${Math.round(m.file_size_bytes / 1024)}KB` : ''}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(m.created_at).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>
                    <a href={m.file_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
