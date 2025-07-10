import { changeStatusOfLoading, setAppError } from '@/app/app-slice';

import type { Dispatch } from '@reduxjs/toolkit';
import type { BaseResponse } from '@/features/todoLists/api/types.ts';

export const handleAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]));
  } else {
    dispatch(setAppError('Some error occurred'));
  }

  dispatch(changeStatusOfLoading('failed'));
};
