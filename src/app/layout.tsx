import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Método FyQ - Preparación Oposiciones Física y Química',
    template: '%s | Método FyQ',
  },
  description:
    'Plataforma de preparación para oposiciones de Física y Química. Sistema de aprendizaje adaptativo con 75 temas, 500+ ejercicios y repetición espaciada.',
  keywords: ['oposiciones', 'física', 'química', 'FyQ', 'preparación', 'academia'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
