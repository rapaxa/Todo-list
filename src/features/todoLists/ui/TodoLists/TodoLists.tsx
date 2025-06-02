import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import s from './TodoLists.module.css';
import { TodoListItems } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoListItems.tsx';
import { selectTodoLists } from '@/features/todoLists/model/todoLists-selectors.ts';
import { motion } from 'framer-motion';

export const TodoLists = () => {
  const todoLists = useAppSelector(selectTodoLists);
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
