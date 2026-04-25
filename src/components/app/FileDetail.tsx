import { FileDetailView } from './FileDetailView';
import { FileCoverage } from '../../types/coverage';
import { calculatePriorityScore, isCriticalFile } from '../../utils/priority';

type FileDetailProps = {
  file: FileCoverage | null;
};

export function FileDetail({ file }: FileDetailProps) {
  const criticalFile = file ? isCriticalFile(file.path) : false;
  const priorityScore = file ? calculatePriorityScore(file.coverage, criticalFile) : 0;

  return (
    <FileDetailView
      criticalFile={criticalFile}
      file={file}
      priorityScore={priorityScore}
    />
  );
}
