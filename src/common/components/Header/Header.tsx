import { AppBar, Button, Container, LinearProgress, Toolbar, Typography } from '@mui/material';
import {
  loginTC,
  selectIsLoggedIn,
  selectLoading,
  selectThemeMode,
  toggleThemeMode,
} from '@/app/model/app-slice.ts';
import { useLogoutMutation } from '@/features/auth/api/authApi.ts';
import { AUTH_TOKEN } from '@/common/constants';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { containerSx } from '@/common/components/Header/styles.ts';
import Box from '@mui/material/Box';
import { baseApi } from '@/app/api/baseApi.ts';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();
  const currentTheme = useAppSelector(selectThemeMode);
  const loading = useAppSelector(selectLoading);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const onThemeToggle = () => {
    dispatch(toggleThemeMode());
  };

  const onLogout = () => {
    logoutMutation()
      .then(() => {
        localStorage.removeItem(AUTH_TOKEN);
        sessionStorage.removeItem(AUTH_TOKEN);
        dispatch(loginTC({ isLoggedIn: false }));
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Todolist', 'Tasks']));
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth={'xl'} sx={containerSx}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolists
          </Typography>
          <Button
            variant="contained"
            color={'secondary'}
            onClick={onThemeToggle}
            value={currentTheme}
          >
            {currentTheme === 'dark' ? 'light' : 'dark'}
          </Button>
          {isLoggedIn && (
            <Button color="inherit" onClick={onLogout}>
              Log out
            </Button>
          )}
        </Container>
      </Toolbar>
      <Box sx={{ height: '1px' }}>{loading === 'pending' && <LinearProgress />}</Box>
    </AppBar>
  );
};
