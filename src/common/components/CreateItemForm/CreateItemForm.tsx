import { type ChangeEvent, type KeyboardEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import s from './CreateItemForm.module.css';

export const CreateItemForm = ({ onCreateItem, disabled }: CreateItemFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const createItemHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };
  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setError(null);
  };
  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler();
    }
  };
  return (
    <div className={s.Input_wrapper}>
      <TextField
        label={'Add a new Todo'}
        sx={{ width: '80%' }}
        variant={'outlined'}
        value={title}
        disabled={disabled}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={changeTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button
        sx={{
          backgroundColor: 'var(--main-color)',
          color: 'white',
          width: '100px',
          height: '100%',
        }}
        onClick={createItemHandler}
        disabled={disabled}
      >
        + Add
      </Button>
    </div>
  );
};
type CreateItemFormProps = {
  onCreateItem: (str: string) => void;
  disabled: boolean;
};
