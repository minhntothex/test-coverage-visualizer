import { Box, Container, Stack, Typography } from '@mui/material';
import { CoverageOverview } from '../components/app/CoverageOverview';
import { FileDetail } from '../components/app/FileDetail';
import { FileTree } from '../components/app/FileTree';
import { UploadCoverage } from '../components/app/UploadCoverage';
import { CoverageFileStatus, CoverageSummary, FileCoverage } from '../types/coverage';

type CoveragePageViewProps = {
  error: string | null;
  fileStatus: CoverageFileStatus | null;
  files: FileCoverage[];
  loading: boolean;
  selectedFile: FileCoverage | null;
  selectedPath: string | null;
  summary: CoverageSummary;
  showResults: boolean;
  onSelectFile: (path: string) => void;
  onUpload: (file: File) => void;
  onViewResults: () => void;
};

export function CoveragePageView({
  error,
  fileStatus,
  files,
  loading,
  selectedFile,
  selectedPath,
  summary,
  showResults,
  onSelectFile,
  onUpload,
  onViewResults,
}: CoveragePageViewProps) {
  const hasResults = showResults && files.length > 0;

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

          {!hasResults && (
            <UploadCoverage
              error={error}
              fileStatus={fileStatus}
              loading={loading}
              onUpload={onUpload}
              onViewResults={onViewResults}
            />
          )}

          {hasResults && <CoverageOverview summary={summary} />}

          <Box
            sx={{
              display: 'grid',
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: { xs: '1fr', md: '360px minmax(0, 1fr)' },
            }}
          >
            {hasResults && (
              <>
                <FileTree files={files} onSelectFile={onSelectFile} selectedPath={selectedPath} />
                <FileDetail file={selectedFile} />
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
