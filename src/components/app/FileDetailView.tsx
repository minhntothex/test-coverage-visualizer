import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { CoverageBadge } from '../bases/CoverageBadge';
import { EmptyState } from '../bases/EmptyState';
import { FileCoverage } from '../../types/coverage';

type FileDetailViewProps = {
  file: FileCoverage | null;
  criticalFile: boolean;
  priorityScore: number;
};

export function FileDetailView({
  file,
  criticalFile,
  priorityScore,
}: FileDetailViewProps) {
  if (!file) {
    return (
      <Panel>
        <EmptyState
          description="Upload an lcov.info file to inspect uncovered lines and choose the next tests to write."
          title="No coverage loaded"
        />
      </Panel>
    );
  }

  return (
    <Panel>
      <Stack
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography color="text.secondary" variant="body2">
            Selected file
          </Typography>
          <Typography fontWeight={800} sx={{ overflowWrap: 'anywhere' }} variant="h2">
            {file.path}
          </Typography>
        </Box>
        <CoverageBadge coverage={file.coverage} />
      </Stack>

      <Divider sx={{ my: 2.5 }} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <DetailMetric label="Covered lines" value={`${file.hitLines}/${file.totalLines}`} />
        <DetailMetric label="Uncovered" value={file.uncoveredLines.length.toString()} />
        <DetailMetric label="Priority score" value={priorityScore.toString()} />
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2.5 }}>
        {criticalFile && (
          <Chip
            color="error"
            icon={<ReportProblemOutlinedIcon />}
            label="Critical file"
            size="small"
          />
        )}
        <Chip
          label={
            file.uncoveredLines.length > 0
              ? 'Add tests for uncovered branches and edge cases'
              : 'Coverage is complete for tracked lines'
          }
          size="small"
          variant="outlined"
        />
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Typography fontWeight={800} gutterBottom>
          Uncovered lines
        </Typography>
        {file.uncoveredLines.length === 0 ? (
          <Typography color="text.secondary">No uncovered lines reported by LCOV.</Typography>
        ) : (
          <Box
            sx={{
              bgcolor: '#111827',
              borderRadius: 2,
              color: '#f9fafb',
              display: 'grid',
              gap: 0.75,
              gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
              maxHeight: 320,
              overflow: 'auto',
              p: 2,
            }}
          >
            {file.uncoveredLines.map((lineNumber) => (
              <Box
                key={lineNumber}
                sx={{
                  bgcolor: 'rgba(248, 113, 113, 0.18)',
                  border: '1px solid rgba(248, 113, 113, 0.45)',
                  borderRadius: 1,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 14,
                  px: 1,
                  py: 0.75,
                  textAlign: 'center',
                }}
              >
                line {lineNumber}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Panel>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        minHeight: 420,
        p: { xs: 2, sm: 3 },
      }}
    >
      {children}
    </Box>
  );
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        flex: 1,
        minWidth: 0,
        p: 2,
      }}
    >
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography fontWeight={800} variant="h2">
        {value}
      </Typography>
    </Box>
  );
}
