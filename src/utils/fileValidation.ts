export type FileValidationResult =
  | { valid: true }
  | { valid: false; message: string };

export function validateCoverageFile(file: File): FileValidationResult {
  if (!file.name.toLowerCase().endsWith('.info')) {
    return {
      valid: false,
      message: 'Upload an .info coverage file.',
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      message: 'The selected file is empty.',
    };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
