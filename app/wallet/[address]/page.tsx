'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Shield, CheckCircle2, AlertTriangle, XCircle, ExternalLink, ArrowLeft, Flag } from 'lucide-react'
import type { ComplianceResult } from '@/lib/riskEngine'
import Link from 'next/link'

export default function WalletDetailPage() {
  const params = useParams()
  const router = useRouter()
  const address = params.address as string
  const [result, setResult] = useState<ComplianceResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompliance = async () => {
      try {
        const response = await fetch('/api/compliance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wallet: address }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch compliance data')
        }

        const data: ComplianceResult = await response.json()
        setResult(data)
      } catch (error) {
        console.error('Error fetching compliance:', error)
      } finally {
        setLoading(false)
      }
    }

    if (address) {
      fetchCompliance()
    }
  }, [address])

  if (loading) {
    return (
      <main className="min-h-screen container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="text-muted-foreground">Loading compliance data...</div>
        </div>
      </main>
    )
  }

  if (!result) {
    return (
      <main className="min-h-screen container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="text-destructive mb-4">Failed to load compliance data</div>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle2 className="h-12 w-12 text-safe" />
      case 'WARNING':
        return <AlertTriangle className="h-12 w-12 text-warning" />
      case 'BLOCKED':
        return <XCircle className="h-12 w-12 text-blocked" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="safe" className="text-lg px-4 py-2">APPROVED</Badge>
      case 'WARNING':
        return <Badge variant="warning" className="text-lg px-4 py-2">WARNING</Badge>
      case 'BLOCKED':
        return <Badge variant="blocked" className="text-lg px-4 py-2">BLOCKED</Badge>
      default:
        return null
    }
  }
  const redFlags: string[] = []
  if (result.sanctionsScore < 30) {
    redFlags.push('OFAC sanctions hit detected')
  }
  if (result.behavioralScore < 30) {
    redFlags.push('Wash trading patterns identified')
  }
  if (result.reputationScore < 30) {
    redFlags.push('New wallet with no history')
  }
  if (result.sanctionsScore < 50 && result.status === 'BLOCKED') {
    redFlags.push('Multiple sanctions violations')
  }
  if (result.behavioralScore < 50 && result.status === 'BLOCKED') {
    redFlags.push('Suspicious trading behavior')
  }
  if (result.reputationScore < 50 && result.status === 'BLOCKED') {
    redFlags.push('Poor reputation history')
  }

  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-mono">{address}</CardTitle>
            <CardDescription>Compliance Analysis Report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getStatusIcon(result.status)}
                <div>
                  <div className="text-3xl font-bold">
                    Score: {result.finalScore} / 100
                  </div>
                  <div className="text-muted-foreground mt-1">
                    Status: {result.status}
                  </div>
                </div>
              </div>
              {getStatusBadge(result.status)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>
              Weighted calculation: 50% Sanctions + 30% Behavioral + 20% Reputation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Sanctions Score</span>
                  <span className="text-xs text-muted-foreground">(50% weight)</span>
                </div>
                <span className="font-bold">{result.sanctionsScore}/100</span>
              </div>
              <Progress value={result.sanctionsScore} className="h-3" />
              {result.sanctionsScore < 30 && (
                <p className="text-sm text-destructive">⚠️ Low sanctions score indicates potential OFAC violations</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Behavioral Score</span>
                  <span className="text-xs text-muted-foreground">(30% weight)</span>
                </div>
                <span className="font-bold">{result.behavioralScore}/100</span>
              </div>
              <Progress value={result.behavioralScore} className="h-3" />
              {result.behavioralScore < 30 && (
                <p className="text-sm text-destructive">⚠️ Suspicious behavioral patterns detected (wash trading)</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Reputation Score</span>
                  <span className="text-xs text-muted-foreground">(20% weight)</span>
                </div>
                <span className="font-bold">{result.reputationScore}/100</span>
              </div>
              <Progress value={result.reputationScore} className="h-3" />
              {result.reputationScore < 30 && (
                <p className="text-sm text-destructive">⚠️ New wallet with no established reputation history</p>
              )}
            </div>
            <div className="pt-4 border-t border-border">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="text-sm font-medium">Final Score Calculation:</div>
                <div className="text-sm text-muted-foreground space-y-1 font-mono">
                  <div>0.5 × {result.sanctionsScore} = {(0.5 * result.sanctionsScore).toFixed(1)}</div>
                  <div>0.3 × {result.behavioralScore} = {(0.3 * result.behavioralScore).toFixed(1)}</div>
                  <div>0.2 × {result.reputationScore} = {(0.2 * result.reputationScore).toFixed(1)}</div>
                  <div className="pt-2 border-t border-border font-bold text-foreground">
                    Total: {result.finalScore}/100
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {redFlags.length > 0 && (
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="h-5 w-5 text-destructive" />
                <span>Red Flags</span>
              </CardTitle>
              <CardDescription>Issues identified during compliance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {redFlags.map((flag, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{flag}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        <Card className="border-safe/20 bg-safe/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🧾</span>
              <span>AI Provenance Payload</span>
            </CardTitle>
            <CardDescription>
              Deterministic AI compute proof with immutable ledger record
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4 text-safe" />
                <span className="text-muted-foreground">Deterministic</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4 text-safe" />
                <span className="text-muted-foreground">Immutable</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4 text-safe" />
                <span className="text-muted-foreground">Auditable</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4 text-safe" />
                <span className="text-muted-foreground">Arweave-backed</span>
              </div>
            </div>
            
            {result.arweaveTx && (
              <>
                <div className="bg-background rounded-lg border border-border p-4 space-y-3">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Ledger Proof:</div>
                    <div className="font-mono text-sm break-all text-foreground">{result.arweaveTx}</div>
                  </div>
                  {result.ledger && (
                    <div className="text-xs text-muted-foreground pt-2 border-t border-border italic">
                      {result.ledger}
                    </div>
                  )}
                </div>
                
                <div className="bg-muted/30 rounded-lg border border-border p-4 space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Provenance Payload (JSON):</div>
                  <pre className="text-xs font-mono bg-background p-3 rounded border border-border overflow-x-auto">
{JSON.stringify({
  protocol: 'SentriAI',
  wallet: result.wallet,
  sanctionsScore: result.sanctionsScore,
  behavioralScore: result.behavioralScore,
  reputationScore: result.reputationScore,
  finalScore: result.finalScore,
  status: result.status,
}, null, 2)}
                  </pre>
                  <div className="text-xs text-muted-foreground pt-2">
                    This payload is hashed deterministically to generate the Arweave TX ID above.
                    Same wallet + same scores → same TX ID (provenance guarantee).
                  </div>
                </div>
                
                <a
                  href={`https://arweave.net/${result.arweaveTx}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">View on Arweave</span>
                  <ExternalLink className="h-4 w-4 text-safe" />
                </a>
              </>
            )}
            
            <div className="text-xs text-muted-foreground pt-2 border-t border-border space-y-1">
              <div><strong>Eternal Compliance Ledger (Arweave-backed)</strong></div>
              <div>This AI computation output is permanently recorded as an immutable artifact. The deterministic hash ensures same inputs always produce the same provenance proof, creating a verifiable audit trail for decentralized AI decisions.</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Compliance Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Protocol:</span>
              <span className="font-medium">SentriAI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timestamp:</span>
              <span className="font-medium">
                {new Date(result.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Decision:</span>
              <span className="font-medium">{result.status}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
