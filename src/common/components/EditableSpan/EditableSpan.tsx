import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import s from './EditableSpan.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { ModalWindow } from '@/common/components/Modal/ModalWindow.tsx';

export const EditableSpan = ({ titleValue, status }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(titleValue);
  const [helperText, setHelperText] = useState(' ');

  const toggleEditMode = () => {
    if (title.trim().length === 0) {
      setHelperText('Title cannot be empty');
      return;
    }
    setHelperText(' ');
    setEditMode(!editMode);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setTitle(newValue);

    if (newValue.trim().length === 0) {
      setHelperText('Title cannot be empty');
    } else {
      setHelperText(' ');
    }
  };

  const turnOffEditModeByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      toggleEditMode(); // использует ту же проверку
    }
  };

  return (
    <div className={s.editable__span}>
      {editMode ? (
        <ModalWindow isOpen={editMode}>
          <TextField
            size="small"
            value={title}
            autoFocus
            helperText={helperText}
            onKeyDown={turnOffEditModeByEnter}
            onChange={changeTitle}
            onBlur={toggleEditMode}
            error={title.trim().length === 0}
          />
        </ModalWindow>
      ) : (
        <>
          <Typography
            sx={{
              textDecoration: status ? 'line-through' : 'none',
              color: status ? 'gray' : 'black',
              transition: 'all 0.3s',
            }}
          >
            {title}
          </Typography>
          <EditIcon onClick={() => setEditMode(!editMode)} />
        </>
      )}
    </div>
  );
};
type EditableSpanProps = {
  titleValue: string;
  status?: boolean;
};
