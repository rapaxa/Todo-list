import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';
import { FilterButtonsTypes } from '@/features/todoLists/ui/TodoLists/TodoListItems/TaskItem/TaskItem.tsx';

const initialState: TodoListTypes[] = [];
export const createTodoListAC = createAction('TodoLists/createTodo', (title: string) => {
  return { payload: { title, id: nanoid() } };
});
export const changeFilterAC = createAction<{ id: string; filter: FilterButtonsTypes }>(
  'TodoLists/changeFilter'
);
export const deleteTodoListAC = createAction<{ id: string }>('TodoLists/deleteTodo');
export const todoListsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodoListAC, (state, action) => {
      state.push({ ...action.payload, filter: 'all' });
    })
    .addCase(deleteTodoListAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    })
    .addCase(changeFilterAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    });
});

export type TodoListTypes = {
  id: string;
  title: string;
  filter: FilterButtonsTypes;
};
