import z from 'zod/v4';
import { baseResponseSchema } from './base';

export const createAuthResponseSchema = baseResponseSchema(
  z.object({
    userId: z.number(),
    token: z.string(),
  })
);

export const meSchema = baseResponseSchema(
  z.object({
    id: z.number(),
    email: z.string(),
    login: z.string(),
  })
);

export type MeSchema = z.infer<typeof meSchema>;
export type CreateAuthResponse = z.infer<typeof createAuthResponseSchema>;