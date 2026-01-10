'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Shield, ExternalLink, CheckCircle2, AlertTriangle, XCircle, Loader2 } from 'lucide-react'
import type { ComplianceResult } from '@/lib/riskEngine'

export default function DemoPage() {
  const [wallet, setWallet] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ComplianceResult | null>(null)
  const [animationProgress, setAnimationProgress] = useState({
    sanctions: 0,
    behavioral: 0,
    reputation: 0,
    final: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet.trim()) return

    setLoading(true)
    setResult(null)
    setAnimationProgress({ sanctions: 0, behavioral: 0, reputation: 0, final: 0 })

    try {
      const response = await fetch('/api/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: wallet.trim() }),
      })

      if (!response.ok) {
        throw new Error('Compliance check failed')
      }

      const data: ComplianceResult = await response.json()
            const animate = (key: keyof typeof animationProgress, target: number, delay: number) => {
        setTimeout(() => {
          const interval = setInterval(() => {
            setAnimationProgress((prev: typeof animationProgress) => {
              const current = prev[key]
              if (current >= target) {
                clearInterval(interval)
                return { ...prev, [key]: target }
              }
              return { ...prev, [key]: Math.min(current + 2, target) }
            })
          }, 30)
        }, delay)
      }

      animate('sanctions', data.sanctionsScore, 200)
      animate('behavioral', data.behavioralScore, 800)
      animate('reputation', data.reputationScore, 1400)
      animate('final', data.finalScore, 2000)

      setTimeout(() => {
        setResult(data)
        setLoading(false)
      }, 2500)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle2 className="h-8 w-8 text-safe" />
      case 'WARNING':
        return <AlertTriangle className="h-8 w-8 text-warning" />
      case 'BLOCKED':
        return <XCircle className="h-8 w-8 text-blocked" />
      default:
        return null
    }
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

  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Live Compliance Demo</h1>
          <p className="text-xl text-muted-foreground">
            Enter any wallet address to see SentriAI's deterministic agents in action
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
            <span>Try any Ethereum address, or examples:</span>
            <button
              onClick={() => setWallet('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')}
              className="underline hover:text-foreground"
            >
              0x742d35...
            </button>
            <span>•</span>
            <button
              onClick={() => setWallet('0x8ba1f109551bD432803012645Hac136c22C1729')}
              className="underline hover:text-foreground"
            >
              0x8ba1f1...
            </button>
            <span>•</span>
            <button
              onClick={() => setWallet('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')}
              className="underline hover:text-foreground"
            >
              0x1f9840...
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Same wallet → Same result (deterministic scoring)
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Wallet Compliance Check</CardTitle>
            <CardDescription>
              Enter a wallet address to perform a comprehensive compliance analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="0x..."
                  value={wallet}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWallet(e.target.value)}
                  disabled={loading}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading || !wallet.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    'Check Compliance'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {(loading || result) && (
          <Card>
            <CardHeader>
              <CardTitle>Compliance Evaluation</CardTitle>
              <CardDescription>
                Three autonomous agents computing scores deterministically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Sanctions Agent</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {result ? `${result.sanctionsScore}/100` : `${animationProgress.sanctions}/100`}
                  </span>
                </div>
                <Progress value={result ? result.sanctionsScore : animationProgress.sanctions} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Behavioral Agent</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {result ? `${result.behavioralScore}/100` : `${animationProgress.behavioral}/100`}
                  </span>
                </div>
                <Progress value={result ? result.behavioralScore : animationProgress.behavioral} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Reputation Agent</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {result ? `${result.reputationScore}/100` : `${animationProgress.reputation}/100`}
                  </span>
                </div>
                <Progress value={result ? result.reputationScore : animationProgress.reputation} className="h-2" />
              </div>
              {result && (
                <div className="pt-6 border-t border-border">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">Aggregator</span>
                      </div>
                      <span className="text-lg font-bold">
                        {result.finalScore}/100
                      </span>
                    </div>
                    <Progress value={result.finalScore} className="h-3" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {result && (
          <>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">FINAL RESULT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="text-3xl font-bold">
                        {result.finalScore}/100 → {result.status}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Wallet: {result.wallet}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div>
                      <div className="text-sm font-medium">Immutable compliance record created</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Eternal Compliance Ledger (Arweave-backed)
                      </div>
                      {result.ledger && (
                        <div className="text-xs text-muted-foreground mt-1 italic">
                          {result.ledger}
                        </div>
                      )}
                    </div>
                    {result.arweaveTx && (
                      <a
                        href={`https://arweave.net/${result.arweaveTx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-safe hover:underline"
                      >
                        <span className="text-sm font-medium">View Arweave Proof</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{result.sanctionsScore}</div>
                    <div className="text-xs text-muted-foreground mt-1">Sanctions (50%)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{result.behavioralScore}</div>
                    <div className="text-xs text-muted-foreground mt-1">Behavioral (30%)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{result.reputationScore}</div>
                    <div className="text-xs text-muted-foreground mt-1">Reputation (20%)</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border text-center">
                  <div className="text-sm text-muted-foreground">Final Score</div>
                  <div className="text-4xl font-bold mt-2">
                    {result.finalScore}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Status: {result.status}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  )
}
