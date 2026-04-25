import { FileCoverage, TreeNode } from '../types/coverage';

function createFolderNode(name: string, path: string): TreeNode {
  return {
    name,
    path,
    type: 'folder',
    children: [],
  };
}

export function buildCoverageTree(files: FileCoverage[]): TreeNode[] {
  const roots: TreeNode[] = [];

  for (const file of files) {
    const parts = file.path.replace(/\\/g, '/').split('/').filter(Boolean);
    let level = roots;
    let currentPath = '';

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isFile = index === parts.length - 1;
      let node = level.find((item) => item.name === part);

      if (!node) {
        node = isFile
          ? {
              name: part,
              path: file.path,
              type: 'file',
              coverage: file,
              children: [],
            }
          : createFolderNode(part, currentPath);
        level.push(node);
      }

      level = node.children;
    });
  }

  return roots;
}
