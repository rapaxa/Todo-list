import type { DomainTask } from '@/features/todoLists/api/types/tasksApi.types.ts';
import { useState } from 'react';
import { getRandomColor } from '@/common/utils';
import { useAppSelector, useTaskActions } from '@/common/hooks';
import { selectThemeMode } from '@/app/model/app-slice.ts';
import Box from '@mui/material/Box';
import { getTaskSxStyle } from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/Task/TaskSx.style.ts';
import { Checkbox, IconButton, Typography } from '@mui/material';
import { TaskStatus } from '@/shared/enums';
import { EditableSpan, FontAwesomeSvgIcon, IconMenu } from '@/common/components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import type { DomainTodolistsWithStatus } from '@/features/todoLists/lib/types';

interface Props {
  item: DomainTask;
  todolist: DomainTodolistsWithStatus;
}

export const Task = ({ item, todolist }: Props) => {
  const [checkboxColor] = useState(getRandomColor());
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentTheme = useAppSelector(selectThemeMode);

  const { changeTaskStatus, deleteTask, changeTaskTitle } = useTaskActions(todolist, item);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={getTaskSxStyle(currentTheme).box}>
        <Checkbox
          sx={{
            color: checkboxColor,
            '&.Mui-checked': {
              color: checkboxColor,
            },
            mr: 1,
          }}
          checked={item.status === TaskStatus.Completed}
          onChange={changeTaskStatus}
        />

        {mode === 'edit' ? (
          <EditableSpan
            titleValue={item.title}
            onChange={changeTaskTitle}
            onCloseEdit={() => setMode('view')}
          />
        ) : (
          <Typography>{item.title}</Typography>
        )}

        {isMenuOpen && (
          <IconMenu
            items={[
              { label: 'Edit', icon: <EditIcon />, onClick: () => setMode('edit') },
              { label: 'Delete', icon: <DeleteIcon />, onClick: deleteTask },
            ]}
            styleSX={{ position: 'absolute', top: '0', right: 0 }}
            onClose={() => setIsMenuOpen(false)}
          />
        )}

        <IconButton
          sx={{ zIndex: -1 }}
          aria-label="menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <FontAwesomeSvgIcon key="gear" icon={faGear} />
        </IconButton>
      </Box>
    </motion.div>
  );
};
