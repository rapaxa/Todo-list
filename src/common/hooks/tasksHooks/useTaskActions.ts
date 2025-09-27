import {
  useUpdateTaskStatusMutation,
  useUpdateTaskTitleMutation,
} from '@/features/todoLists/api/tasksApi.ts';
import { TaskStatus } from '@/shared/enums';
import type { DomainTask } from '@/features/todoLists/api/types/tasksApi.types.ts';
import { useDeleteItem } from '@/common/hooks/commonHooks/useDeleteItem.ts';
import type { DomainTodolistsWithStatus } from '@/features/todoLists/api/types/todoListApi.types.ts';

export const useTaskActions = (todolist: DomainTodolistsWithStatus, task: DomainTask) => {
  const [updateTaskStatusMutation] = useUpdateTaskStatusMutation();
  const [updateTaskTitleMutation] = useUpdateTaskTitleMutation();
  const { deleteItem } = useDeleteItem();

  const changeTaskStatus = () => {
    const newStatus = task.status === TaskStatus.Completed ? TaskStatus.New : TaskStatus.Completed;
    updateTaskStatusMutation({
      todolistId: todolist.id,
      taskId: task.id,
      model: { ...task, status: newStatus },
    });
  };
  const deleteTask = async () => {
    await deleteItem(todolist.id, task.id);
  };

  const changeTaskTitle = (title: string) => {
    updateTaskTitleMutation({
      todolistId: todolist.id,
      taskId: task.id,
      model: { ...task, title },
    });
  };

  return { changeTaskStatus, deleteTask, changeTaskTitle };
};
