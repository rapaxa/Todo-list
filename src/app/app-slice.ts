import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as StatusType,
  },
  reducers: (create) => ({
    changeThemeMode: create.reducer((state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    }),
    changeStatus: create.reducer<StatusType>((state, action) => {
      state.status = action.payload;
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
  },
});
export default appSlice.reducer;
export const { changeThemeMode, changeStatus } = appSlice.actions;
export const { selectThemeMode, selectStatus } = appSlice.selectors;

export type ThemeMode = 'light' | 'dark';
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
