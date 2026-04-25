export type FileCoverage = {
  path: string;
  coverage: number;
  totalLines: number;
  hitLines: number;
  uncoveredLines: number[];
};

export type CoverageSummary = {
  files: FileCoverage[];
  averageCoverage: number;
  totalLines: number;
  hitLines: number;
  lowCoverageCount: number;
};

export type CoverageLevel = 'high' | 'medium' | 'low';

export type CoverageFileStatus = {
  fileName: string;
  fileSize: number;
};

export type TreeNode = {
  name: string;
  path: string;
  type: 'folder' | 'file';
  coverage?: FileCoverage;
  children: TreeNode[];
};
