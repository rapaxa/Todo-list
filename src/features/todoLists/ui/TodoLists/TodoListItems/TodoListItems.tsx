import s from './TodoListItems.module.css';
import { TodoTitle } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoTitle/TodoTitle.tsx';
import { TaskItem } from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/TaskItem.tsx';
import { FilterButtons } from '@/features/todoLists/ui/TodoLists/TodoListItems/FiltreButtons/FiltredButtons.tsx';
import { Counter } from '@/features/todoLists/ui/TodoLists/TodoListItems/Counter/Counter.tsx';
import type { DomainTodolist } from '@/features/todoLists/model/todolists-slice.ts';
import { CreateItemForm } from '@/common/components';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { createTodoItem } from '@/features/todoLists/model/todolistItems-slice.ts';

export const TodoListItems = (todolist: DomainTodolist) => {
  const dispatch = useAppDispatch();
  const createTask = (title: string) => {
    dispatch(createTodoItem({ todolistId: todolist.id, title }));
  };

  return (
    <div className={s.task__wrapper}>
      <TodoTitle {...todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === 'pending'} />
      <TaskItem {...todolist} />
      <Counter todolistId={todolist.id} />
      <FilterButtons id={todolist.id} />
    </div>
  );
};
