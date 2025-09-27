import {
  createTodolistResponseSchema,
  type CreateTodolistResponseSchema,
  domainTodolistsShema,
  getTodolistSchemaResponse,
  type TodolistsOperationResponse,
} from '@/features/todoLists/api/types/todoListApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import type { DomainTodolists, DomainTodolistsWithStatus } from '@/features/todoLists/lib/types';

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolistsWithStatus[], void>({
      query: () => '/todo-lists',
      transformResponse: (todolists: DomainTodolists[]) => {
        return todolists.map((tl) => {
          return { ...tl, filter: 'all' };
        });
      },
      providesTags: ['Todolist'],
      extraOptions: { dataSchema: domainTodolistsShema.array() },
    }),
    createTodolist: build.mutation<CreateTodolistResponseSchema, string>({
      query: (title) => ({
        url: '/todo-lists',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
      extraOptions: { dataSchema: createTodolistResponseSchema },
    }),
    deleteTodolist: build.mutation<TodolistsOperationResponse, string>({
      query: (todolistId) => ({
        url: `/todo-lists/${todolistId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (todolistId, { dispatch, queryFulfilled }) => {
        const pathResult = dispatch(
          todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === todolistId);
            if (index !== -1) {
              state.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          console.log('Error in delete Todolist', err);
          pathResult.undo();
        }
      },
      invalidatesTags: ['Todolist'],
    }),
    updateTodolist: build.mutation<
      TodolistsOperationResponse,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}`,
        method: 'PUT',
        body: { title },
      }),
      onQueryStarted: async ({ todolistId, title }, { dispatch, queryFulfilled }) => {
        const pathResult = dispatch(
          todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
            state.map((el) => (el.id === todolistId ? (el.title = title) : null));
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          console.log('Error in update Todolist', err);
          pathResult.undo();
        }
      },
      invalidatesTags: ['Todolist'],
      extraOptions: { dataSchema: getTodolistSchemaResponse },
    }),
  }),
});
export const {
  useGetTodolistsQuery,
  useDeleteTodolistMutation,
  useCreateTodolistMutation,
  useUpdateTodolistMutation,
} = todolistsApi;
