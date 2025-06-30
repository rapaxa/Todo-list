import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import s from './TodoTitle.module.css';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { EditableSpan } from '@/common/components';
import {
  changeTodolistTitle,
  deleteTodolist,
} from '@/features/todoLists/model/todoLists-reducer.ts';

export const TodoTitle = ({ title, id }: TodoTitle) => {
  const dispatch = useAppDispatch();

  const deleteItem = (id: string) => {
    dispatch(deleteTodolist(id));
  };
  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodolistTitle({ todolistId: id, title }));
  };
  return (
    <div className={s.TodoTitle}>
      <EditableSpan onChange={changeTodoListTitle} titleValue={title} />
      <IconButton aria-label="delete" size="medium" onClick={() => deleteItem(id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
type TodoTitle = {
  title: string;
  id: string;
};
