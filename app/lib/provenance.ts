import { createHash } from 'crypto';
import type { ComplianceResult } from './riskEngine';

export interface ProvenancePayload {
  protocol: 'SentriAI';
  wallet: string;
  sanctionsScore: number;
  behavioralScore: number;
  reputationScore: number;
  finalScore: number;
  status: 'APPROVED' | 'WARNING' | 'BLOCKED';
  deterministicHash: string;
}

export interface ProvenanceRecord {
  payload: ProvenancePayload;
  arweaveTx: string; 
}

export function createProvenancePayload(result: ComplianceResult): ProvenancePayload {
  const payloadData = {
    protocol: 'SentriAI' as const,
    wallet: result.wallet, 
    sanctionsScore: result.sanctionsScore, 
    behavioralScore: result.behavioralScore,
    reputationScore: result.reputationScore, 
    finalScore: result.finalScore,
    status: result.status,
  };
  const sortedKeys = Object.keys(payloadData).sort();
  const sortedPayload: Record<string, unknown> = {};
  for (const key of sortedKeys) {
    sortedPayload[key] = payloadData[key as keyof typeof payloadData];
  }
  const payloadJson = JSON.stringify(sortedPayload);
  const hash = createHash('sha256').update(payloadJson, 'utf8').digest('hex');
  return {
    ...payloadData,
    deterministicHash: hash, 
  };
}

export function generateArweaveTxFromPayload(payload: ProvenancePayload): string {
  const hash = payload.deterministicHash;
  return `AR_${hash.substring(0, 43)}`;
}

export function createProvenanceRecord(result: ComplianceResult): ProvenanceRecord {
  const payload = createProvenancePayload(result);
    const arweaveTx = generateArweaveTxFromPayload(payload);
  return {
    payload,
    arweaveTx,
  };
}