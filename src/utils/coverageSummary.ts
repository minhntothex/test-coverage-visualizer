import { CoverageSummary, FileCoverage } from '../types/coverage';
import { sortByLowestCoverage } from './coverageMath';

export function createCoverageSummary(files: FileCoverage[]): CoverageSummary {
  const sortedFiles = sortByLowestCoverage(files);
  const totalLines = sortedFiles.reduce((sum, file) => sum + file.totalLines, 0);
  const hitLines = sortedFiles.reduce((sum, file) => sum + file.hitLines, 0);
  const averageCoverage =
    totalLines === 0 ? 100 : Number(((hitLines / totalLines) * 100).toFixed(2));

  return {
    files: sortedFiles,
    averageCoverage,
    totalLines,
    hitLines,
    lowCoverageCount: sortedFiles.filter((file) => file.coverage < 50).length,
  };
}
