import { createAppSlice } from '@/common/utils/createAppSlice.ts';
import { todolistsApi } from '@/features/todoLists/api/todoListApi.ts';
import type { DomainTodolists } from '@/common/types';
import { changeStatus } from '@/app/app-slice.ts';

export const todoListSlice = createAppSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as DomainTodoWithFilter[],
  },
  reducers: (create) => ({
    fetchTodolists: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatus('loading'));
          const data = await todolistsApi.getTodolists();
          dispatch(changeStatus('succeeded'));
          return data.data;
        } catch (err) {
          dispatch(changeStatus('failed'));
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const filter = 'all';
          state.todolists = action.payload.map((item) => ({
            ...item,
            filter,
          }));
        },
      }
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatus('loading'));
          const res = await todolistsApi.createTodolist(title);
          dispatch(changeStatus('succeeded'));
          return res.data.data.item;
        } catch (err) {
          dispatch(changeStatus('failed'));
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          state.todolists.push({ ...action.payload, order: 0, addedData: '', filter: 'all' });
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
          dispatch(changeStatus('loading'));
          const data = await todolistsApi.deleteTodolist(todolistId);
          dispatch(changeStatus('succeeded'));
          return { todolistId, res: data.data.data };
        } catch (err) {
          dispatch(changeStatus('failed'));
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
  }),
  selectors: {
    selectTodolist: (state) => state.todolists,
  },
});
export default todoListSlice.reducer;
export const { fetchTodolists, createTodolist, deleteTodolist, changeTodolistFilterAC } =
  todoListSlice.actions;
export const { selectTodolist } = todoListSlice.selectors;
export type DomainTodoWithFilter = DomainTodolists & {
  filter: FilterTypes;
};
type FilterTypes = 'all' | 'completed' | 'active';
