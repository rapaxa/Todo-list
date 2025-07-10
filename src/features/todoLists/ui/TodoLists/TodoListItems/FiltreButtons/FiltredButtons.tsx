import { Button } from '@mui/material';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import s from './FiltreButtons.module.css';
import { changeTodolistFilterAC } from '@/features/todoLists/model/todolists-slice.ts';
export const FilterButtons = ({ id }: FiltredButtonsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.FiltreButtons__wrapper}>
      <Button onClick={() => dispatch(changeTodolistFilterAC({ id, filter: 'all' }))}>All</Button>
      <Button onClick={() => dispatch(changeTodolistFilterAC({ id, filter: 'active' }))}>
        Active
      </Button>
      <Button onClick={() => dispatch(changeTodolistFilterAC({ id, filter: 'completed' }))}>
        Completed
      </Button>
    </div>
  );
};
type FiltredButtonsProps = {
  id: string;
};
