'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle2, XCircle, TrendingUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { ComplianceResult } from '@/lib/riskEngine'

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return <Badge variant="safe">APPROVED</Badge>
    case 'WARNING':
      return <Badge variant="warning">WARNING</Badge>
    case 'BLOCKED':
      return <Badge variant="blocked">BLOCKED</Badge>
    default:
      return null
  }
}

const formatWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    walletsScreened: 1247,
    approvedRate: 94.2,
    blocked: 83,
    volumeProtected: 2400000,
  })
  const [recentChecks, setRecentChecks] = useState<ComplianceResult[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats)
          setRecentChecks(data.recentChecks || [])
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }
    
    fetchDashboardData()
    // Refresh every 5 seconds
    const interval = setInterval(fetchDashboardData, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Compliance Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Real-time compliance metrics and wallet screening results
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallets Screened Today</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.walletsScreened.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-safe" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-safe">{stats.approvedRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(stats.walletsScreened * stats.approvedRate / 100).toLocaleString()} approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked</CardTitle>
              <XCircle className="h-4 w-4 text-blocked" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blocked">{stats.blocked}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((stats.blocked / stats.walletsScreened) * 100).toFixed(1)}% blocked
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume Protected</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(stats.volumeProtected / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total transaction volume
              </p>
            </CardContent>
          </Card>
        </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Compliance Checks</CardTitle>
              <CardDescription>
                Eternal Compliance Ledger (Arweave-backed) • All compliance decisions are permanently recorded
              </CardDescription>
            </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Arweave Proof</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentChecks.length > 0 ? (
                  recentChecks.map((item) => (
                    <TableRow key={item.wallet} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <Link
                          href={`/wallet/${item.wallet}`}
                          className="text-primary hover:underline font-mono"
                        >
                          {formatWalletAddress(item.wallet)}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{item.finalScore}/100</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.arweaveTx ? (
                          <a
                            href={`https://arweave.net/${item.arweaveTx}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-safe hover:underline text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>View</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-sm">Pending</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(item.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No compliance checks yet. Try the <Link href="/demo" className="text-primary hover:underline">Live Demo</Link> to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
