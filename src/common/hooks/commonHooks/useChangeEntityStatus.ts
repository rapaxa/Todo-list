// import { useAppDispatch } from '@/common/hooks/commonHooks/useAppDispatch.ts';
// import { todolistsApi } from '@/features/todoLists/api/todoListApi.ts';
// import type { StatusOfLoading } from '@/shared';
//
// export type EntityType = 'todolist' | 'task';
//
// export const useChangeEntityStatus = () => {
//   const dispatch = useAppDispatch();
//
//   return (
//     entityType: EntityType,
//     entityStatus: StatusOfLoading,
//     todolistId?: string,
//   ) => {
//     if (entityType === 'todolist') {
//       dispatch(
//         todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
//           const todo = state.find((tl) => tl.id === todolistId);
//           if (todo) todo.entityStatus = entityStatus;
//         })
//       );
//     // } else if (entityType === 'task' && todolistId) {
//     //   dispatch(
//     //     tasksApi.util.updateQueryData('getTasks', { todolistId,params: }, (state) => {
//     //       if (!state) return;
//     //       state.items.forEach((task) => {
//     //         if (task.id === taskId) {
//     //           task.entityStatus = entityStatus;
//     //         }
//     //       });
//     //     })
//     //   );
//     // }
//   };
// })}
