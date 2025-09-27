import type { Theme } from '@mui/material';

export const loginSx = (theme: Theme) => ({
  backgroundColor: theme.palette.background.default,
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
});
