import { calculatePriorityScore, isCriticalFile } from '../priority';

describe('priority scoring', () => {
  it('calculates the requested priority score formula', () => {
    expect(calculatePriorityScore(40, false)).toBe(42);
    expect(calculatePriorityScore(40, true)).toBe(72);
  });

  it('detects critical files from path patterns', () => {
    expect(isCriticalFile('src/auth/session.ts')).toBe(true);
    expect(isCriticalFile('src/components/Button.tsx')).toBe(false);
  });
});
