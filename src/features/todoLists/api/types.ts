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
