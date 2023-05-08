import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';

function CourseHero({ data }) {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${data.image})`,
        height: '500px',
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={data.image} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component='h1' variant='h3' color='inherit' gutterBottom>
              {data.title}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {data.description}
            </Typography>
            <Link variant='subtitle1' href='#'>
              {data.linkText}
            </Link>
            <br />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

// CourseHero.propTypes = {
//   props: PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageText: PropTypes.string.isRequired,
//     linkText: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default CourseHero;
