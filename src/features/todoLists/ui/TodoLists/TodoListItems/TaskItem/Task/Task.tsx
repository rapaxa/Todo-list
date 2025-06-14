// Task.tsx
import { ChangeEvent, useState } from 'react';
import { Checkbox, Grid, IconButton, ListItem } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getRandomColor } from '@/common/utils/getRandomColors.ts';
import {
  changeTodoTaskStatusAC,
  changeTodoTaskTitleAC,
  deleteTodoTaskAC,
} from '@/features/todoLists/model/todoItems-reducer.ts';
import * as React from 'react';
import s from './Task.module.css';
import { useAppDispatch } from '@/common/hooks';
import { EditableSpan } from '@/common/components';
export const Task = ({ item, todolistId, onDragStart, onDrop, index }: Props) => {
  const dispatch = useAppDispatch();
  const [checkboxColor] = useState(getRandomColor());

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTodoTaskStatusAC({ todolistId, id: item.id, done: e.target.checked }));
  };
  const changeTaskTitle = (value: string) => {
    dispatch(changeTodoTaskTitleAC({ todolistId, id: item.id, title: value }));
  };
  const handlerDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'lightgray';
  };
  const handlerDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'white';
  };
  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'rgb(250,250,250)';
  };
  const deleteTask = () => {
    dispatch(deleteTodoTaskAC({ todolistId, id: item.id }));
  };

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      style={{ listStyle: 'none' }}
    >
      <ListItem
        className={item.done ? s.strikethrough : ''}
        draggable={true}
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={(e) => handlerDragOver(e)}
        onDragLeave={(e) => handlerDragLeave(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDrop={(e) => onDrop(e, index)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'rgb(250,250,250)',
          margin: '10px 0',
          borderRadius: '20px',
          cursor: 'grab',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Checkbox
            sx={{
              color: checkboxColor,
              '&.Mui-checked': { color: checkboxColor },
            }}
            checked={item.done}
            onChange={changeTaskStatusHandler}
          />
          <EditableSpan onChange={changeTaskTitle} titleValue={item.title} />
        </Grid>
        <IconButton sx={{ alignSelf: 'flex-end' }} onClick={deleteTask}>
          <Delete />
        </IconButton>
      </ListItem>
    </motion.div>
  );
};
type Props = {
  item: Items;
  index: number;
  todolistId: string;
  onDragStart: (e: React.DragEvent<HTMLLIElement>, item: number) => void;
  onDrop: (e: React.DragEvent<HTMLLIElement>, item: number) => void;
  isDragging: boolean;
};
export type Items = {
  id: string;
  title: string;
  done: boolean;
};
