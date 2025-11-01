import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CA$HIFY - Control de Gastos Retro',
  description: 'Sistema de control de gastos con estilo retro neón',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="scanline">{children}</body>
    </html>
  )
}
