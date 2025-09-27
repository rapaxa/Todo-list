import { useAppSelector } from '@/common/hooks/commonHooks/useAppSelector.ts';
import { CircularProgressWithLabel } from '@/common/components';
import { Box, Stack, Typography } from '@mui/material';
import { selectThemeMode } from '@/app/model/app-slice.ts';
import { useCounterOfTasks } from '@/common/hooks/tasksHooks/useCounterOfTasks.ts';
import { TaskStatus } from '@/shared/enums';

export const Counter = ({ todolistId, page }: { todolistId: string; page: number }) => {
  const currentTheme = useAppSelector(selectThemeMode);

  const allTasks = useCounterOfTasks(todolistId, page);
  const activeCount = useCounterOfTasks(todolistId, TaskStatus.New, page);
  const completedCount = useCounterOfTasks(todolistId, TaskStatus.Completed, page);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: currentTheme === 'dark' ? 'grey.900' : 'grey.100',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
        <CircularProgressWithLabel
          value={completedCount.countedTasks}
          maxValue={allTasks.allTasks}
        />

        <Stack direction="column" spacing={1} alignItems="center">
          <Typography variant="subtitle2" color="text.secondary">
            Active
          </Typography>
          <Typography variant="h6">{activeCount.countedTasks}</Typography>
        </Stack>

        <Stack direction="column" spacing={1} alignItems="center">
          <Typography variant="subtitle2" color="text.secondary">
            Completed
          </Typography>
          <Typography variant="h6">{completedCount.countedTasks}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
