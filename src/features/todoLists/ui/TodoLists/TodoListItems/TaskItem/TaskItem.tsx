import { AnimatePresence } from 'framer-motion';
import { List } from '@mui/material';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { TodoListItemsTypes } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoListItems.tsx';
import { Task } from './Task/Task.tsx';
import { useEffect, useState } from 'react';
import { dnd, fetchTasks, selectTodoTasks } from '@/features/todoLists/model/todoItems-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import * as React from 'react';
import { TaskStatus } from '@/features/todoLists/api/types.ts';

export const TaskItem = ({ todoList }: TodoListItemsTypes) => {
  const items = useAppSelector(selectTodoTasks);
  const { id, filter } = todoList;

  useEffect(() => {
    dispatch(fetchTasks(id));
  }, []);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  let filteredTodo = items[id];

  if (filter === 'completed') {
    filteredTodo = filteredTodo.filter((item) => item.status === TaskStatus.Completed);
  } else if (filter === 'active') {
    filteredTodo = filteredTodo.filter((item) => item.status === TaskStatus.New);
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      dispatch(dnd({ todolistId: todoList.id, draggedIndex: draggedIndex, targetIndex: index }));
      setDraggedIndex(index);
      e.currentTarget.style.backgroundColor = 'white';
    }
  };
  return (
    <List>
      <AnimatePresence>
        {filteredTodo?.map((item, index) => (
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
