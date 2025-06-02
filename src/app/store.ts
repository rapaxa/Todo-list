import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todoListsReducer } from '@/features/todoLists/model/todoLists-reducer.ts';
import { todoItemsReducer } from '@/features/todoLists/model/todoItems-reducer.ts';

export const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  todoItems: todoItemsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
