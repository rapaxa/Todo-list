import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todoListSlice } from '@/features/todoLists/model/todolists-slice.ts';
import { appSlice } from '@/app/app-slice.ts';
import { todolistItemsSlice } from '@/features/todoLists/model/todolistItems-slice.ts';

export const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [todoListSlice.name]: todoListSlice.reducer,
  [todolistItemsSlice.name]: todolistItemsSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
