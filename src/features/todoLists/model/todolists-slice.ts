import { createAppSlice } from '@/common/utils/createAppSlice.ts';
import { todolistsApi } from '@/features/todoLists/api/todoListApi.ts';
import type { DomainTodolists } from '@/common/types';
import { changeStatusOfLoading, type StatusOfLoading } from '@/app/app-slice.ts';
import { handleServerError } from '@/common/utils/handleServerError.ts';
import { ResultCode } from '@/common/enums/enums.ts';
import { handleAppError } from '@/common/utils/handleAppError.ts';

export const todoListSlice = createAppSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as DomainTodolist[],
  },
  reducers: (create) => ({
    fetchTodolists: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          const res = await todolistsApi.getTodolists();
          dispatch(changeStatusOfLoading('pending'));

          if (res.status >= 200 && res.status < 300) {
            dispatch(changeStatusOfLoading('succeeded'));
            return { todolists: res.data };
          } else {
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerError(error, dispatch);
          dispatch(changeStatusOfLoading('failed'));
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.todolists = action.payload.todolists.map((item) => ({
            ...item,
            filter: 'all',
            entityStatus: 'idle',
          }));
        },
      }
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusOfLoading('pending'));
          const res = await todolistsApi.createTodolist(title);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusOfLoading('succeeded'));
            return res.data.data.item;
          } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (err) {
          dispatch(changeStatusOfLoading('failed'));
          handleServerError(err, dispatch);
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          state.todolists.push({
            ...action.payload,
            order: 0,
            addedData: '',
            filter: 'all',
            entityStatus: 'idle',
          });
        },
      }
    ),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterTypes }>((state, action) => {
      const todolist = state.todolists.find((todolist) => todolist.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
    deleteTodolist: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusOfLoading('pending'));
          dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'pending' }));
          const res = await todolistsApi.deleteTodolist(todolistId);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'succeeded' }));
            dispatch(changeStatusOfLoading('succeeded'));
            return { todolistId, res: res.data.data };
          } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (err) {
          dispatch(changeStatusOfLoading('failed'));
          handleServerError(err, dispatch);
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId);
          if (index !== -1) state.todolists.splice(index, 1);
        },
      }
    ),
    changeEntityStatus: create.reducer<{ id: string; entityStatus: StatusOfLoading }>(
      (state, action) => {
        const todolist = state.todolists.find((todo) => todo.id === action.payload.id);
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus;
        }
      }
    ),
    changeTodolistTitle: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusOfLoading('pending'));
          const res = await todolistsApi.updateTodolist(payload);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusOfLoading('succeeded'));
            return { todolistId: payload.todolistId, title: payload.title, res: res.data.data };
          } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (err) {
          dispatch(changeStatusOfLoading('failed'));
          handleServerError(err, dispatch);
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, title } = action.payload;
          const todolist = state.todolists.find((item) => item.id === todolistId);
          if (todolist) {
            todolist.title = title;
          }
        },
      }
    ),
  }),

  selectors: {
    selectTodolist: (state) => state.todolists,
  },
});
export default todoListSlice.reducer;
export const {
  fetchTodolists,
  createTodolist,
  deleteTodolist,
  changeTodolistFilterAC,
  changeTodolistTitle,
  changeEntityStatus,
} = todoListSlice.actions;
export const { selectTodolist } = todoListSlice.selectors;
export type DomainTodolist = DomainTodolists & {
  filter: FilterTypes;
  entityStatus: StatusOfLoading;
};
type FilterTypes = 'all' | 'completed' | 'active';
