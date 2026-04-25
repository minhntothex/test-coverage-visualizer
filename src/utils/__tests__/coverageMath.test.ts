import {
  calculateCoverage,
  extractUncoveredLines,
  sortByLowestCoverage,
} from '../coverageMath';
import { FileCoverage } from '../../types/coverage';

describe('coverage math', () => {
  it('calculates coverage percentage from hit and total lines', () => {
    expect(calculateCoverage(3, 4)).toBe(75);
    expect(calculateCoverage(1, 3)).toBe(33.33);
  });

  it('treats files with no tracked lines as fully covered', () => {
    expect(calculateCoverage(0, 0)).toBe(100);
  });

  it('extracts uncovered lines in ascending order', () => {
    const lineHits = new Map<number, number>([
      [12, 0],
      [3, 1],
      [8, 0],
    ]);

    expect(extractUncoveredLines(lineHits)).toEqual([8, 12]);
  });

  it('sorts files by lowest coverage first', () => {
    const files: FileCoverage[] = [
      {
        path: 'good.ts',
        coverage: 90,
        totalLines: 10,
        hitLines: 9,
        uncoveredLines: [8],
      },
      {
        path: 'bad.ts',
        coverage: 25,
        totalLines: 4,
        hitLines: 1,
        uncoveredLines: [1, 2, 3],
      },
    ];

    expect(sortByLowestCoverage(files).map((file) => file.path)).toEqual([
      'bad.ts',
      'good.ts',
    ]);
  });
});
