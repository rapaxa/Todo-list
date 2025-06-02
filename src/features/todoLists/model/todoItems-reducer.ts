import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';
import { createTodoListAC, deleteTodoListAC } from './todoLists-reducer.ts';

const initialState: TodoListTypes = {};
export const deleteTaskItemAC = createAction<{ todolistId: string; id: string }>(
  'TodoLists/deleteTask'
);
export const createTodoItemAC = createAction<{ todolistId: string; title: string }>(
  'TodoLists/create'
);
export const changeTaskStatusAC = createAction<{
  todolistId: string;
  id: string;
  done: boolean;
}>('TodoLists/changeStatus');

export const dndAC = createAction<{
  todolistId: string;
  draggedIndex: number;
  targetIndex: number;
}>('TodoLists/dnd');
export const todoItemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodoItemAC, (state, action) => {
      const newState = { id: nanoid(), title: action.payload.title, done: false };
      state[action.payload.todolistId].unshift(newState);
    })
    .addCase(createTodoListAC, (state, action) => {
      state[action.payload.id] = [];
    })

    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.id);
      if (task) {
        task.done = action.payload.done;
      }
    })
    .addCase(deleteTaskItemAC, (state, action) => {
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
    .addCase(dndAC, (state, action) => {
      const { todolistId, draggedIndex, targetIndex } = action.payload;
      const list = state[todolistId];
      [list[draggedIndex], list[targetIndex]] = [list[targetIndex], list[draggedIndex]];
    });
});
type TodoListItemsTypes = {
  id: string;
  title: string;
  done: boolean;
};
type TodoListTypes = Record<string, TodoListItemsTypes[]>;
