import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
  },
  reducers: {
    changeThemeMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
});
export default appSlice.reducer;
export const { changeThemeMode } = appSlice.actions;
export const { selectThemeMode } = appSlice.selectors;

export type ThemeMode = 'light' | 'dark';
