import { Box, Container, Stack, Typography } from '@mui/material';
import { CoverageOverview } from '../components/app/CoverageOverview';
import { CoverageUpload } from '../components/app/CoverageUpload';
import { FileDetail } from '../components/app/FileDetail';
import { FileTree } from '../components/app/FileTree';
import { CoverageFileStatus, CoverageSummary, FileCoverage } from '../types/coverage';

type CoveragePageViewProps = {
  error: string | null;
  fileStatus: CoverageFileStatus | null;
  files: FileCoverage[];
  loading: boolean;
  selectedFile: FileCoverage | null;
  selectedPath: string | null;
  summary: CoverageSummary;
  onSelectFile: (path: string) => void;
  onUpload: (file: File) => void;
};

export function CoveragePageView({
  error,
  fileStatus,
  files,
  loading,
  selectedFile,
  selectedPath,
  summary,
  onSelectFile,
  onUpload,
}: CoveragePageViewProps) {
  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" variant="h1">
              Test Coverage Visualizer
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.75 }}>
              Upload your coverage report and instantly see what you should test next.
            </Typography>
          </Box>

          <CoverageUpload
            error={error}
            fileStatus={fileStatus}
            loading={loading}
            onUpload={onUpload}
          />

          {files.length > 0 && <CoverageOverview summary={summary} />}

          <Box
            sx={{
              display: 'grid',
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: { xs: '1fr', md: '360px minmax(0, 1fr)' },
            }}
          >
            <FileTree files={files} onSelectFile={onSelectFile} selectedPath={selectedPath} />
            <FileDetail file={selectedFile} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
