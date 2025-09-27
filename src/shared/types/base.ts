import z from 'zod/v4';
import { ResultCode } from '@/shared/enums';

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
});

export type FieldError = z.infer<typeof fieldErrorSchema>;

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array().optional(),
  });

export interface BaseResponse<T = object> {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors?: FieldError[];
}