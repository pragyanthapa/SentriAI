import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Link from 'next/link'
import { Shield, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SentriAI - DeFi\'s Autonomous Compliance Sentinel',
  description: 'Every wallet checked. Every decision forever.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-safe" />
              <span className="text-xl font-bold">SentriAI</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
                Live Demo
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-border/40 mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>Built for Amadeus Genesis Hack • Verified forever on the Eternal Compliance Ledger</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
