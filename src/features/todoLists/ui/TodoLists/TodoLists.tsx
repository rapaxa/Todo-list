import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import s from './TodoLists.module.css';

import { motion } from 'framer-motion';
import { selectTodolist } from '@/features/todoLists/model/todoLists-reducer.ts';
import { TodoListItems } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoListItems.tsx';

export const TodoLists = () => {
  const todoLists = useAppSelector(selectTodolist);
  console.log(todoLists);
  return (
    <>
      {todoLists.map((item) => (
        <div className={s.todo} key={item.id}>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <TodoListItems todoList={item} />
          </motion.div>
        </div>
      ))}
    </>
  );
};
