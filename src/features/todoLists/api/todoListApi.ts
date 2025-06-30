import { instance } from '@/common/instance/instance.ts';
import type { BaseResponse, BaseResponseItem } from '@/features/todoLists/api/types.ts';
import type { DomainTodoWithFilter } from '@/features/todoLists/model/todoLists-reducer.ts';
export const todolistsApi = {
  getTodolists() {
    return instance.get<Array<DomainTodoWithFilter>>('/todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<BaseResponseItem>>('/todo-lists', { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`);
  },
  updateTodolist(payload: { todolistId: string; title: string }) {
    const { title, todolistId } = payload;
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, { title });
  },
};
