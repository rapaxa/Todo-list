import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from '@/app/model/app-slice.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import { THEME_VARIABLE } from '@/common/constants';

export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

let previousTheme = store.getState().app.themeMode;

store.subscribe(() => {
  const currentTheme = store.getState().app.themeMode;

  if (previousTheme !== currentTheme) {
    localStorage.setItem(THEME_VARIABLE, currentTheme);
    previousTheme = currentTheme;
  }
});
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
