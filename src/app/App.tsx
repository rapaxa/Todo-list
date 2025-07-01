import { Main } from '@/app/Main.tsx';
import s from './App.module.css';
import { useEffect } from 'react';
import { Header } from '@/common/components';
import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { themeMode } from '@/common/theme/themeMode.ts';
import { selectStatus, selectThemeMode } from '@/app/app-slice.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { fetchTodolists } from '@/features/todoLists/model/todoLists-reducer.ts';
import Box from '@mui/material/Box';

const App = () => {
  const currentTheme = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodolists());
  }, []);
  const loadingStatus = useAppSelector(selectStatus);
  return (
    <ThemeProvider theme={themeMode(currentTheme)}>
      <CssBaseline />
      <div className={s.App}>
        <Header />
        <Box sx={{ width: '100%' }}>{loadingStatus === 'loading' && <LinearProgress />}</Box>
        <Main />
      </div>
    </ThemeProvider>
  );
};

export default App;
