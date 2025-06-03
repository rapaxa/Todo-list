import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import s from './Counter.module.css';
import { selectTodoListItems } from '@/features/todoLists/model/todoItems-selectors.ts';
import { CircularProgressWithLabel } from '@/common/components/CircularProgressWithLabel/CircularProgressWithLabel.tsx';

export const Counter = ({ todoListId }: CounterProps) => {
  const getItemCount = useAppSelector(selectTodoListItems);
  const activeCount = getItemCount[todoListId].filter((task) => !task.done).length;
  const completedCount = getItemCount[todoListId].filter((task) => task.done).length;

  return (
    <div className={s.counter__wrapper}>
      <CircularProgressWithLabel
        value={completedCount}
        maxValue={getItemCount[todoListId].length}
      />
      <div>
        <span className={s.active__span}>Active:</span>
        <span className={s.active_number__span}>{activeCount}</span>
      </div>

      <div>
        <span className={s.completed__span}>Completed:</span>
        <span className={s.completed_number__span}>{completedCount}</span>
      </div>
    </div>
  );
};
type CounterProps = {
  todoListId: string;
};
