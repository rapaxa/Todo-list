import { createTheme } from '@mui/material';
import type { ThemeMode } from '@/app/app-slice.ts';
export const themeMode = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: mode,
    },
  });
};
