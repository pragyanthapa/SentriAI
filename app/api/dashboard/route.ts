import { NextResponse } from 'next/server';
import { getAllComplianceChecks, getDashboardStats } from '@/lib/complianceStore';

export async function GET() {
  try {
    const checks = getAllComplianceChecks();
    const stats = getDashboardStats();
    
    return NextResponse.json({
      stats,
      recentChecks: checks.slice(0, 10), 
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
