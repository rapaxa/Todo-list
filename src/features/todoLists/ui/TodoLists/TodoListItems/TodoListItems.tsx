import s from './TodoListItems.module.css';
import { TodoTitle } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoTitle/TodoTitle.tsx';
import { TaskItem } from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/TaskItem.tsx';
import { FilterButtons } from '@/features/todoLists/ui/TodoLists/TodoListItems/FiltreButtons/FiltredButtons.tsx';
import { Counter } from '@/features/todoLists/ui/TodoLists/TodoListItems/Counter/Counter.tsx';
import type { DomainTodoWithFilter } from '@/features/todoLists/model/todoLists-reducer.ts';
import { CreateItemForm } from '@/common/components';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { createTodoItem } from '@/features/todoLists/model/todoItems-reducer.ts';
// import { createTodoItem } from '@/features/todoLists/model/todoItems-reducer.ts';

export const TodoListItems = ({ todoList }: TodoListItemsTypes) => {
  const dispatch = useAppDispatch();
  const createTask = (title: string) => {
    dispatch(createTodoItem({ todolistId: todoList.id, title }));
  };
  return (
    <div className={s.task__wrapper}>
      <TodoTitle title={todoList.title} id={todoList.id} />
      <CreateItemForm onCreateItem={createTask} />
      <TaskItem todoList={todoList} />
      {/*<Counter todoListId={todoList.id} />*/}
      <FilterButtons id={todoList.id} />
    </div>
  );
};
export type TodoListItemsTypes = {
  todoList: DomainTodoWithFilter;
};
