import { NextRequest, NextResponse } from 'next/server';
import { checkCompliance, ComplianceResult } from '@/lib/riskEngine';
import { storeComplianceCheck } from '@/lib/complianceStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallet } = body;

    if (!wallet || typeof wallet !== 'string') {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }
    const normalized = wallet.toLowerCase().trim();
    const isValidFormat = /^0x[a-fA-F0-9]{40}$/.test(normalized);
    
    if (!isValidFormat && !normalized.includes('0x')) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }
    const result: ComplianceResult = checkCompliance(normalized);
        storeComplianceCheck(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Compliance check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
