import { formatFileSize, validateCoverageFile } from '../fileValidation';

function createFile(name: string, content = 'SF:file.ts\nDA:1,1\nend_of_record'): File {
  return new File([content], name, { type: 'text/plain' });
}

describe('file validation', () => {
  it('accepts non-empty .info files', () => {
    expect(validateCoverageFile(createFile('lcov.info'))).toEqual({ valid: true });
  });

  it('rejects files without the .info extension', () => {
    expect(validateCoverageFile(createFile('coverage.txt'))).toEqual({
      valid: false,
      message: 'Upload an .info coverage file.',
    });
  });

  it('rejects empty files', () => {
    expect(validateCoverageFile(createFile('lcov.info', ''))).toEqual({
      valid: false,
      message: 'The selected file is empty.',
    });
  });

  it('formats file sizes for display', () => {
    expect(formatFileSize(512)).toBe('512 B');
    expect(formatFileSize(2048)).toBe('2.0 KB');
  });
});
