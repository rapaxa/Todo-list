import type { RootState } from '@/app/store.ts';

export const selectTodoListItems = (state: RootState) => state.todoItems;
