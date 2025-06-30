import { RootState } from '@/app/store.ts';
import { TaskStatus } from '@/features/todoLists/api/types.ts';

export const selectTasksByTodoId = (state: RootState, todoListId: string) =>
  state.todoTasks.tasks[todoListId] || [];

export const selectActiveTasks = (state: RootState, todoListId: string) =>
  selectTasksByTodoId(state, todoListId).filter((task) => task.status === TaskStatus.New).length;

export const selectCompletedTasks = (state: RootState, todoListId: string) =>
  selectTasksByTodoId(state, todoListId).filter((task) => task.status === TaskStatus.Completed)
    .length;
export const selectAllTasksCount = (state: RootState, todoListId: string) =>
  state.todoTasks.tasks[todoListId]?.filter((item) => item).length;
