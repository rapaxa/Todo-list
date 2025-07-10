import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import s from './TodoTitle.module.css';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { EditableSpan } from '@/common/components';
import {
  changeTodolistTitle,
  deleteTodolist,
  type DomainTodolist,
} from '@/features/todoLists/model/todolists-slice.ts';

export const TodoTitle = ({ title, id, entityStatus }: DomainTodolist) => {
  const dispatch = useAppDispatch();

  const deleteItem = (id: string) => {
    dispatch(deleteTodolist(id));
  };
  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodolistTitle({ todolistId: id, title }));
  };
  return (
    <div className={s.TodoTitle}>
      <EditableSpan
        onChange={changeTodoListTitle}
        disabled={entityStatus === 'pending'}
        titleValue={title}
      />
      <IconButton
        aria-label="delete"
        size="medium"
        onClick={() => deleteItem(id)}
        disabled={entityStatus === 'pending'}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
