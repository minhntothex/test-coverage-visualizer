import { ChangeEvent, DragEvent, KeyboardEvent, MouseEvent, RefObject } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, Button, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { CoverageFileStatus } from '../../types/coverage';
import { formatFileSize } from '../../utils/fileValidation';

type UploadCoverageViewProps = {
  dragActive: boolean;
  error: string | null;
  fileStatus: CoverageFileStatus | null;
  inputRef: RefObject<HTMLInputElement>;
  loading: boolean;
  onCardClick: () => void;
  onCardKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpenFilePicker: () => void;
  onViewResults: () => void;
};

export function UploadCoverageView({
  dragActive,
  error,
  fileStatus,
  inputRef,
  loading,
  onCardClick,
  onCardKeyDown,
  onDragLeave,
  onDragOver,
  onDrop,
  onInputChange,
  onOpenFilePicker,
  onViewResults,
}: UploadCoverageViewProps) {
  const hasError = Boolean(error);
  const hasSuccess = Boolean(fileStatus && !error);
  const Icon = hasError
    ? HighlightOffOutlinedIcon
    : hasSuccess
      ? CheckCircleOutlineIcon
      : CloudUploadOutlinedIcon;
  const iconColor = hasError
    ? '#ff1f1f'
    : hasSuccess
      ? 'success.main'
      : dragActive
        ? 'primary.main'
        : '#768193';
  const borderColor = hasError
    ? '#ff1f1f'
    : hasSuccess
      ? 'success.main'
      : dragActive
        ? 'primary.main'
        : '#9aa4b2';
  const backgroundColor = hasError
    ? 'rgba(255, 31, 31, 0.04)'
    : hasSuccess
      ? 'rgba(21, 128, 61, 0.06)'
      : dragActive
        ? 'rgba(37, 99, 235, 0.08)'
        : 'background.paper';
  const primaryText = hasError
    ? 'Invalid file type.'
    : hasSuccess
      ? fileStatus?.fileName ?? ''
      : dragActive
        ? 'Drop file to upload'
        : 'Drag & drop your lcov.info file here';
  const secondaryText = hasError
    ? 'Please upload an lcov.info file.'
    : hasSuccess && fileStatus
      ? formatFileSize(fileStatus.fileSize)
      : 'or click to browse your files';
  const buttonText = hasSuccess ? 'Upload another file' : 'Choose File';

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();
    onOpenFilePicker();
  }

  function handleViewResultsClick(event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();
    onViewResults();
  }

  return (
    <Stack alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography component="h2" fontWeight={700} variant="h2">
          Upload Coverage Report
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
          Upload your lcov.info file to visualize test coverage
        </Typography>
      </Box>
      <Paper
        aria-label="Upload lcov.info coverage file"
        aria-describedby="upload-coverage-supported-format"
        elevation={0}
        onClick={onCardClick}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onKeyDown={onCardKeyDown}
        role="button"
        tabIndex={0}
        sx={{
          alignItems: 'center',
          bgcolor: backgroundColor,
          border: '1.5px dashed',
          borderColor,
          borderRadius: 2,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { xs: 220, sm: 260 },
          outline: 'none',
          px: { xs: 1.5, sm: 5 },
          py: { xs: 2, sm: 4 },
          transition: 'background-color 160ms ease, border-color 160ms ease',
          width: '100%',
          maxWidth: { xs: '100%', sm: 520, md: 560 },
          '&:focus-visible': {
            boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.24)',
          },
        }}
      >
        <Icon sx={{ color: iconColor, fontSize: { xs: 48, sm: 64 }, mb: 2 }} />
        <Typography
          color={hasError ? '#ff1f1f' : dragActive ? 'primary.main' : 'text.primary'}
          fontWeight={700}
          sx={{ textAlign: 'center' }}
          variant="body1"
        >
          {primaryText}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }} variant="body2">
          {secondaryText}
        </Typography>
        {hasSuccess && (
          <Button
            color="success"
            onClick={handleViewResultsClick}
            sx={{
              mt: 2.5,
              px: 3,
              width: { xs: '100%', sm: 'auto' },
            }}
            variant="contained"
          >
            View results
          </Button>
        )}
        <Button
          color={hasSuccess ? 'inherit' : 'primary'}
          onClick={handleButtonClick}
          sx={{
            mt: hasSuccess ? 1.5 : 2.5,
            px: 3,
            width: { xs: '100%', sm: 'auto' },
          }}
          variant={hasSuccess ? "text" : "contained"}
        >
          {buttonText}
        </Button>
        <Typography
          color="text.secondary"
          id="upload-coverage-supported-format"
          sx={{ mt: 2.5, textAlign: 'center' }}
          variant="body2"
        >
          Supported format: .info (LCOV)
        </Typography>
        <input
          ref={inputRef}
          accept=".info"
          hidden
          onChange={onInputChange}
          type="file"
        />
      </Paper>
      {loading && <LinearProgress />}
    </Stack>
  );
}
