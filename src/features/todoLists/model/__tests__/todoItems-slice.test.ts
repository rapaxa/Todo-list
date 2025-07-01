import { beforeEach, expect, test } from 'vitest';
import {
  fetchTodolists,
  createTodolist,
  deleteTodolist,
  changeTodolistFilterAC,
  default as todoListReducer,
} from '../todoLists-reducer.ts'; // путь поправь под свой проект

import type { DomainTodoWithFilter } from '../todoLists-reducer.ts';
import { nanoid } from '@reduxjs/toolkit';

let todolistId1: string;
let todolistId2: string;
let startState: { todolists: DomainTodoWithFilter[] };

beforeEach(() => {
  todolistId1 = nanoid();
  todolistId2 = nanoid();

  startState = {
    todolists: [
      { id: todolistId1, title: 'Work', addedData: '', order: 0, filter: 'all' },
      { id: todolistId2, title: 'Home', addedData: '', order: 1, filter: 'all' },
    ],
  };
});

test('должен удалить правильный тудулист', () => {
  // const action = {
  //   type: deleteTodolist.fulfilled.type,
  //   payload: { todolistId: todolistId1, res: {} },
  // };

  const endState = todoListReducer(startState, deleteTodolist);
  expect(endState.todolists.length).toBe(1);
  expect(endState.todolists[0].id).toBe(todolistId2);
});

test('должен создать новый тудулист', () => {
  const newTodolist = {
    id: 'new-id',
    title: 'New List',
    addedDate: '',
    order: 0,
  };

  const action = {
    type: createTodolist.fulfilled.type,
    payload: newTodolist,
  };

  const endState = todoListReducer(startState, action);
  expect(endState.todolists.length).toBe(3);
  expect(endState.todolists[2].title).toBe('New List');
  expect(endState.todolists[2].filter).toBe('all');
});

test('должен изменить фильтр у тудулиста', () => {
  const action = changeTodolistFilterAC({ id: todolistId2, filter: 'completed' });

  const endState = todoListReducer(startState, action);
  expect(endState.todolists[1].filter).toBe('completed');
});

test('должен загрузить тудулисты с сервера', () => {
  const serverTodolists = [
    { id: '1', title: 'From server 1', addedDate: '', order: 0 },
    { id: '2', title: 'From server 2', addedDate: '', order: 1 },
  ];

  const action = {
    type: fetchTodolists.fulfilled.type,
    payload: serverTodolists,
  };

  const endState = todoListReducer({ todolists: [] }, action);
  expect(endState.todolists.length).toBe(2);
  expect(endState.todolists[0].filter).toBe('all');
  expect(endState.todolists[1].title).toBe('From server 2');
});
