import { createAppSlice } from '@/common/utils/createAppSlice.ts';
import { todolistsApi } from '@/features/todoLists/api/todoListApi.ts';
import type { DomainTodolists } from '@/common/types';

export const todoListSlice = createAppSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as DomainTodoWithFilter[],
  },
  reducers: (create) => ({
    fetchTodolists: create.asyncThunk(
      async (_arg, thunkAPI) => {
        try {
          const data = await todolistsApi.getTodolists();
          return data.data;
        } catch (err) {
          return thunkAPI.rejectWithValue(err);
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
      async (title: string, thunkAPI) => {
        try {
          const res = await todolistsApi.createTodolist(title);
          return res.data.data.item;
        } catch (err) {
          return thunkAPI.rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          state.todolists.push({ ...action.payload, order: 0, addedData: '', filter: 'all' });
        },
      }
    ),
    deleteTodolist: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const data = await todolistsApi.deleteTodolist(todolistId);

          return { todolistId, res: data.data.data };
        } catch (err) {
          return thunkAPI.rejectWithValue(err);
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
export const { fetchTodolists, createTodolist, deleteTodolist } = todoListSlice.actions;
export const { selectTodolist } = todoListSlice.selectors;
export type DomainTodoWithFilter = DomainTodolists & {
  filter: FilterTypes;
};
type FilterTypes = 'all' | 'completed' | 'active';
