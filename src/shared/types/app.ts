export type ThemeMode = 'light' | 'dark';
export type StatusOfLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface CurrentPageItems {
  id: string;
  page: number;
}