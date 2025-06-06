import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './ModalWindowOfEditTitle.module.css';

export const ModalWindowOfEditTitle = ({
  setIsOpen,
  title,
  isOpen,
  onChange,
}: ModalWindowProps) => {
  const [titleValue, setTitleValue] = useState(title);

  const toggleEditMode = () => {
    if (titleValue.trim().length === 0) {
      return;
    } else {
      onChange(titleValue);
      setIsOpen(!isOpen);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const turnOffEditModeByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChange(titleValue);

      toggleEditMode(); // использует ту же проверку
    }
  };
  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setTitleValue(newValue);
    if (newValue.trim().length === 0) {
    } else {
      onChange(titleValue);
    }
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={s.modalWindow}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Enter new title for change:</h2>
          <Grid>
            <TextField
              size="small"
              value={titleValue}
              autoFocus
              onKeyDown={turnOffEditModeByEnter}
              onChange={changeTitle}
              error={titleValue.trim().length === 0}
            />
            <Button variant="contained" onClick={toggleEditMode}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
type ModalWindowProps = {
  onChange: (value: string) => void;
  setIsOpen: (r: boolean) => void;
  isOpen: boolean;
  title: string;
};
