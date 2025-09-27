import { useDeleteTodolistMutation } from '@/features/todoLists/api/todoListApi.ts';
import { useDeleteTaskMutation } from '@/features/todoLists/api/tasksApi.ts';

export const useDeleteItem = () => {
  const [deleteTodolistMutation] = useDeleteTodolistMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const deleteItem = async (todolistId: string, taskId?: string) => {
    try {
      if (taskId) {
        await deleteTaskMutation({ todolistId: todolistId, taskId });
      } else {
        await deleteTodolistMutation(todolistId);
      }
    } catch (err) {
      console.error('Some errors in delete:', err);
    }
  };

  return { deleteItem };
};
