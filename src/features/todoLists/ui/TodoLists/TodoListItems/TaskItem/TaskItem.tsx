import { TaskStatus } from '@/shared/enums';
import { Grid } from '@mui/material';
import { Task } from './Task/Task';
import { useGetTasksQuery } from '@/features/todoLists/api/tasksApi.ts';
import { TasksSkeleton } from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/TasksSkeleton/TasksSkeleton.tsx';
import type { DomainTodolistsWithStatus } from '@/features/todoLists/lib/types';
import { BasicPagination } from '@/common/components/BasicPagination/BasicPagination.tsx';
import { useEffect, useState } from 'react';
import { PAGE_SIZE } from '@/common/constants';
import { Counter } from '@/features/todoLists/ui/TodoLists/TodoListItems/Counter/Counter.tsx';
import Box from '@mui/material/Box';

export const TaskItem = (todoList: DomainTodolistsWithStatus) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { id, filter } = todoList;

  const { data: tasks, isLoading } = useGetTasksQuery(
    { todolistId: id, params: { count: PAGE_SIZE, page: currentPage } },
    { selectFromResult: ({ data, isLoading }) => ({ data, isLoading }) }
  );

  useEffect(() => {
    if (!isLoading && tasks?.items?.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [tasks, isLoading, currentPage]);

  let filteredTodo = tasks?.items;
  if (isLoading) {
    return <TasksSkeleton />;
  }

  if (filter === 'completed') {
    filteredTodo = filteredTodo?.filter((item) => item.status === TaskStatus.Completed);
  } else if (filter === 'active') {
    filteredTodo = filteredTodo?.filter((item) => item.status === TaskStatus.New);
  }

  return (
    <Grid height={'100%'} position={'relative'}>
      <Box sx={{ flexGrow: 1 }}>
        {filteredTodo?.map((item) => <Task key={item.id} item={item} todolist={todoList} />)}
      </Box>

      <Box position={'absolute'} bottom={0} width="100%">
        <Counter page={currentPage} todolistId={id} />
        {tasks && tasks?.totalCount > PAGE_SIZE ? (
          <BasicPagination
            totalCount={tasks?.totalCount ?? 0}
            currentPage={currentPage}
            todolistId={id}
            onChange={setCurrentPage}
          />
        ) : null}
      </Box>
    </Grid>
  );
};
