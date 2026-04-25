import { useMemo, useState } from 'react';
import { CoverageFileStatus, CoverageSummary, FileCoverage } from '../types/coverage';
import { createCoverageSummary } from '../utils/coverageSummary';
import { validateCoverageFile } from '../utils/fileValidation';
import { parseLcov } from '../utils/lcovParser';

type UploadState = {
  files: FileCoverage[];
  selectedPath: string | null;
  fileStatus: CoverageFileStatus | null;
  error: string | null;
  loading: boolean;
};

const initialState: UploadState = {
  files: [],
  selectedPath: null,
  fileStatus: null,
  error: null,
  loading: false,
};

export function useCoverageUpload() {
  const [state, setState] = useState<UploadState>(initialState);

  const summary: CoverageSummary = useMemo(
    () => createCoverageSummary(state.files),
    [state.files],
  );

  const selectedFile = useMemo(
    () => state.files.find((file) => file.path === state.selectedPath) ?? summary.files[0] ?? null,
    [state.files, state.selectedPath, summary.files],
  );

  async function uploadFile(file: File): Promise<void> {
    const validation = validateCoverageFile(file);

    if (!validation.valid) {
      setState((current) => ({
        ...current,
        error: validation.message,
        fileStatus: null,
      }));
      return;
    }

    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const content = await file.text();
      const parsedFiles = parseLcov(content);

      if (parsedFiles.length === 0) {
        setState((current) => ({
          ...current,
          loading: false,
          files: [],
          selectedPath: null,
          error: 'No coverage records were found in this file.',
          fileStatus: {
            fileName: file.name,
            fileSize: file.size,
          },
        }));
        return;
      }

      const sortedFiles = createCoverageSummary(parsedFiles).files;
      setState({
        files: sortedFiles,
        selectedPath: sortedFiles[0]?.path ?? null,
        fileStatus: {
          fileName: file.name,
          fileSize: file.size,
        },
        error: null,
        loading: false,
      });
    } catch {
      setState((current) => ({
        ...current,
        loading: false,
        error: 'Could not read this coverage file.',
      }));
    }
  }

  function selectFile(path: string): void {
    setState((current) => ({ ...current, selectedPath: path }));
  }

  return {
    ...state,
    summary,
    selectedFile,
    uploadFile,
    selectFile,
  };
}
