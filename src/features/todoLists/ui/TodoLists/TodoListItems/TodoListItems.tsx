import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { createTodoItemAC } from '@/features/todoLists/model/todoItems-reducer.ts';
import s from './TodoListItems.module.css';
import { TodoTitle } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoTitle/TodoTitle.tsx';
import {
  FilterButtonsTypes,
  TaskItem,
} from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/TaskItem.tsx';
import { FilterButtons } from '@/features/todoLists/ui/TodoLists/TodoListItems/FiltreButtons/FiltredButtons.tsx';
import { Counter } from '@/features/todoLists/ui/TodoLists/TodoListItems/Counter/Counter.tsx';

export const TodoListItems = ({ todoList }: TodoListItemsTypes) => {
  const dispatch = useAppDispatch();
  const createTask = (title: string) => {
    dispatch(createTodoItemAC({ todolistId: todoList.id, title }));
  };
  return (
    <div className={s.task__wrapper}>
      <TodoTitle title={todoList.title} id={todoList.id} />
      <CreateItemForm onCreateItem={createTask} />
      <TaskItem todoList={todoList} />
      <Counter todoListId={todoList.id} />
      <FilterButtons id={todoList.id} />
    </div>
  );
};
export type TodoListItemsTypes = {
  todoList: { id: string; title: string; filter: FilterButtonsTypes };
};
