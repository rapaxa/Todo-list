import z from 'zod/v4';

import { baseResponseSchema } from './base';

export const domainTodolistsShema = z.object({
  id: z.string(),
  addedData: z.iso.datetime({ offset: true }).optional(),
  order: z.number(),
  title: z.string(),
});

export const todolistsOperationResponseSchema = baseResponseSchema(
  z.object({
    item: domainTodolistsShema,
  })
);

export const getTodolistSchemaResponse = z.object({
  data: z.object(),
  fieldsErrors: z.array,
  messages: z.array,
  resultCode: z.number(),
});

export const createTodolistResponseSchema = baseResponseSchema(
  z.object({
    item: domainTodolistsShema,
  })
);

export type FilterValues = 'all' | 'completed' | 'active';
export type DomainTodolists = z.infer<typeof domainTodolistsShema>;
export type DomainTodolistsWithStatus = DomainTodolists & {
  filter: FilterValues;
};
export type TodolistsOperationResponse = z.infer<typeof todolistsOperationResponseSchema>;
export type CreateTodolistResponseSchema = z.infer<typeof createTodolistResponseSchema>;
