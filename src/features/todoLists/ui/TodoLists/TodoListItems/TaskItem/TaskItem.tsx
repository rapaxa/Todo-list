import { AnimatePresence } from 'framer-motion';
import { List } from '@mui/material';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTodoListItems } from '@/features/todoLists/model/todoItems-selectors.ts';
import { TodoListItemsTypes } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoListItems.tsx';
import { Task } from './Task/Task.tsx';
import { useState } from 'react';
import { dndAC } from '@/features/todoLists/model/todoItems-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import * as React from 'react';

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

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      dispatch(dndAC({ todolistId: todoList.id, draggedIndex: draggedIndex, targetIndex: index }));
      setDraggedIndex(index);
      e.currentTarget.style.backgroundColor = 'white';
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
