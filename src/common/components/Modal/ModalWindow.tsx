import { Box, Modal } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalWindow = ({ children, isOpen }: ModalWindowProps) => {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
type ModalWindowProps = {
  isOpen: boolean;
  children: React.ReactNode;
};
