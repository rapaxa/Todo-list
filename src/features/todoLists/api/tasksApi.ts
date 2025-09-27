import {
  type DomainTask,
  type DomainTaskBaseResponse,
  getTasksSchema,
  type ServerTaskBaseResponse,
  taskOperationResponseSchema,
  type UpdateTaskModel,
} from '@/features/todoLists/api/types/tasksApi.types.ts';
import { type BaseResponse, type StatusOfLoading } from '@/shared/types';
import { baseApi } from '@/app/api/baseApi.ts';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<
      DomainTaskBaseResponse,
      { todolistId: string; params: { count: number; page: number } }
    >({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params,
      }),
      transformResponse: (todolists: ServerTaskBaseResponse) => {
        return {
          ...todolists,
          items: todolists.items.map((tl) => {
            return { ...tl, entityStatus: 'idle' as StatusOfLoading };
          }),
        };
      },
      extraOptions: { dataSchema: getTasksSchema },
      providesTags: (_result, _error, { todolistId }) => [{ type: 'Tasks', id: todolistId }],
    }),
    createTask: build.mutation<DomainTask, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Tasks', id: todolistId }],
      extraOptions: { dataSchema: taskOperationResponseSchema },
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async ({ todolistId, taskId }, { dispatch, queryFulfilled, getState }) => {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks');
        const patchResult: any[] = [];

        cachedArgsForQuery.forEach(({ params }) => {
          patchResult.push(
            dispatch(
              tasksApi.util.updateQueryData(
                'getTasks',
                {
                  todolistId,
                  params: { count: params.count, page: params.page },
                },
                (state) => {
                  const index = state.items.findIndex((task) => task.id === taskId);
                  if (index !== -1) {
                    state.items.splice(index, 1);
                  }
                }
              )
            )
          );
        });
        try {
          await queryFulfilled;
        } catch {
          patchResult.forEach((patchResult) => {
            patchResult.undo();
          });
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Tasks', id: todolistId }],
    }),
    updateTaskStatus: build.mutation<
      BaseResponse,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method: 'PUT',
          body: model,
        };
      },
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks');
        const patchResult: any[] = [];
        cachedArgsForQuery.forEach(({ params }) => {
          patchResult.push(
            dispatch(
              tasksApi.util.updateQueryData(
                'getTasks',
                {
                  todolistId,
                  params: { count: params.count, page: params.page },
                },
                (state) => {
                  const index = state.items.findIndex((task) => task.id === taskId);
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model };
                  }
                }
              )
            )
          );
        });
        try {
          await queryFulfilled;
        } catch {
          patchResult.forEach((patchResult) => {
            patchResult.undo();
          });
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Tasks', id: todolistId }],
      extraOptions: { dataSchema: taskOperationResponseSchema },
    }),
    updateTaskTitle: build.mutation<
      BaseResponse,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks');
        const patchResult: any[] = [];
        cachedArgsForQuery.forEach(({ params }) => {
          patchResult.push(
            dispatch(
              tasksApi.util.updateQueryData(
                'getTasks',
                {
                  todolistId,
                  params: { count: params.count, page: params.page },
                },
                (state) => {
                  const index = state.items.findIndex((task) => task.id === taskId);
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model };
                  }
                }
              )
            )
          );
        });
        try {
          await queryFulfilled;
        } catch {
          patchResult.forEach((patchResult) => {
            patchResult.undo();
          });
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Tasks', id: todolistId }],
      extraOptions: { dataSchema: taskOperationResponseSchema },
    }),
  }),
});
export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateTaskTitleMutation,
} = tasksApi;
