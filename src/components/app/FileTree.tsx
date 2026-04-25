import { useMemo } from 'react';
import { FileTreeView } from './FileTreeView';
import { FileCoverage } from '../../types/coverage';
import { buildCoverageTree } from '../../utils/tree';

type FileTreeProps = {
  files: FileCoverage[];
  selectedPath: string | null;
  onSelectFile: (path: string) => void;
};

export function FileTree({ files, selectedPath, onSelectFile }: FileTreeProps) {
  const tree = useMemo(() => buildCoverageTree(files), [files]);

  return (
    <FileTreeView
      files={files}
      onSelectFile={onSelectFile}
      selectedPath={selectedPath}
      tree={tree}
    />
  );
}
