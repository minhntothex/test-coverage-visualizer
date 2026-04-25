import { Box, Typography } from '@mui/material';

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        color: 'text.secondary',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 280,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography color="text.primary" fontWeight={700} gutterBottom variant="h2">
        {title}
      </Typography>
      <Typography maxWidth={440}>{description}</Typography>
    </Box>
  );
}
