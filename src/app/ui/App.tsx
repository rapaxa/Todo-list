import s from './App.module.css';
import { useEffect, useState } from 'react';
import { Header } from '@/common/components';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { themeMode } from '@/common/theme/themeMode.ts';
import { loginTC, selectThemeMode, setThemeMode } from '@/app/model/app-slice.ts';
import { useAppSelector } from '@/common/hooks/commonHooks/useAppSelector.ts';
import { useAppDispatch } from '@/common/hooks/commonHooks/useAppDispatch.ts';
import { ErrorSnackbar } from '@/common/components/ErrorSnackBar/ErrorSnackBar.tsx';
import { Routing } from '@/common/routing';
import CircularProgress from '@mui/material/CircularProgress';
import { useMeQuery } from '@/features/auth/api/authApi.ts';
import { ResultCode } from '@/shared/enums';
import { THEME_VARIABLE } from '@/common/constants';
import Box from '@mui/material/Box';
import type { ThemeMode } from '@/shared';

const App = () => {
  const currentTheme = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const { data, isLoading } = useMeQuery();

  useEffect(() => {
    if (!isLoading) {
      if (data?.resultCode === ResultCode.Success) {
        dispatch(loginTC({ isLoggedIn: true }));
      }
      setIsInitialized(true);
    }
  }, [isLoading]);

  useEffect(() => {
    const localValue = localStorage.getItem(THEME_VARIABLE) as ThemeMode;
    if (localValue) {
      dispatch(setThemeMode(localValue));
    } else {
      dispatch(setThemeMode('light'));
    }
  }, []);

  if (!isInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={150} thickness={3} />;
      </Box>
    );
  }
  return (
    <div className={s.App}>
      <ThemeProvider theme={themeMode(currentTheme)}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
};

export default App;
