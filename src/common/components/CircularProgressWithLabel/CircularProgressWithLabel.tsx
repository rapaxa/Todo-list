import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number; maxValue: number }
) => {
  const { value, maxValue, ...rest } = props;
  const percentage = maxValue === 0 ? 0 : (value / maxValue) * 100;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={percentage} {...rest} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption"> {`${Math.round(percentage)}%`}</Typography>
      </Box>
    </Box>
  );
};
