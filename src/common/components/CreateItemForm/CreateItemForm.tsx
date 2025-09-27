import { type ChangeEvent, type KeyboardEvent, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';

export const CreateItemForm = ({ onCreateItem, disabled }: CreateItemFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <Grid container spacing={3}>
      <Box>
        <TextField
          label={'Add a new Todo'}
          sx={{ width: '100%' }}
          inputRef={inputRef}
          variant={'outlined'}
          value={title}
          size={'small'}
          error={!!error}
          helperText={error}
          onChange={changeTitleHandler}
          onKeyDown={createItemOnEnterHandler}
        />
      </Box>
      <Grid size={2}>
        <Button
          sx={{
            backgroundColor: 'var(--main-color)',
            color: 'white',
          }}
          onClick={createItemHandler}
          disabled={disabled}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};
interface CreateItemFormProps {
  onCreateItem: (str: string) => void;
  disabled: boolean;
}
