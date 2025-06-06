import { useState } from 'react';
import { Typography } from '@mui/material';
import s from './EditableSpan.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { ModalWindowOfEditTitle } from '@/common/components';
type EditableSpanProps = {
  titleValue: string;
  onChange: (value: string) => void;
};
export const EditableSpan = ({ titleValue, onChange }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={s.editable__span}>
      {editMode ? (
        <ModalWindowOfEditTitle
          title={titleValue}
          onChange={onChange}
          setIsOpen={setEditMode}
          isOpen={editMode}
        />
      ) : (
        <>
          <Typography>{titleValue}</Typography>
          <EditIcon onClick={() => setEditMode(!editMode)} />
        </>
      )}
    </div>
  );
};
