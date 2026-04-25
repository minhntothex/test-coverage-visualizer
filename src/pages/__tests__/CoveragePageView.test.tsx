import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { CoveragePageView } from '../CoveragePageView';
import { theme } from '../../theme';
import { CoverageSummary, FileCoverage } from '../../types/coverage';

const files: FileCoverage[] = [
  {
    coverage: 75,
    hitLines: 3,
    path: 'src/example.ts',
    totalLines: 4,
    uncoveredLines: [4],
  },
];

const summary: CoverageSummary = {
  averageCoverage: 75,
  files,
  hitLines: 3,
  lowCoverageCount: 0,
  totalLines: 4,
};

function renderPage(showResults: boolean) {
  render(
    <ThemeProvider theme={theme}>
      <CoveragePageView
        error={null}
        fileStatus={{ fileName: 'lcov.info', fileSize: 1200 }}
        files={files}
        loading={false}
        onSelectFile={jest.fn()}
        onUpload={jest.fn()}
        onViewResults={jest.fn()}
        selectedFile={files[0]}
        selectedPath={files[0].path}
        showResults={showResults}
        summary={summary}
      />
    </ThemeProvider>,
  );
}

describe('CoveragePageView', () => {
  it('keeps results hidden until requested', () => {
    renderPage(false);

    expect(screen.getByText('Upload Coverage Report')).toBeInTheDocument();
    expect(screen.queryByText('Average coverage')).not.toBeInTheDocument();
    expect(screen.queryByText('Files')).not.toBeInTheDocument();
  });

  it('hides upload and shows results after requested', () => {
    renderPage(true);

    expect(screen.queryByText('Upload Coverage Report')).not.toBeInTheDocument();
    expect(screen.getByText('Average coverage')).toBeInTheDocument();
    expect(screen.getByText('Files')).toBeInTheDocument();
    expect(screen.getByText('src/example.ts')).toBeInTheDocument();
  });
});
