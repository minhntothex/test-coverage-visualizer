import { FileCoverage } from '../types/coverage';

export function calculateCoverage(hitLines: number, totalLines: number): number {
  if (totalLines <= 0) {
    return 100;
  }

  return Number(((hitLines / totalLines) * 100).toFixed(2));
}

export function extractUncoveredLines(lineHits: Map<number, number>): number[] {
  return Array.from(lineHits.entries())
    .filter(([, hits]) => hits === 0)
    .map(([lineNumber]) => lineNumber)
    .sort((a, b) => a - b);
}

export function sortByLowestCoverage(files: FileCoverage[]): FileCoverage[] {
  return [...files].sort((a, b) => {
    if (a.coverage !== b.coverage) {
      return a.coverage - b.coverage;
    }

    return b.uncoveredLines.length - a.uncoveredLines.length;
  });
}

export function getCoverageLevel(coverage: number): 'high' | 'medium' | 'low' {
  if (coverage > 80) {
    return 'high';
  }

  if (coverage >= 50) {
    return 'medium';
  }

  return 'low';
}
