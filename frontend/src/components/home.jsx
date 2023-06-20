import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Button, ButtonGroup, Container, Fab, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { LinkButton, ScrollTop, fetchData } from './utils';
import { CourseCard } from './course/courseCard';

import Footer from './footer';
import theme from './theme';
import { useNavigate } from 'react-router-dom';
import Courses from './public/courses';

const Home = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    fetchData('courses/', setData);
    console.log(data);
  }, []);

  return (
    <Container>
      {/* hero section */}
      <Grid
        container
        mX={3}
        pt={5}
        justifyContent='space-around'
        alignItems='center'
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        <Grid item xs={8} md={5}>
          <Typography variant='body1' pt={2} px={1} color='primary'>
            Start your favourite course
          </Typography>
          <Typography variant='h4' p={1} color='initial'>
            Now learning from anywhere, and build your bright career.
          </Typography>
          <Typography variant='body1' py={3} px={1} color='grey'>
            It has survived not only five centuries but also the leap into electronic typesetting.
          </Typography>
          <LinkButton to='signup' variant='contained' size='large'>
            Start A Course
          </LinkButton>
        </Grid>
        <Grid item xs={5} md={0}>
          <img src='./images/shape-9.png' width='100%' />
        </Grid>
        <Grid item xs={7} md={6} order={2}>
          <img src='./images/slider-1.png' width='100%' />
        </Grid>
      </Grid>

      {/* hero section end */}

      <Grid container spacing={3} style={{ margin: '1rem' }}>
        <Courses />
      </Grid>
      {/* scroll to top button */}
      <ScrollTop {...props}>
        <Fab size='small' aria-label='scroll back to top' color='primary'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <ButtonGroup variant='outlined' color='primary' aria-label='' sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button>1</Button>
        <Button>2</Button>
      </ButtonGroup>
      <Footer />
    </Container>
  );
};
export default Home;
