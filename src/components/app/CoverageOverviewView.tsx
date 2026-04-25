import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { CoverageSummary } from '../../types/coverage';

type CoverageOverviewViewProps = {
  summary: CoverageSummary;
};

export function CoverageOverviewView({ summary }: CoverageOverviewViewProps) {
  const missingLines = summary.totalLines - summary.hitLines;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Metric label="Average coverage" value={`${summary.averageCoverage}%`} />
        <Metric label="Tracked lines" value={summary.totalLines.toLocaleString()} />
        <Metric label="Uncovered lines" value={missingLines.toLocaleString()} />
        <Metric label="Low files" value={summary.lowCoverageCount.toString()} />
      </Stack>
      <LinearProgress
        color={summary.averageCoverage > 80 ? 'success' : summary.averageCoverage >= 50 ? 'warning' : 'error'}
        sx={{ mt: 3, height: 8, borderRadius: 999 }}
        value={summary.averageCoverage}
        variant="determinate"
      />
    </Box>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography fontWeight={800} variant="h2">
        {value}
      </Typography>
    </Box>
  );
}
