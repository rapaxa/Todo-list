import { createTheme } from '@mui/material';
import type { ThemeMode } from '@/shared';

export const themeMode = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode,
    },
  });
};
