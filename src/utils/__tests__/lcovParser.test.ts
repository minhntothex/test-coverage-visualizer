import { parseLcov } from '../lcovParser';

describe('parseLcov', () => {
  it('parses file coverage records from lcov content', () => {
    const result = parseLcov(`
TN:
SF:src/auth/login.ts
DA:1,1
DA:2,0
DA:3,3
LF:3
LH:2
end_of_record
SF:src/App.tsx
DA:10,0
DA:12,0
end_of_record
`);

    expect(result).toEqual([
      {
        path: 'src/auth/login.ts',
        coverage: 66.67,
        totalLines: 3,
        hitLines: 2,
        uncoveredLines: [2],
      },
      {
        path: 'src/App.tsx',
        coverage: 0,
        totalLines: 2,
        hitLines: 0,
        uncoveredLines: [10, 12],
      },
    ]);
  });

  it('keeps a final record even without end_of_record', () => {
    expect(parseLcov('SF:src/index.ts\nDA:1,1')).toEqual([
      {
        path: 'src/index.ts',
        coverage: 100,
        totalLines: 1,
        hitLines: 1,
        uncoveredLines: [],
      },
    ]);
  });
});
