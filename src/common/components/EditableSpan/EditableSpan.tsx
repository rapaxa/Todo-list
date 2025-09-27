import { useState } from 'react';
import { TextField } from '@mui/material';

export const EditableSpan = ({ titleValue, onChange, onCloseEdit }: Props) => {
  const [title, setTitle] = useState(titleValue);
  const [helperText, setHelperText] = useState(' ');

  const commitChange = () => {
    if (title.trim().length === 0) {
      setHelperText('Title cannot be empty');
      return;
    }
    onChange(title);
    onCloseEdit();
  };

  return (
    <TextField
      value={title}
      onBlur={onCloseEdit}
      onChange={(e) => setTitle(e.target.value)}
      onKeyUp={(e) => e.key === 'Enter' && commitChange()}
      helperText={helperText}
      autoFocus
    />
  );
};

interface Props {
  titleValue: string;
  onChange: (title: string) => void;
  onCloseEdit: () => void;
}
