import { CoveragePageView } from './CoveragePageView';
import { useCoverageUpload } from '../hooks/useCoverageUpload';

export function CoveragePage() {
  const {
    error,
    fileStatus,
    files,
    loading,
    selectedFile,
    selectedPath,
    summary,
    selectFile,
    uploadFile,
  } = useCoverageUpload();

  return (
    <CoveragePageView
      error={error}
      fileStatus={fileStatus}
      files={files}
      loading={loading}
      onSelectFile={selectFile}
      onUpload={uploadFile}
      selectedFile={selectedFile}
      selectedPath={selectedPath}
      summary={summary}
    />
  );
}
