import z from 'zod/v4';

const MIN = 5;
const MAX = 12

export const authScheme = z.strictObject({
  email: z.email(),
  password: z
    .string()
    .max(12, { error: `Maximum ${MAX} characters` })
    .min(MIN, { error: `Minimum ${MIN} characters` })
    .max(MAX)
    .trim(),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type AuthScheme = z.infer<typeof authScheme>;
