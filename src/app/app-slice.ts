import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    loading: 'idle' as StatusOfLoading,
    error: null as string | null,
  },
  reducers: {
    changeThemeMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
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
  },
});
export default appSlice.reducer;
export const { changeThemeMode, changeStatusOfLoading, setAppError } = appSlice.actions;
export const { selectThemeMode, selectLoading, selectError } = appSlice.selectors;

export type ThemeMode = 'light' | 'dark';
export type StatusOfLoading = 'idle' | 'pending' | 'succeeded' | 'failed';
