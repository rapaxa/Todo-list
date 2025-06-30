import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import s from './Counter.module.css';
import { CircularProgressWithLabel } from '@/common/components';
import {
  selectActiveTasks,
  selectAllTasksCount,
  selectCompletedTasks,
} from '@/features/todoLists/model/selectors/tasksSelectors.ts';

export const Counter = ({ todoListId }: CounterProps) => {
  const allTasks = useAppSelector((state) => selectAllTasksCount(state, todoListId));
  const activeCount = useAppSelector((state) => selectActiveTasks(state, todoListId));
  const completedCount = useAppSelector((state) => selectCompletedTasks(state, todoListId));
  return (
    <div className={s.counter__wrapper}>
      <CircularProgressWithLabel value={completedCount} maxValue={allTasks} />
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
