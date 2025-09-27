import { AUTH_TOKEN } from '@/common/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleError } from '@/common/utils/handleError.ts';
import { baseQueryWithZodValidation } from '@/common/utils';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;
export const baseApi = createApi({
  reducerPath: 'appTodolist',
  tagTypes: ['Todolist', 'Tasks'],
  baseQuery: baseQueryWithZodValidation(async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: baseUrl,
      credentials: 'include',
      prepareHeaders: (headers) => {
        headers.set('API-KEY', apiKey);
        const token = localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);
        headers.set('Authorization', `Bearer ${token}`);
      },
    })(args, api, extraOptions);

    handleError(api, result);
    return result;
  }),

  endpoints: () => ({}),
});
