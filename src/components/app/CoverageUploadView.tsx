import { ChangeEvent, DragEvent, RefObject } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Alert, Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { CoverageFileStatus } from '../../types/coverage';
import { formatFileSize } from '../../utils/fileValidation';

type CoverageUploadViewProps = {
  dragActive: boolean;
  error: string | null;
  fileStatus: CoverageFileStatus | null;
  inputRef: RefObject<HTMLInputElement>;
  loading: boolean;
  onDragLeave: () => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpenFilePicker: () => void;
};

export function CoverageUploadView({
  dragActive,
  error,
  fileStatus,
  inputRef,
  loading,
  onDragLeave,
  onDragOver,
  onDrop,
  onInputChange,
  onOpenFilePicker,
}: CoverageUploadViewProps) {
  return (
    <Stack spacing={2}>
      <Box
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        sx={{
          alignItems: 'center',
          bgcolor: dragActive ? 'primary.50' : 'background.paper',
          border: '1px dashed',
          borderColor: dragActive ? 'primary.main' : 'divider',
          borderRadius: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-between',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Stack direction="row" spacing={2} sx={{ minWidth: 0 }}>
          <UploadFileIcon color="primary" sx={{ mt: 0.25 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={700}>Upload lcov.info</Typography>
            <Typography color="text.secondary" noWrap={false} variant="body2">
              Drag an .info file here or choose one from disk.
            </Typography>
            {fileStatus && (
              <Typography color="text.secondary" sx={{ mt: 0.75 }} variant="body2">
                {fileStatus.fileName} · {formatFileSize(fileStatus.fileSize)}
              </Typography>
            )}
          </Box>
        </Stack>
        <Button
          fullWidth={false}
          onClick={onOpenFilePicker}
          startIcon={<UploadFileIcon />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          variant="contained"
        >
          Choose file
        </Button>
        <input
          ref={inputRef}
          accept=".info"
          hidden
          onChange={onInputChange}
          type="file"
        />
      </Box>
      {loading && <LinearProgress />}
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
