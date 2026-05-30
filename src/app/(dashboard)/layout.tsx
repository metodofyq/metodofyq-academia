import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LayoutDashboard, BookOpen, CalendarDays, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const nav = [
  { href: '/dashboard', label: 'Hoy',      icon: LayoutDashboard },
  { href: '/topics',    label: 'Temas',    icon: BookOpen },
  { href: '/plan',      label: 'Mi plan',  icon: CalendarDays },
  { href: '/profile',   label: 'Perfil',   icon: User },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r bg-muted/30 p-4">
        <Link href="/dashboard" className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            FQ
          </div>
          <span className="font-bold">Método FyQ</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          {profile?.role === 'teacher' || profile?.role === 'admin' ? (
            <>
              <Separator className="my-2" />
              <Link
                href="/teacher"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Panel Profesor
              </Link>
            </>
          ) : null}
        </nav>

        <Separator className="my-4" />
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground px-3 truncate">
            {profile?.full_name ?? user.email}
          </p>
          <form action="/auth/signout" method="post">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-10 border-b bg-background px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">FQ</div>
            <span className="font-bold">Método FyQ</span>
          </Link>
          <div className="flex gap-1">
            {nav.map(item => (
              <Link key={item.href} href={item.href} className="p-2 rounded-md hover:bg-accent">
                <item.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
