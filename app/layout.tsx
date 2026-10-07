import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vinicius Ribeiro | Corretor de Imóveis',
  description: 'Encontre seu próximo endereço em Araçatuba e região com Vinicius Ribeiro, corretor de imóveis CRECI/SP 307447-F. Compra, venda, locação e consultoria imobiliária.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0d0c',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
