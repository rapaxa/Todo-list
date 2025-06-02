import type { RootState } from '@/app/store.ts';

export const selectTodoLists = (state: RootState) => state.todoLists;
