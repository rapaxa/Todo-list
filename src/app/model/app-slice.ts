import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { todolistsApi } from '@/features/todoLists/api/todoListApi.ts';
import { tasksApi } from '@/features/todoLists/api/tasksApi.ts';
import type { ThemeMode, StatusOfLoading, CurrentPageItems } from '@/shared/types';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: '' as ThemeMode,
    loading: 'idle' as StatusOfLoading,
    error: null as string | null,
    isLoggedIn: false,
    currentPage: [] as CurrentPageItems[],
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return;
        }
        state.loading = 'pending';
      })
      .addMatcher(isFulfilled, (state) => {
        state.loading = 'succeeded';
      })

      .addMatcher(isRejected, (state) => {
        state.loading = 'failed';
      });
  },
  reducers: {
    loginTC: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },

    setThemeMode: (state, action: { payload: ThemeMode }) => {
      state.themeMode = action.payload;
    },
    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setCurrentPage: (state, action: { payload: CurrentPageItems }) => {
      const existing = state.currentPage.find((el) => el.id === action.payload.id);
      if (existing) {
        existing.page = action.payload.page; // обновляем страницу
      } else {
        state.currentPage.push(action.payload); // добавляем новый элемент
      }
    },
    changeStatusOfLoading: (state, action: { payload: StatusOfLoading }) => {
      state.loading = action.payload;
    },

    setAppError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});
export default appSlice.reducer;
export const {
  setThemeMode,
  changeStatusOfLoading,
  setAppError,
  loginTC,
  toggleThemeMode,
  setCurrentPage,
} = appSlice.actions;
export const { selectThemeMode, selectLoading, selectError, selectIsLoggedIn } = appSlice.selectors;
