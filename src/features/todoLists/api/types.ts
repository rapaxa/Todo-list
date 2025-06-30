import type { DomainTodolists } from '@/common/types';

export type BaseResponse<T = object> = {
  data: T;
  resultCode: number;
  messages: string[];
};
export type BaseResponseItem = { item: DomainTodolists };
export type DomainTask = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type DomainTaskBaseResponse = {
  items: DomainTask[];
  totalCount: number;
  errors: string;
};
export type UpdateTaskModel = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};
export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
