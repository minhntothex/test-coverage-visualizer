import { ChangeEvent, DragEvent, KeyboardEvent, useRef, useState } from 'react';
import { CoverageFileStatus } from '../../types/coverage';
import { UploadCoverageView } from './UploadCoverageView';

type UploadCoverageProps = {
  fileStatus: CoverageFileStatus | null;
  error: string | null;
  loading: boolean;
  onUpload: (file: File) => void;
  onViewResults: () => void;
};

export function UploadCoverage({
  fileStatus,
  error,
  loading,
  onUpload,
  onViewResults,
}: UploadCoverageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  function openFilePicker(): void {
    inputRef.current?.click();
  }

  function handleFile(file: File | undefined): void {
    if (file) {
      onUpload(file);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    handleFile(event.target.files?.[0]);
    event.target.value = '';
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setDragActive(false);
    handleFile(event.dataTransfer.files[0]);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>): void {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDragActive(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFilePicker();
    }
  }

  return (
    <UploadCoverageView
      dragActive={dragActive}
      error={error}
      fileStatus={fileStatus}
      inputRef={inputRef}
      loading={loading}
      onCardClick={openFilePicker}
      onCardKeyDown={handleKeyDown}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onInputChange={handleInputChange}
      onOpenFilePicker={openFilePicker}
      onViewResults={onViewResults}
    />
  );
}
