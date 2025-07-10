import {
  changeEntityStatus,
  createTodolist,
  deleteTodolist,
} from '@/features/todoLists/model/todolists-slice.ts';
import { createAppSlice } from '@/common/utils/createAppSlice.ts';
import { tasksApi } from '@/features/todoLists/api/tasksApi.ts';
import { DomainTask, TaskStatus, UpdateTaskModel } from '@/features/todoLists/api/types.ts';
import { RootState } from '@/app/store.ts';
import { changeStatusOfLoading } from '@/app/app-slice.ts';
import { handleServerError } from '@/common/utils/handleServerError.ts';
import { ResultCode } from '@/common/enums/enums.ts';
import { handleAppError } from '@/common/utils/handleAppError.ts';

export const todoItemsSlice = createAppSlice({
  name: 'todoTasks',
  initialState: {
    tasks: {} as TasksState,
  },
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusOfLoading('pending'));
          const data = await tasksApi.getTasks(todolistId);
          if (data.status >= 200 && data.status < 300) {
            dispatch(changeStatusOfLoading('succeeded'));
            return { todolistId, res: data.data.items };
          } else {
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
          state.tasks[action.payload.todolistId] = action.payload.res || [];
        },
      }
    ),
    changeTaskStatus: create.asyncThunk(
      async (
        payload: { todolistId: string; taskId: string; status: TaskStatus },
        { dispatch, getState, rejectWithValue }
      ) => {
        const { todolistId, taskId, status } = payload;

        const allTodolistTasks = (getState() as RootState).todoTasks.tasks[todolistId];
        const task = allTodolistTasks.find((task) => task.id === taskId);

        if (!task) {
          return rejectWithValue(null);
        }
        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status,
        };
        try {
          dispatch(changeStatusOfLoading('pending'));
          dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'pending' }));
          const res = await tasksApi.updateTaskStatus({ todolistId, taskId, model });
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusOfLoading('succeeded'));
            dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'succeeded' }));
            return { task: res.data.data.item };
          } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          dispatch(changeStatusOfLoading('failed'));
          dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'failed' }));
          handleServerError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state.tasks[action.payload.task.todoListId].find(
            (task) => task.id === action.payload.task.id
          );
          if (task) {
            task.status = action.payload.task.status;
          }
        },
      }
    ),

    deleteTaskItem: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusOfLoading('pending'));
          dispatch(changeEntityStatus({ id: payload.todolistId, entityStatus: 'pending' }));
          const res = await tasksApi.deleteTask(payload);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeEntityStatus({ id: payload.todolistId, entityStatus: 'succeeded' }));
            dispatch(changeStatusOfLoading('succeeded'));
            return { todolistId: payload.todolistId, taskId: payload.taskId };
          } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (err) {
          dispatch(changeStatusOfLoading('failed'));
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.tasks[action.payload.todolistId].findIndex(
            (item) => item.id === action.payload.taskId
          );
          if (index !== -1) state.tasks[action.payload.todolistId].splice(index, 1);
        },
      }
    ),
    dnd: create.reducer<{ todolistId: string; draggedIndex: number; targetIndex: number }>(
      (state, action) => {
        const { todolistId, draggedIndex, targetIndex } = action.payload;
        const list = state.tasks[todolistId];
        [list[draggedIndex], list[targetIndex]] = [list[targetIndex], list[draggedIndex]];
      }
    ),
    createTodoItem: create.asyncThunk(
      async (arg: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusOfLoading('pending'));
          dispatch(changeEntityStatus({ id: arg.todolistId, entityStatus: 'pending' }));
          const res = await tasksApi.createTask(arg.todolistId, arg.title);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusOfLoading('succeeded'));

            dispatch(changeEntityStatus({ id: arg.todolistId, entityStatus: 'succeeded' }));
            return { todolistId: arg.todolistId, task: res.data.data.item };
          } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (err) {
          dispatch(changeEntityStatus({ id: arg.todolistId, entityStatus: 'failed' }));
          dispatch(changeStatusOfLoading('failed'));

          handleServerError(err, dispatch);
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId } = action.payload;
          state.tasks[todolistId].unshift(action.payload.task);
        },
      }
    ),

    changeTaskTitle: create.asyncThunk(
      async (
        payload: { todolistId: string; taskId: string; title: string },
        { dispatch, rejectWithValue, getState }
      ) => {
        const { todolistId, taskId, title } = payload;
        const allTodolistTasks = (getState() as RootState).todoTasks.tasks[todolistId];
        const task = allTodolistTasks.find((task) => task.id === taskId);
        if (!task) {
          return rejectWithValue(null);
        }
        const model = {
          description: task.description,
          title: title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: task.status,
        };
        try {
          dispatch(changeStatusOfLoading('pending'));
          dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'pending' }));

          const res = await tasksApi.updateTaskTitle({ todolistId, taskId, model });
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'succeeded' }));
            dispatch(changeStatusOfLoading('succeeded'));
            return { todolistId, taskId, res: res.data.data.item };
          } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (err) {
          dispatch(changeStatusOfLoading('failed'));
          dispatch(changeEntityStatus({ id: todolistId, entityStatus: 'failed' }));
          handleServerError(err, dispatch);
          return rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, taskId, res } = action.payload;
          const task = state.tasks[todolistId].find((item) => item.id === taskId);
          if (task) {
            task.title = res.title;
          }
        },
      }
    ),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.tasks[action.payload.id] = [];
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state.tasks[action.payload.todolistId];
      });
  },
  selectors: {
    selectTodoTasks: (state) => state.tasks,
  },
});

export const {
  createTodoItem,
  fetchTasks,
  changeTaskStatus,
  deleteTaskItem,
  changeTaskTitle,
  dnd,
} = todoItemsSlice.actions;
export const { selectTodoTasks } = todoItemsSlice.selectors;
export const todolistItemsSlice = todoItemsSlice;

type TasksState = Record<string, DomainTask[]>;
