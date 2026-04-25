import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { CoverageUploadView } from './CoverageUploadView';
import { CoverageFileStatus } from '../../types/coverage';

type CoverageUploadProps = {
  fileStatus: CoverageFileStatus | null;
  error: string | null;
  loading: boolean;
  onUpload: (file: File) => void;
};

export function CoverageUpload({
  fileStatus,
  error,
  loading,
  onUpload,
}: CoverageUploadProps) {
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

  function handleDragLeave(): void {
    setDragActive(false);
  }

  return (
    <CoverageUploadView
      dragActive={dragActive}
      error={error}
      fileStatus={fileStatus}
      inputRef={inputRef}
      loading={loading}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onInputChange={handleInputChange}
      onOpenFilePicker={openFilePicker}
    />
  );
}
