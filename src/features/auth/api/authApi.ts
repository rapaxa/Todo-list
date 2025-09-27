import type { CreateAuthResponse, MeSchema } from '@/features/auth/api/authApi.types.ts';
import type { AuthScheme } from '@/features/auth/lib/schemes/authScheme.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import type { BaseResponse } from '@/shared/types';
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    captcha: build.query<{ url: string }, void>({
      query: () => 'security/get-captcha-url',
    }),
    login: build.mutation<CreateAuthResponse, AuthScheme>({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: `/auth/login`,
        method: 'DELETE',
      }),
    }),
    me: build.query<MeSchema, void>({
      query: () => '/auth/me',
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation, useMeQuery, useCaptchaQuery } = authApi;
