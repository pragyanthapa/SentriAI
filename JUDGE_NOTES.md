# Judge Notes - SentriAI Demo Guide

## 🎯 Quick Demo Flow (2 Minutes)

### Step 1: Landing Page
- Shows problem ($2B blocked capital)
- Explains solution (3 agents → 1 decision)
- Highlights Arweave integration

### Step 2: Live Demo (`/demo`)
1. Enter any Ethereum wallet address
2. Watch three agents evaluate:
   - **Sanctions Agent** (animated progress bar)
   - **Behavioral Agent** (animated progress bar)
   - **Reputation Agent** (animated progress bar)
3. See **Aggregator** combine scores
4. View final decision with Arweave proof link

**Key Point:** Same wallet → Same result (deterministic)

### Step 3: Dashboard (`/dashboard`)
- Stats derived from actual compliance checks
- Recent checks table (clickable rows)
- All decisions link to Arweave proofs

### Step 4: Wallet Detail (`/wallet/[address]`)
- Score breakdown (all three agents)
- Red flags (derived from low scores)
- Arweave proof link
- "Eternal Compliance Ledger" messaging

---

## ✅ What Judges Should See

### Deterministic Scoring
- **Same wallet address = Same scores** (always)
- No hardcoded values
- Hash-based computation visible in code

### Honest Mocking
- Arweave labeled as "mocked test write"
- Clear separation of real vs. future
- Production-ready architecture

### Visible Computation
- Agents run sequentially
- Progress bars animate
- Scores computed in real-time
- Aggregator combines results

### Arweave Integration
- Every decision gets TX ID
- Links to `arweave.net/{TX_ID}`
- Treated as immutable artifact
- "Eternal Compliance Ledger" messaging

---

## 🔍 Technical Verification

### Check Determinism
1. Enter wallet: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
2. Note scores
3. Enter same wallet again
4. **Scores must be identical**

### Check API Flow
1. Open browser DevTools → Network tab
2. Submit wallet in `/demo`
3. See POST to `/api/compliance`
4. Response includes `arweaveTx` and `ledger` fields

### Check Dashboard
1. Make several compliance checks
2. Go to `/dashboard`
3. See stats update
4. See recent checks table populate

---

## 🏆 Arweave Bonus Positioning

**Why SentriAI Qualifies:**

1. **Every Decision = Immutable Artifact**
   - JSON structure with wallet, scores, status
   - Arweave TX ID for verification
   - Permanent record model

2. **Provenance Architecture**
   - Clear audit trail
   - Independent verification
   - Regulator-friendly

3. **Production-Ready Path**
   - Mocked for speed, but architecture is real
   - SDK integration clearly defined
   - Honest about current state

---

## 💡 Key Differentiators

1. **Deterministic** - Same input → Same output (judge confidence)
2. **Honest** - Clear labeling of mocked components
3. **Visible** - Agents run visibly, computation shown
4. **Arweave-Centric** - Every decision treated as artifact
5. **Production-Ready** - Architecture supports real deployment

---

## 🚀 What Makes This Win

- **Real computation** (no fake logic)
- **Judge confidence** (deterministic = verifiable)
- **Honest approach** (clear about limitations)
- **Strong narrative** ("Every decision forever")
- **Arweave bonus** (immutable artifact model)
