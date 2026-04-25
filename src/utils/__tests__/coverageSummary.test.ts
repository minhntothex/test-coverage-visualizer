import { createCoverageSummary } from '../coverageSummary';

describe('coverage summary', () => {
  it('summarizes files and preserves lowest-coverage sorting', () => {
    const summary = createCoverageSummary([
      {
        path: 'src/ok.ts',
        coverage: 100,
        totalLines: 2,
        hitLines: 2,
        uncoveredLines: [],
      },
      {
        path: 'src/low.ts',
        coverage: 25,
        totalLines: 4,
        hitLines: 1,
        uncoveredLines: [1, 2, 3],
      },
    ]);

    expect(summary.files.map((file) => file.path)).toEqual(['src/low.ts', 'src/ok.ts']);
    expect(summary.averageCoverage).toBe(50);
    expect(summary.totalLines).toBe(6);
    expect(summary.hitLines).toBe(3);
    expect(summary.lowCoverageCount).toBe(1);
  });
});
