'use client'

import { useState, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, FileText } from 'lucide-react'
import type { Topic } from '@/types'

interface Props {
  topics: Topic[]
  teacherId: string
}

const MAX_SIZE_MB = 50

export function MaterialUploader({ topics, teacherId }: Props) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [pending, startTransition] = useTransition()
  const [title, setTitle]       = useState('')
  const [topicId, setTopicId]   = useState('')
  const [description, setDesc]  = useState('')
  const [file, setFile]         = useState<File | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [success, setSuccess]   = useState(false)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setError(null)
    if (f && f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`El archivo no puede superar ${MAX_SIZE_MB}MB.`)
      return
    }
    setFile(f)
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !title.trim()) return
    setError(null)

    startTransition(async () => {
      const supabase = createClient()
      const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
      const path     = `${teacherId}/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('materials')
        .upload(path, file, { upsert: false })

      if (uploadError) {
        setError('Error al subir el archivo: ' + uploadError.message)
        return
      }

      const { data: urlData } = supabase.storage.from('materials').getPublicUrl(path)

      const fileType = file.type.startsWith('video') ? 'video'
        : file.type === 'application/pdf' ? 'pdf'
        : file.type.startsWith('image') ? 'image'
        : 'other'

      const { error: dbError } = await supabase.from('materials').insert({
        teacher_id:      teacherId,
        topic_id:        topicId || null,
        title:           title.trim(),
        description:     description.trim() || null,
        file_path:       path,
        file_url:        urlData.publicUrl,
        file_type:       fileType,
        file_size_bytes: file.size,
        is_public:       true,
      })

      if (dbError) {
        setError('Error al guardar el material: ' + dbError.message)
        return
      }

      setSuccess(true)
      setTitle('')
      setTopicId('')
      setDesc('')
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
      setTimeout(() => setSuccess(false), 3000)
      router.refresh()
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Upload className="h-4 w-4" /> Subir nuevo material
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          {error   && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
          {success && <div className="text-sm text-green-700 bg-green-50 p-3 rounded-md">¡Material subido correctamente!</div>}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mat-title">Título *</Label>
              <Input
                id="mat-title"
                placeholder="Ej: Formulario de termodinámica"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mat-topic">Tema (opcional)</Label>
              <select
                id="mat-topic"
                value={topicId}
                onChange={e => setTopicId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Sin tema asociado</option>
                {topics.map(t => (
                  <option key={t.id} value={t.id}>{t.code} – {t.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mat-desc">Descripción (opcional)</Label>
            <Input
              id="mat-desc"
              placeholder="Breve descripción del contenido…"
              value={description}
              onChange={e => setDesc(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mat-file">Archivo * (máx. {MAX_SIZE_MB}MB)</Label>
            <div className="flex items-center gap-3">
              <input
                ref={fileRef}
                id="mat-file"
                type="file"
                accept=".pdf,.mp4,.mov,.jpg,.jpeg,.png,.gif"
                onChange={handleFile}
                className="flex-1 text-sm"
                required
              />
              {file && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = '' }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {file && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                {file.name} · {Math.round(file.size / 1024)}KB
              </p>
            )}
          </div>

          <Button type="submit" disabled={pending || !file || !title.trim()} className="w-full">
            {pending ? 'Subiendo…' : 'Subir material'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
