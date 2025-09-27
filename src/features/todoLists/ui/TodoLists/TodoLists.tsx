import { motion } from 'framer-motion';
import { TodoListItems } from '@/features/todoLists/ui/TodoLists/TodoListItems/TodoListItems.tsx';
import { Grid } from '@mui/material';
import { useGetTodolistsQuery } from '@/features/todoLists/api/todoListApi.ts';
import { TodolistSkeleton } from '@/features/todoLists/ui/TodoLists/TodolistSkeleton/TodolistSkeleton.tsx';
import { containerSx } from '@/common/components/Header/styles.ts';
import Box from '@mui/material/Box';

export const TodoLists = () => {
  const { data, isLoading } = useGetTodolistsQuery();

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    );
  }

  return (
    <Grid container>
      {data?.map((item) => (
        <motion.div
          key={item.id}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <TodoListItems {...item} />
        </motion.div>
      ))}
    </Grid>
  );
};
