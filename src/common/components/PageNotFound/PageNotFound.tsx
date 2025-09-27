import styles from './PageNotFound.module.css';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router';

export const PageNotFound = () => (
  <Grid
    container
    flexDirection={'column'}
    justifyContent={'center'}
    alignContent={'center'}
    alignItems={'center'}
    marginTop={'10%'}
  >
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Grid container justifyContent={'center'}>
      <Button component={Link} to={'/'} variant={'contained'}>
        Return to main page
      </Button>
    </Grid>
  </Grid>
);
