import { Chip } from '@mui/material';
import { getCoverageLevel } from '../../utils/coverageMath';

type CoverageBadgeProps = {
  coverage: number;
};

export function CoverageBadge({ coverage }: CoverageBadgeProps) {
  const level = getCoverageLevel(coverage);
  const color = level === 'high' ? 'success' : level === 'medium' ? 'warning' : 'error';

  return (
    <Chip
      color={color}
      label={`${coverage}%`}
      size="small"
      sx={{ minWidth: 72, fontWeight: 700 }}
    />
  );
}
