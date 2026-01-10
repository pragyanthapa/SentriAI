import { createHash } from 'crypto';

export interface ComplianceResult {
  wallet: string;
  sanctionsScore: number;
  behavioralScore: number;  
  reputationScore: number;  
  finalScore: number;     
  status: 'APPROVED' | 'WARNING' | 'BLOCKED';
  arweaveTx?: string;
  ledger?: string;
  timestamp: string;
}

export interface RiskAgent {
  name: string;
  seed: number;
  evaluate(wallet: string): number;
}

export function hashScore(input: string, seed: number): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i) + seed;
    hash |= 0; 
  }
  return Math.abs(hash % 101); 
}

class SanctionsAgent implements RiskAgent {
  name = 'Sanctions Agent';
  seed = 11;
  
  evaluate(wallet: string): number {
    return hashScore(wallet.toLowerCase().trim(), this.seed);
  }
}

class BehavioralAgent implements RiskAgent {
  name = 'Behavioral Agent';
  seed = 29;
  
  evaluate(wallet: string): number {
    return hashScore(wallet.toLowerCase().trim(), this.seed);
  }
}

class ReputationAgent implements RiskAgent {
  name = 'Reputation Agent';
  seed = 53;
  
  evaluate(wallet: string): number {
    return hashScore(wallet.toLowerCase().trim(), this.seed);
  }
}

const sanctionsAgent = new SanctionsAgent();
const behavioralAgent = new BehavioralAgent();
const reputationAgent = new ReputationAgent();


export function evaluateCompliance(wallet: string): ComplianceResult {
  const normalized = wallet.toLowerCase().trim();
  const sanctions = sanctionsAgent.evaluate(normalized);
  const behavioral = behavioralAgent.evaluate(normalized);
  const reputation = reputationAgent.evaluate(normalized);
  const finalScore =
    0.5 * sanctions +
    0.3 * behavioral +
    0.2 * reputation;

  let status: "APPROVED" | "WARNING" | "BLOCKED";
  if (finalScore < 30) {
    status = "BLOCKED";
  } else if (finalScore < 70) {
    status = "WARNING";
  } else {
    status = "APPROVED";
  }

  return {
    wallet: normalized,
    sanctionsScore: sanctions,
    behavioralScore: behavioral,
    reputationScore: reputation,
    finalScore: Math.round(finalScore),
    status,
    timestamp: new Date().toISOString(), 
  };
}

export function generateArweaveTx(wallet: string, finalScore: number): string {
  const content = `${wallet}:${finalScore}`;
  const hash = createHash('sha256').update(content, 'utf8').digest('hex');
  return `AR_${hash.substring(0, 43)}`;
}

export function checkCompliance(wallet: string): ComplianceResult {
  const result = evaluateCompliance(wallet);
  result.arweaveTx = generateArweaveTx(result.wallet, result.finalScore);
  result.ledger = "Arweave (mocked test write)";
  return result;
}
