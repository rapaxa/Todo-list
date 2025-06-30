import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { TodoLists } from '@/features/todoLists/ui/TodoLists/TodoLists.tsx';
import s from './Main.module.css';
import { CreateItemForm } from '@/common/components';
import { createTodolist } from '@/features/todoLists/model/todoLists-reducer.ts';

export const Main = () => {
  const dispatch = useAppDispatch();
  const createTodoList = (title: string) => {
    dispatch(createTodolist(title));
  };
  return (
    <div className={'container'}>
      <div className={s.todoLists__container}>
        <div className={s.todoList__header}>
          <h1>My Tasks</h1>
          <CreateItemForm onCreateItem={createTodoList} />
        </div>
        <div className={s.todoLists__wrapper}>
          <TodoLists />
        </div>
      </div>
    </div>
  );
};
