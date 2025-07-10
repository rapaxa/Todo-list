import type { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { changeStatusOfLoading, setAppError } from '@/app/app-slice.ts';

export const handleServerError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = 'unknown error';

  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    errorMessage = serverMessage ?? error.message ?? errorMessage;
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`;
  } else {
    errorMessage = `Unexpected error: ${JSON.stringify(error)}`;
  }

  dispatch(setAppError(errorMessage));
  dispatch(changeStatusOfLoading('failed'));
};
