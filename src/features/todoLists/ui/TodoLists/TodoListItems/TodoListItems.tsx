import { TodoTitle } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoTitle/TodoTitle.tsx';
import { TaskItem } from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/TaskItem.tsx';
import { FilterButtons } from '@/features/todoLists/ui/TodoLists/TodoListItems/FiltreButtons/FiltredButtons.tsx';
import { CreateItemForm } from '@/common/components';
import Box from '@mui/material/Box';
import { useCreateTaskMutation } from '@/features/todoLists/api/tasksApi.ts';
import { useAppSelector } from '@/common/hooks';
import { selectLoading } from '@/app/model/app-slice.ts';
import type { DomainTodolistsWithStatus } from '@/features/todoLists/lib/types';

export const TodoListItems = (todolist: DomainTodolistsWithStatus) => {
  const [createTaskMutation] = useCreateTaskMutation();
  const loading = useAppSelector(selectLoading);

  const createTask = (title: string) => {
    createTaskMutation({ todolistId: todolist.id, title });
  };

  return (
    <Box
      sx={{
        border: '1px solid gray',
        padding: '1rem',
        margin: '1rem',
        height: '650px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <TodoTitle id={todolist.id} title={todolist.title} />
      <CreateItemForm onCreateItem={createTask} disabled={loading === 'pending'} />
      <TaskItem {...todolist} />
      <FilterButtons id={todolist.id} />
    </Box>
  );
};
