import { AnimatePresence } from 'framer-motion';
import { List } from '@mui/material';
import { selectTodoListItems } from '@/features/todoLists/model/todoItems-selectors.ts';
import { TodoListItemsTypes } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoListItems.tsx';
import { Task } from './Task/Task.tsx';
import { useState } from 'react';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { dndTodoTaskAC } from '@/features/todoLists/model/todoItems-reducer.ts';

export const TaskItem = ({ todoList }: TodoListItemsTypes) => {
  const items = useAppSelector(selectTodoListItems);
  const { id, filter } = todoList;
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  let filteredTodo = items[id];

  if (filter === 'completed') {
    filteredTodo = filteredTodo.filter((item) => item.done);
  } else if (filter === 'active') {
    filteredTodo = filteredTodo.filter((item) => !item.done);
  }

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
    e.currentTarget.style.borderRadius = '10px';
    e.currentTarget.style.backgroundColor = 'rgba(161,161,161,0.27)';
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      dispatch(
        dndTodoTaskAC({ todolistId: todoList.id, draggedIndex: draggedIndex, targetIndex: index })
      );
      setDraggedIndex(index);
      e.currentTarget.style.backgroundColor = 'rgb(250,250,250)';
    }
  };
  return (
    <List>
      <AnimatePresence>
        {filteredTodo.map((item, index) => (
          <Task
            key={item.id}
            item={item}
            todolistId={id}
            index={index}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            isDragging={draggedIndex === index}
          />
        ))}
      </AnimatePresence>
    </List>
  );
};

export type FilterButtonsTypes = 'all' | 'completed' | 'active';
