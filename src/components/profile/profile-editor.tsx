'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Profile } from '@/types'

interface Props {
  profile: Profile
}

export function ProfileEditor({ profile }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [name, setName] = useState(profile.full_name ?? '')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: name.trim() || null })
        .eq('id', profile.id)

      if (error) {
        setError('Error al guardar: ' + error.message)
      } else {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {error  && <p className="text-sm text-destructive">{error}</p>}
      {saved  && <p className="text-sm text-green-600">¡Cambios guardados!</p>}
      <div className="space-y-2">
        <Label htmlFor="profile-name">Nombre completo</Label>
        <Input
          id="profile-name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tu nombre"
        />
      </div>
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? 'Guardando…' : 'Guardar cambios'}
      </Button>
    </form>
  )
}
