import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';
import { createTodoListAC, deleteTodoListAC } from './todoLists-reducer.ts';
import { TodoListTasksTypes } from '@/common/types';

const initialState: TodoListTypes = {};
export const deleteTodoTaskAC = createAction<{ todolistId: string; id: string }>(
  'TodoListsTasks/deleteTask'
);
export const createTodoTaskAC = createAction<{ todolistId: string; title: string }>(
  'TodoListsTasks/create'
);
export const changeTodoTaskTitleAC = createAction<{
  todolistId: string;
  id: string;
  title: string;
}>('TodoListsTasks/changeTitle');
export const changeTodoTaskStatusAC = createAction<{
  todolistId: string;
  id: string;
  done: boolean;
}>('TodoListsTasks/changeStatus');

export const dndTodoTaskAC = createAction<{
  todolistId: string;
  draggedIndex: number;
  targetIndex: number;
}>('TodoListsTasks/dnd');
export const todoItemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodoTaskAC, (state, action) => {
      const newState = { id: nanoid(), title: action.payload.title, done: false };
      state[action.payload.todolistId].unshift(newState);
    })
    .addCase(createTodoListAC, (state, action) => {
      state[action.payload.id] = [];
    })

    .addCase(changeTodoTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.id);
      if (task) {
        task.done = action.payload.done;
      }
    })
    .addCase(deleteTodoTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (todolist) => todolist.id === action.payload.id
      );
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1);
      }
    })
    .addCase(deleteTodoListAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(dndTodoTaskAC, (state, action) => {
      const { todolistId, draggedIndex, targetIndex } = action.payload;
      const list = state[todolistId];
      [list[draggedIndex], list[targetIndex]] = [list[targetIndex], list[draggedIndex]];
    })
    .addCase(changeTodoTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    });
});

type TodoListTypes = Record<string, TodoListTasksTypes[]>;
