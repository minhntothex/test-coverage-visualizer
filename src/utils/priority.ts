const CRITICAL_FILE_PATTERNS = [
  /\/auth\//i,
  /auth\./i,
  /\/api\//i,
  /\/services?\//i,
  /\/payments?\//i,
  /\/security\//i,
  /\/utils?\//i,
];

export function isCriticalFile(path: string): boolean {
  const normalizedPath = path.replace(/\\/g, '/');
  return CRITICAL_FILE_PATTERNS.some((pattern) => pattern.test(normalizedPath));
}

export function calculatePriorityScore(
  coverage: number,
  criticalFile: boolean,
): number {
  return Number(((100 - coverage) * 0.7 + (criticalFile ? 30 : 0)).toFixed(2));
}
