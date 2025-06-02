import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import s from './TodoTitle.module.css';
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { deleteTodoListAC } from '@/features/todoLists/model/todoLists-reducer.ts';

export const TodoTitle = ({ title, id }: TodoTitle) => {
  const dispatch = useAppDispatch();

  const deleteItem = (id: string) => {
    dispatch(deleteTodoListAC({ id }));
  };
  return (
    <div className={s.TodoTitle}>
      <EditableSpan titleValue={title} />
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
