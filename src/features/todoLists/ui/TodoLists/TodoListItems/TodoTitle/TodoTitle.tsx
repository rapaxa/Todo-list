import { EditableSpan } from '@/common/components';
import Box from '@mui/material/Box';
import { useUpdateTodolistMutation } from '@/features/todoLists/api/todoListApi.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { IconMenu } from '@/common/components/IconMenu/IconMenu.tsx';
import EditIcon from '@mui/icons-material/Edit';
import { FontAwesomeSvgIcon } from '@/common/components/FontAwesomeSvgIcon/FontAwesomeSvgIcon.tsx';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useDeleteItem } from '@/common/hooks/commonHooks/useDeleteItem.ts';

interface TodoTitleProps {
  title: string;
  id: string;
}

export const TodoTitle = ({ title, id }: TodoTitleProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const { deleteItem } = useDeleteItem();
  const [updateTodolistMutation] = useUpdateTodolistMutation();

  const handleDelete = async () => {
    await deleteItem(id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    updateTodolistMutation({ todolistId: id, title: newTitle });
    setIsMenuOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {mode === 'edit' ? (
        <EditableSpan
          titleValue={title}
          onChange={changeTodoListTitle}
          onCloseEdit={() => setMode('view')}
        />
      ) : (
        <Typography>{title}</Typography>
      )}
      <IconButton aria-label="menu" onClick={() => setIsMenuOpen(true)}>
        <FontAwesomeSvgIcon key="gear" icon={faGear} />
      </IconButton>
      {isMenuOpen && (
        <IconMenu
          items={[
            { label: 'Edit', icon: <EditIcon />, onClick: () => setMode('edit') },
            { label: 'Delete', icon: <DeleteIcon />, onClick: handleDelete },
          ]}
          styleSX={{ position: 'absolute', top: '0', right: 0, zIndex: '20' }}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </Box>
  );
};
