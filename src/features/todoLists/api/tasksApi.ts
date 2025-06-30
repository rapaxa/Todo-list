import { instance } from '@/common/instance/instance.ts';
import type { BaseResponse, DomainTaskBaseResponse } from '@/features/todoLists/api/types.ts';

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<DomainTaskBaseResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<DomainTaskBaseResponse>>(
      `/todo-lists/${todolistId}/tasks`,
      title
    );
  },
  deleteTask(todolistId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`);
  },
};
