import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { ZodSchema } from 'zod/v4';
import z from 'zod/v4';
import { setAppError } from '@/app/model/app-slice.ts';

type TBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: ZodSchema },
  FetchBaseQueryMeta
>;


export const baseQueryWithZodValidation: (baseQuery: TBaseQuery) => TBaseQuery =
  (baseQuery: TBaseQuery) => async (args, api, extraOptions) => {
    // Call the original baseQuery function with the provided arguments
    const returnValue = await baseQuery(args, api, extraOptions);
    // Retrieve the data schema from the extraOptions object
    const zodSchema = extraOptions?.dataSchema;

    const { data } = returnValue;

    // Check if both 'data' and 'zodSchema' are defined
    if (data && zodSchema) {
      // throws Validation error if the 'data' fails validation.
      try {
        zodSchema.parse(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.table(error.message);
          api.dispatch(setAppError(error.message));
        }
      }
    }

    // Return the original returnValue object
    return returnValue;
  };
