import { Button } from '@mui/material';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { changeTodoFilterAC } from '@/features/todoLists/model/todoLists-reducer.ts';
import s from './FiltreButtons.module.css';
export const FilterButtons = ({ id }: FiltredButtonsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.FiltreButtons__wrapper}>
      <Button onClick={() => dispatch(changeTodoFilterAC({ id, filter: 'all' }))}>All</Button>
      <Button onClick={() => dispatch(changeTodoFilterAC({ id, filter: 'active' }))}>Active</Button>
      <Button onClick={() => dispatch(changeTodoFilterAC({ id, filter: 'completed' }))}>
        Completed
      </Button>
    </div>
  );
};
type FiltredButtonsProps = {
  id: string;
};
