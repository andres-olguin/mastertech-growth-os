export interface ScoringCriteria {
  industryMatch: boolean;     // +20
  locationMatch: boolean;     // +15
  needDetected: boolean;      // +25
  budgetQualified: boolean;   // +20
  priorEngagement: boolean;   // +10
  favorableTiming: boolean;   // +10
}

export interface ScoringResult {
  score: number;
  priority: 'CRITICAL_HOT' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export function calculateLeadScore(criteria: ScoringCriteria): ScoringResult {
  let score = 0;

  if (criteria.industryMatch) score += 20;
  if (criteria.locationMatch) score += 15;
  if (criteria.needDetected) score += 25;
  if (criteria.budgetQualified) score += 20;
  if (criteria.priorEngagement) score += 10;
  if (criteria.favorableTiming) score += 10;

  let priority: ScoringResult['priority'] = 'LOW';
  if (score >= 90) priority = 'CRITICAL_HOT';
  else if (score >= 70) priority = 'HIGH';
  else if (score >= 40) priority = 'MEDIUM';

  return { score, priority };
}