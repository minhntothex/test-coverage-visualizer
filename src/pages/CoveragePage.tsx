import { CoveragePageView } from './CoveragePageView';
import { useCoverageUpload } from '../hooks/useCoverageUpload';
import { useState } from 'react';

export function CoveragePage() {
  const [showResults, setShowResults] = useState(false);
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

  function handleUpload(file: File): void {
    setShowResults(false);
    uploadFile(file);
  }

  return (
    <CoveragePageView
      error={error}
      fileStatus={fileStatus}
      files={files}
      loading={loading}
      onSelectFile={selectFile}
      onUpload={handleUpload}
      onViewResults={() => setShowResults(true)}
      selectedFile={selectedFile}
      selectedPath={selectedPath}
      showResults={showResults}
      summary={summary}
    />
  );
}
