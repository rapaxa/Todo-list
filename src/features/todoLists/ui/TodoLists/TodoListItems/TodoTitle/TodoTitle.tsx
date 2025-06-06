import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './TodoTitle.module.css';
import {
  changeTodoListTitleAC,
  deleteTodoListAC,
} from '@/features/todoLists/model/todoLists-reducer.ts';
import { useAppDispatch } from '@/common/hooks';
import { EditableSpan } from '@/common/components';

export const TodoTitle = ({ title, id }: TodoTitle) => {
  const dispatch = useAppDispatch();

  const deleteItem = () => {
    dispatch(deleteTodoListAC({ id }));
  };
  const changeTitle = (titleValue: string) => {
    dispatch(changeTodoListTitleAC({ id, titleValue }));
  };
  return (
    <div className={s.TodoTitle}>
      <EditableSpan onChange={changeTitle} titleValue={title} />
      <IconButton aria-label="delete" size="medium" onClick={deleteItem}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
type TodoTitle = {
  title: string;
  id: string;
};
