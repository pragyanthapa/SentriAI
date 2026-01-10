import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Database, Zap, TrendingUp, ExternalLink, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-muted border border-border">
            <Shield className="h-4 w-4 text-safe" />
            <span className="text-sm font-medium">DeFi Compliance Sentinel</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            SENTRI AI
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
            DeFi's Autonomous Compliance Sentinel
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto pt-4">
            Every decision verified. Every action remembered. Forever.
          </p>
          <div className="pt-8">
            <Link href="/demo">
              <Button size="lg" className="text-lg px-8 py-6">
                View Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Problem</h2>
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-2xl">$2B Institutional Capital Blocked</CardTitle>
              <CardDescription className="text-lg">
                Institutional DeFi adoption is blocked by compliance uncertainty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Traditional compliance checks are opaque, reversible, and create trust gaps. 
                Institutions need certainty: once a wallet is approved, that decision must be immutable. 
                Current solutions fail because they rely on centralized databases that can be modified, 
                creating regulatory risk and blocking billions in institutional capital.
              </p>
              <div className="pt-4 text-4xl font-bold text-destructive">
                $2,000,000,000
              </div>
              <p className="text-sm text-muted-foreground">Capital blocked from DeFi due to compliance risk</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Solution</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-safe/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-safe" />
                </div>
                <CardTitle>3 Autonomous Agents</CardTitle>
                <CardDescription>Sanctions • Behavioral • Reputation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Three deterministic AI agents analyze every wallet independently, 
                  producing objective compliance scores.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>1 Irreversible Decision</CardTitle>
                <CardDescription>Immutable • Verifiable • Final</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Aggregated scores produce a single compliance verdict that cannot be 
                  changed, reversed, or disputed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6" />
                </div>
                <CardTitle>Eternal Proof</CardTitle>
                <CardDescription>Arweave • Permanent • Auditable</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every compliance decision is written to Arweave, creating an eternal 
                  ledger that outlives any protocol or institution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 border-t border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Eternal Compliance Ledger</h2>
          <Card className="border-safe/20 bg-safe/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <Database className="h-6 w-6 text-safe" />
                <span>Eternal Compliance Ledger (Arweave-backed)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Every compliance decision is permanently stored on Arweave, the decentralized 
                permanent storage network. This creates an immutable audit trail that regulators, 
                auditors, and institutions can verify independently—forever.
              </p>
              <p className="text-sm font-medium text-safe">
                Once Written, Even SentriAI Cannot Erase It
              </p>
              <div className="pt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-safe"></div>
                  <span>Immutable: Decisions cannot be changed or deleted</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-safe"></div>
                  <span>Verifiable: Public proof for every wallet check</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-safe"></div>
                  <span>Permanent: Stored for 200+ years minimum</span>
                </div>
              </div>
              <div className="pt-4">
                <code className="block p-4 bg-background rounded border border-border text-sm">
                  {`{`}
                  <br />{`  "wallet": "0x...",`}
                  <br />{`  "finalScore": 82,`}
                  <br />{`  "status": "APPROVED",`}
                  <br />{`  "arweaveTx": "AR_...",`}
                  <br />{`  "ledger": "Arweave (mocked test write)",`}
                  <br />{`  "timestamp": "2024-01-15T...",`}
                  <br />{`  "protocol": "SentriAI"`}
                  <br />{`}`}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Powered by Amadeus</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Zap className="h-6 w-6 text-warning mb-4" />
                <CardTitle>WASM Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deterministic compliance logic runs as WebAssembly agents, 
                  ensuring consistent, verifiable results across all nodes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-6 w-6 text-safe mb-4" />
                <CardTitle>State Proofs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cryptographic proofs validate every state transition, creating 
                  an audit trail that regulators can independently verify.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Database className="h-6 w-6 mb-4" />
                <CardTitle>Oracle Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time sanctions data flows through Amadeus oracle streams, 
                  keeping compliance checks current and accurate.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">🔮 uPoW (Future Enhancement)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Future versions will leverage Amadeus's Universal Proof of Work (uPoW) 
                for autonomous enforcement, where non-compliant wallets are automatically 
                blocked at the protocol level—no human intervention required.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 border-t border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Economics</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <TrendingUp className="h-6 w-6 text-safe mb-4" />
                <CardTitle>Pricing Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">$5K–$50K</div>
                  <div className="text-sm text-muted-foreground">per protocol / month</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tiered pricing based on transaction volume and compliance requirements.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-6 w-6 text-safe mb-4" />
                <CardTitle>Market Opportunity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">$4.3M ARR</div>
                  <div className="text-sm text-muted-foreground">$1B volume × 15bps</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conservative estimate assuming 15 basis points on $1B in protected volume.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="border-safe/20">
            <CardHeader>
              <CardTitle>Total Addressable Market</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                With $2B in institutional capital currently blocked from DeFi, SentriAI addresses 
                a massive compliance gap. As regulatory clarity improves and institutional adoption 
                accelerates, the addressable market expands exponentially.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 border-t border-border/40">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to See It In Action?</h2>
          <p className="text-xl text-muted-foreground">
            Experience the future of DeFi compliance
          </p>
          <Link href="/demo">
            <Button size="lg" className="text-lg px-8 py-6">
              Launch Live Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
