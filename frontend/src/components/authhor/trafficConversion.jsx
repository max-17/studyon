import { Button, Grid, Paper, Typography } from '@mui/material';
import { Chart } from '../lineChart';

import theme from '../theme';

const TrafficConversion = () => {
  return (
    <>
      <Grid container spacing={1} alignContent='space-between'>
        <Grid item xs={4}>
          <Button variant='outlined' color='inherit'>
            All Courses
          </Button>
        </Grid>
        <Grid item xs={8} container gap={2} justifyContent='end'>
          <Paper sx={{ bgcolor: theme.palette.info.light, paddingX: 1.5, paddingY: 1 }}>
            <Typography variant='body2' color='initial'>
              Total Revenue
            </Typography>
            <Typography variant='h5' color='initial'>
              $580.00
            </Typography>
            <Typography variant='body2' color='initial'>
              $235.00 This month
            </Typography>
          </Paper>
          <Paper sx={{ bgcolor: theme.palette.primary.light, paddingX: 1.5, paddingY: 1 }}>
            <Typography variant='body2' color='initial'>
              Total Revenue
            </Typography>
            <Typography variant='h5' color='initial'>
              $580.00
            </Typography>
            <Typography variant='body2' color='initial'>
              $235.00 This month
            </Typography>
          </Paper>
          <Paper sx={{ bgcolor: theme.palette.warning.light, paddingX: 1.5, paddingY: 1 }}>
            <Typography variant='body2' color='initial'>
              Total Revenue
            </Typography>
            <Typography variant='h5' color='initial'>
              $580.00
            </Typography>
            <Typography variant='body2' color='initial'>
              $235.00 This month
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Chart />
      <Typography variant='body1' textAlign='center' padding={4}>
        <Button variant='contained' size='large' color='primary'>
          Revenue Report
        </Button>
      </Typography>
    </>
  );
};

export default TrafficConversion;
