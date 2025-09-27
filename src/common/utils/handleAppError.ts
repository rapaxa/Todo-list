import { changeStatusOfLoading, setAppError } from '@/app/model/app-slice.ts';

import type { Dispatch } from '@reduxjs/toolkit';
import type { BaseResponse } from '@/shared/types';

export const handleAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]));
  } else {
    dispatch(setAppError('Some error occurred'));
  }

  dispatch(changeStatusOfLoading('failed'));
};
