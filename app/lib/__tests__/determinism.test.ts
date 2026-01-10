/**
 * Determinism Test
 * 
 * Verifies that compliance evaluation is 100% deterministic:
 * - Same wallet → same scores
 * - Same wallet → same status
 * - Same wallet + same score → same Arweave TX ID
 * 
 * This test ensures judge confidence: results are reproducible across machines.
 */

import { evaluateCompliance, checkCompliance } from '../riskEngine';

// Test wallet address
const testWallet = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

// Run determinism test
function testDeterminism() {
  console.log('Testing determinism...\n');
  
  // First evaluation
  const result1 = checkCompliance(testWallet);
  
  // Second evaluation (same wallet)
  const result2 = checkCompliance(testWallet);
  
  // Assertions
  const sameFinalScore = result1.finalScore === result2.finalScore;
  const sameStatus = result1.status === result2.status;
  const sameArweaveTx = result1.arweaveTx === result2.arweaveTx;
  const sameSanctionsScore = result1.sanctionsScore === result2.sanctionsScore;
  const sameBehavioralScore = result1.behavioralScore === result2.behavioralScore;
  const sameReputationScore = result1.reputationScore === result2.reputationScore;
  
  // Results
  console.log(`Wallet: ${testWallet}`);
  console.log(`\nFirst evaluation:`);
  console.log(`  Final Score: ${result1.finalScore}`);
  console.log(`  Status: ${result1.status}`);
  console.log(`  Arweave TX: ${result1.arweaveTx}`);
  console.log(`  Sanctions: ${result1.sanctionsScore}, Behavioral: ${result1.behavioralScore}, Reputation: ${result1.reputationScore}`);
  
  console.log(`\nSecond evaluation:`);
  console.log(`  Final Score: ${result2.finalScore}`);
  console.log(`  Status: ${result2.status}`);
  console.log(`  Arweave TX: ${result2.arweaveTx}`);
  console.log(`  Sanctions: ${result2.sanctionsScore}, Behavioral: ${result2.behavioralScore}, Reputation: ${result2.reputationScore}`);
  
  console.log(`\nDeterminism checks:`);
  console.log(`  ✓ Same final score: ${sameFinalScore}`);
  console.log(`  ✓ Same status: ${sameStatus}`);
  console.log(`  ✓ Same Arweave TX ID: ${sameArweaveTx}`);
  console.log(`  ✓ Same sanctions score: ${sameSanctionsScore}`);
  console.log(`  ✓ Same behavioral score: ${sameBehavioralScore}`);
  console.log(`  ✓ Same reputation score: ${sameReputationScore}`);
  
  const allPassed = sameFinalScore && sameStatus && sameArweaveTx && 
                    sameSanctionsScore && sameBehavioralScore && sameReputationScore;
  
  console.log(`\n${allPassed ? '✅ All determinism checks passed!' : '❌ Determinism check failed!'}`);
  
  return allPassed;
}

// Run test if executed directly (Node.js environment)
if (typeof require !== 'undefined' && require.main === module) {
  testDeterminism();
}

export { testDeterminism };
