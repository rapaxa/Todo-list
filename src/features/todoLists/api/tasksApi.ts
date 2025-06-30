import { instance } from '@/common/instance/instance.ts';
import type {
  BaseResponse,
  DomainTask,
  DomainTaskBaseResponse,
  UpdateTaskModel,
} from '@/features/todoLists/api/types.ts';

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<DomainTaskBaseResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, {
      title,
    });
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload;
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload;
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};
