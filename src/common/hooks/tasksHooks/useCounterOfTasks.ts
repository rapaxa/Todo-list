import { TaskStatus } from '@/shared/enums';
import { tasksApi } from '@/features/todoLists/api/tasksApi.ts';
import { PAGE_SIZE } from '@/common/constants';

export const useCounterOfTasks = (todolistId: string, status?: TaskStatus, page = 1) => {
  const { data, isLoading } = tasksApi.useGetTasksQuery({
    todolistId,
    params: { count: PAGE_SIZE, page },
  });

  const items = data?.items ?? [];

  const countedTasks =
    status !== undefined ? items.filter((task) => task.status === status).length : items.length;

  return {
    countedTasks,
    allTasks: items.length,
    isLoading,
  };
};
