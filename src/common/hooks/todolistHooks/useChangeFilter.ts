import { todolistsApi } from '@/features/todoLists/api/todoListApi.ts';
import { useAppDispatch } from '@/common/hooks/commonHooks/useAppDispatch.ts';
import type { FilterValues } from '@/shared';

export const useChangeFilter = () => {
  const dispatch = useAppDispatch();

  return (id: string, filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id);
        if (todolist) {
          todolist.filter = filter;
        }
      })
    );
  };
};
