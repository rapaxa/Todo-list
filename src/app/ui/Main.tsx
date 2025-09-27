import { TodoLists } from '@/features/todoLists/ui/TodoLists/TodoLists.tsx';
import { CreateItemForm } from '@/common/components';
import { Navigate } from 'react-router';
import { useAppSelector } from '@/common/hooks/commonHooks/useAppSelector.ts';
import { selectIsLoggedIn, selectLoading } from '@/app/model/app-slice.ts';
import { Path } from '@/common/routing/Path.ts';
import { Container, Grid, Typography } from '@mui/material';
import { containerSx } from '@/common/components/Header/styles.ts';
import { useCreateTodolistMutation } from '@/features/todoLists/api/todoListApi.ts';

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const loading = useAppSelector(selectLoading);
  const [createTodolistMuatation] = useCreateTodolistMutation();
  const createTodoList = (title: string) => {
    createTodolistMuatation(title);
  };

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />;
  }

  return (
    <Container maxWidth={'xl'} sx={containerSx}>
      <Grid
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">My Tasks</Typography>
        <CreateItemForm onCreateItem={createTodoList} disabled={loading === 'pending'} />
        <TodoLists />
      </Grid>
    </Container>
  );
};
