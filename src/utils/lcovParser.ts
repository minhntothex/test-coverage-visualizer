import { FileCoverage } from '../types/coverage';
import { calculateCoverage, extractUncoveredLines } from './coverageMath';

type MutableFileCoverage = {
  path: string;
  lineHits: Map<number, number>;
};

function createCoverage(path: string): MutableFileCoverage {
  return {
    path,
    lineHits: new Map<number, number>(),
  };
}

function toFileCoverage(file: MutableFileCoverage): FileCoverage {
  const totalLines = file.lineHits.size;
  const hitLines = Array.from(file.lineHits.values()).filter((hits) => hits > 0).length;

  return {
    path: file.path,
    coverage: calculateCoverage(hitLines, totalLines),
    totalLines,
    hitLines,
    uncoveredLines: extractUncoveredLines(file.lineHits),
  };
}

export function parseLcov(content: string): FileCoverage[] {
  const files: FileCoverage[] = [];
  let currentFile: MutableFileCoverage | null = null;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (line.startsWith('SF:')) {
      currentFile = createCoverage(line.slice(3));
      continue;
    }

    if (line.startsWith('DA:') && currentFile) {
      const [lineNumberValue, hitsValue] = line.slice(3).split(',');
      const lineNumber = Number.parseInt(lineNumberValue, 10);
      const hits = Number.parseInt(hitsValue, 10);

      if (Number.isInteger(lineNumber) && Number.isInteger(hits)) {
        currentFile.lineHits.set(lineNumber, hits);
      }

      continue;
    }

    if (line === 'end_of_record' && currentFile) {
      files.push(toFileCoverage(currentFile));
      currentFile = null;
    }
  }

  if (currentFile) {
    files.push(toFileCoverage(currentFile));
  }

  return files;
}
