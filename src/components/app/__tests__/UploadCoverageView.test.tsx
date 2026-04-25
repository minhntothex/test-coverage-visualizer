import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { UploadCoverageView } from '../UploadCoverageView';
import { theme } from '../../../theme';

function renderView(overrides: Partial<React.ComponentProps<typeof UploadCoverageView>> = {}) {
  const props: React.ComponentProps<typeof UploadCoverageView> = {
    dragActive: false,
    error: null,
    fileStatus: null,
    inputRef: createRef<HTMLInputElement>(),
    loading: false,
    onCardClick: jest.fn(),
    onCardKeyDown: jest.fn(),
    onDragLeave: jest.fn(),
    onDragOver: jest.fn(),
    onDrop: jest.fn(),
    onInputChange: jest.fn(),
    onOpenFilePicker: jest.fn(),
    onViewResults: jest.fn(),
    ...overrides,
  };

  render(
    <ThemeProvider theme={theme}>
      <UploadCoverageView {...props} />
    </ThemeProvider>,
  );

  return props;
}

describe('UploadCoverageView', () => {
  it('shows the default upload prompt', () => {
    renderView();

    expect(screen.getByText('Upload Coverage Report')).toBeInTheDocument();
    expect(screen.getByText('Drag & drop your lcov.info file here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /choose file/i })).toBeInTheDocument();
  });

  it('shows drag hover copy', () => {
    renderView({ dragActive: true });

    expect(screen.getByText('Drop file to upload')).toBeInTheDocument();
  });

  it('shows success actions and opens results from the green action', () => {
    const onViewResults = jest.fn();
    const onOpenFilePicker = jest.fn();

    renderView({
      fileStatus: {
        fileName: 'lcov.info',
        fileSize: 1300234,
      },
      onOpenFilePicker,
      onViewResults,
    });

    expect(screen.getByText('lcov.info')).toBeInTheDocument();
    expect(screen.getByText('1.2 MB')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /view results/i }));
    expect(onViewResults).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /upload another file/i }));
    expect(onOpenFilePicker).toHaveBeenCalledTimes(1);
  });

  it('shows the error state message', () => {
    renderView({ error: 'Upload an .info coverage file.' });

    expect(screen.getByText('Invalid file type.')).toBeInTheDocument();
    expect(screen.getByText('Please upload an lcov.info file.')).toBeInTheDocument();
  });
});
