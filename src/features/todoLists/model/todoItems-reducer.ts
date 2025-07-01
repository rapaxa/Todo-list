import { createTodolist, deleteTodolist } from '@/features/todoLists/model/todoLists-reducer.ts';
import { createAppSlice } from '@/common/utils/createAppSlice.ts';
import { tasksApi } from '@/features/todoLists/api/tasksApi.ts';
import { DomainTask, TaskStatus, UpdateTaskModel } from '@/features/todoLists/api/types.ts';
import { RootState } from '@/app/store.ts';
import { changeStatus } from '@/app/app-slice.ts';

export const todoItemsSlice = createAppSlice({
  name: 'todoTasks',
  initialState: {
    tasks: {} as TasksState,
    activeTasks: {} as Record<string, number>,
    completedTasks: {} as Record<string, number>,
    isLoading: 'idle',
  },
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatus('loading'));

          const data = await tasksApi.getTasks(todolistId);
          dispatch(changeStatus('succeeded'));

          return { todolistId, res: data.data.items };
        } catch (err) {
          dispatch(changeStatus('failed'));

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
        { rejectWithValue, getState }
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
          const res = await tasksApi.updateTaskStatus({ todolistId, taskId, model });
          return { task: res.data.data.item };
        } catch (error) {
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
          dispatch(changeStatus('loading'));

          await tasksApi.deleteTask(payload);
          dispatch(changeStatus('succeeded'));

          return { todolistId: payload.todolistId, taskId: payload.taskId };
        } catch (err) {
          dispatch(changeStatus('failed'));

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
      async (arg: { todolistId: string; title: string }, { rejectWithValue }) => {
        try {
          const res = await tasksApi.createTask(arg.todolistId, arg.title);

          return { todolistId: arg.todolistId, task: res.data.data.item };
        } catch (err) {
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

export const { createTodoItem, fetchTasks, changeTaskStatus, deleteTaskItem, dnd } =
  todoItemsSlice.actions;
export const { selectTodoTasks } = todoItemsSlice.selectors;
export const todoItemsReducer = todoItemsSlice;

type TasksState = Record<string, DomainTask[]>;
