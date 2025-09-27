import z from 'zod/v4';
import { TaskPriority, TaskStatus } from '@/shared/enums';

import { baseResponseSchema } from './base';

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
});

export const getTasksSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().nullable(),
  items: z.array(domainTaskSchema),
});

export const taskOperationResponseSchema = baseResponseSchema(
  z.object({
    item: domainTaskSchema,
  })
);

export type ServerTask = z.infer<typeof domainTaskSchema>;
export type DomainTask = z.infer<typeof domainTaskSchema>;

export interface ServerTaskBaseResponse {
  items: ServerTask[];
  totalCount: number;
  errors: string;
}

export interface DomainTaskBaseResponse {
  items: DomainTask[];
  totalCount: number;
  errors: string;
}

export type UpdateTaskModel = Pick<
  DomainTask,
  'description' | 'title' | 'status' | 'priority' | 'startDate' | 'deadline'
>;
