import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { CoverageBadge } from '../bases/CoverageBadge';
import { FileCoverage, TreeNode } from '../../types/coverage';

type FileTreeViewProps = {
  files: FileCoverage[];
  selectedPath: string | null;
  tree: TreeNode[];
  onSelectFile: (path: string) => void;
};

export function FileTreeView({
  files,
  selectedPath,
  tree,
  onSelectFile,
}: FileTreeViewProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 2, py: 1.5 }}>
        <Typography fontWeight={800}>Files</Typography>
        <Typography color="text.secondary" variant="body2">
          {files.length} sorted by lowest coverage
        </Typography>
      </Box>
      <Box sx={{ maxHeight: { xs: 360, md: 'calc(100vh - 350px)' }, overflow: 'auto', py: 1 }}>
        {tree.map((node) => (
          <TreeRow
            key={node.path}
            node={node}
            onSelectFile={onSelectFile}
            selectedPath={selectedPath}
          />
        ))}
      </Box>
    </Box>
  );
}

function TreeRow({
  node,
  selectedPath,
  onSelectFile,
  depth = 0,
}: {
  node: TreeNode;
  selectedPath: string | null;
  onSelectFile: (path: string) => void;
  depth?: number;
}) {
  const selected = node.type === 'file' && node.path === selectedPath;

  if (node.type === 'folder') {
    return (
      <Box>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{ color: 'text.secondary', minHeight: 34, pl: 1.5 + depth * 2, pr: 1.5 }}
        >
          <FolderOutlinedIcon fontSize="small" />
          <Typography noWrap variant="body2">
            {node.name}
          </Typography>
        </Stack>
        {node.children.map((child) => (
          <TreeRow
            key={child.path}
            depth={depth + 1}
            node={child}
            onSelectFile={onSelectFile}
            selectedPath={selectedPath}
          />
        ))}
      </Box>
    );
  }

  return (
    <ButtonBase
      onClick={() => onSelectFile(node.path)}
      sx={{
        alignItems: 'center',
        bgcolor: selected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
        display: 'flex',
        gap: 1,
        justifyContent: 'space-between',
        minHeight: 42,
        px: 1.5,
        pl: 1.5 + depth * 2,
        textAlign: 'left',
        width: '100%',
        '&:hover': {
          bgcolor: selected ? 'rgba(37, 99, 235, 0.12)' : 'action.hover',
        },
      }}
    >
      <Stack alignItems="center" direction="row" spacing={1} sx={{ minWidth: 0 }}>
        <InsertDriveFileOutlinedIcon color={selected ? 'primary' : 'inherit'} fontSize="small" />
        <Typography noWrap title={node.path} variant="body2">
          {node.name}
        </Typography>
      </Stack>
      {node.coverage && <CoverageBadge coverage={node.coverage.coverage} />}
    </ButtonBase>
  );
}
