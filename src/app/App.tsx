import { Main } from '@/app/Main.tsx';
import s from './App.module.css';
import { useEffect } from 'react';
import { Header } from '@/common/components';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { themeMode } from '@/common/theme/themeMode.ts';
import { selectThemeMode } from '@/app/app-slice.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { fetchTodolists } from '@/features/todoLists/model/todolists-slice.ts';
import { ErrorSnackbar } from '@/common/components/ErrorSnackBar/ErrorSnackBar.tsx';

const App = () => {
  const currentTheme = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodolists());
  }, []);

  return (
    <div className={s.App}>
      <ThemeProvider theme={themeMode(currentTheme)}>
        <CssBaseline />
        <Header />
        <Main />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
};

export default App;
