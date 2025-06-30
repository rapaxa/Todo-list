import { createTodolist, deleteTodolist } from '@/features/todoLists/model/todoLists-reducer.ts';
import { createAppSlice } from '@/common/utils/createAppSlice.ts';
import { tasksApi } from '@/features/todoLists/api/tasksApi.ts';
import type { DomainTask } from '@/features/todoLists/api/types.ts';

type TasksState = Record<string, DomainTask[]>;

export const todoItemsSlice = createAppSlice({
  name: 'todoTasks',
  initialState: {} as TasksState,
  reducers: (create) => ({
    // createTodoItem: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
    //   const newItem = { id: nanoid(), title: action.payload.title, done: false };
    //   state[action.payload.todolistId].unshift(newItem);
    // },PayloadAction<{
    //         todolistId: string;
    //         id: string;
    //         done: boolean;
    //       }>
    fetchTasks: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const data = await tasksApi.getTasks(todolistId);
          return { todolistId, res: data.data.items };
        } catch (err) {
          return thunkAPI.rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, res } = action.payload;
          state[todolistId] = res || [];
        },
      }
    ),
    changeTaskStatus: create.reducer<{ todolistId: string; id: string; done: boolean }>(
      (state, action) => {
        const task = state[action.payload.todolistId]?.find(
          (task) => task.id === action.payload.id
        );
        if (task) {
          task.done = action.payload.done;
        }
      }
    ),
    deleteTaskItem: create.reducer<{ todolistId: string; id: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1);
      }
    }),
    dnd: create.reducer<{ todolistId: string; draggedIndex: number; targetIndex: number }>(
      (state, action) => {
        const { todolistId, draggedIndex, targetIndex } = action.payload;
        const list = state[todolistId];
        [list[draggedIndex], list[targetIndex]] = [list[targetIndex], list[draggedIndex]];
      }
    ),
    createTodoItem: create.asyncThunk(
      async (arg: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const data = await tasksApi.createTask(arg.todolistId, arg.title);
          return { todolistId: arg.todolistId, res: data.data.data.items };
        } catch (err) {
          return thunkAPI.rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, res } = action.payload;
          state[todolistId] = state[todolistId].map((item) => ({
            ...item,
            res,
          }));
        },
      }
    ),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      });
  },
  selectors: {
    selectTodoTasks: (state) => state,
  },
});

export const { createTodoItem, fetchTasks, changeTaskStatus, deleteTaskItem, dnd } =
  todoItemsSlice.actions;
export const { selectTodoTasks } = todoItemsSlice.selectors;
export const todoItemsReducer = todoItemsSlice.reducer;
