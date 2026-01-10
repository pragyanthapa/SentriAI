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

export function hashScore(input: string, seed: number): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i) + seed;
    hash |= 0;
  }
  return Math.abs(hash % 101);
}

export function evaluateCompliance(wallet: string): ComplianceResult {
  const normalized = wallet.toLowerCase().trim();
  
  const sanctions = hashScore(normalized, 11);
  const behavioral = hashScore(normalized, 29);
  const reputation = hashScore(normalized, 53);

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

export function generateArweaveTx(): string {
  const uuid = crypto.randomUUID().replace(/-/g, "");
  return `AR_${uuid}`;
}

export function checkCompliance(wallet: string): ComplianceResult {
  const result = evaluateCompliance(wallet);
  
  result.arweaveTx = generateArweaveTx();
   result.ledger = "Arweave (mocked test write)";
  
  return result;
}
