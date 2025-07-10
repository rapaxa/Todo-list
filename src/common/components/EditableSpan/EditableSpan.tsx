import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField, Typography } from '@mui/material';
import s from './EditableSpan.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { ModalWindow } from '@/common/components/Modal/ModalWindow.tsx';

export const EditableSpan = ({ titleValue, status, onChange, disabled }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false);
  const [helperText, setHelperText] = useState(' ');
  const [title, setTitle] = useState(titleValue);
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
      onChange(title);
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
            disabled={disabled}
            helperText={helperText}
            onKeyDown={turnOffEditModeByEnter}
            onChange={changeTitle}
            onBlur={toggleEditMode}
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
            {titleValue}
          </Typography>
          <IconButton disabled={disabled} onClick={toggleEditMode}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};
type EditableSpanProps = {
  titleValue: string;
  status?: boolean;
  onChange: (title: string) => void;
  disabled: boolean;
};
