import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkCompliance, ComplianceResult } from '@/lib/riskEngine';
import { storeComplianceCheck } from '@/lib/complianceStore';

const complianceRequestSchema = z.object({
  wallet: z.string().min(1, 'Wallet address is required'),
  amount: z.number().optional(),
  token: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = complianceRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0]?.message || 'Invalid request' },
        { status: 400 }
      );
    }
    
    const { wallet } = validationResult.data;
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
