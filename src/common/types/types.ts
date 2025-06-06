import { FilterButtonsTypes } from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/TaskItem.tsx';

export type TodoListTasksTypes = {
  id: string;
  title: string;
  done: boolean;
};
export type TodoListTypes = {
  id: string;
  title: string;
  filter: FilterButtonsTypes;
};
