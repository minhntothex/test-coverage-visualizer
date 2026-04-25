import { CoverageOverviewView } from './CoverageOverviewView';
import { CoverageSummary } from '../../types/coverage';

type CoverageOverviewProps = {
  summary: CoverageSummary;
};

export function CoverageOverview({ summary }: CoverageOverviewProps) {
  return <CoverageOverviewView summary={summary} />;
}
