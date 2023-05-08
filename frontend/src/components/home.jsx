import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Button,
  TextField,
  ButtonGroup,
  Container,
  Fab,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { ScrollTop } from './utils';
import { CourseCard } from './course/courseCard';

import Footer from './footer';
import theme from './theme';

const Home = (props) => {
  // const navigate = useNavigate();
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
          <Button variant='contained' size='large'>
            Start A Course
          </Button>
        </Grid>
        <Grid item xs={5} md={0}>
          <img src='./images/shape-9.png' width='100%' />
        </Grid>
        <Grid item xs={7} md={6} order={2}>
          <img src='./images/slider-1.png' width='100%' />
        </Grid>
      </Grid>

      {/* hero section end */}

      {/* searchbar */}

      <Grid container justifyContent={'center'} mt={2} p={4}>
        <Grid item sm={6} xs={12}>
          <Typography variant='h4'>All Courses of Study-On</Typography>
        </Grid>
        <Grid item xs={12} sm={6} height='100'>
          <OutlinedInput
            id='outlined-adornment-weight'
            sx={{ width: '100%' }}
            endAdornment={
              <InputAdornment position='end'>
                <Button sx={{ background: theme.palette.primary.line, padding: 1 }}>
                  <SearchIcon />
                </Button>
              </InputAdornment>
            }
            aria-describedby='outlined-weight-helper-text'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </Grid>
      </Grid>

      {/* searchbar end */}

      <Grid container spacing={3} style={{ margin: '1rem' }}>
        {courses.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CourseCard {...data} />
          </Grid>
        ))}
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

const courses = [
  {
    author: 'Jason Willams',
    title: 'Data Science and Machine Learning with Python -Hands On!',
    image: 'images/courses-01.jpg',
    authorIcon: 'images/author-01.jpg',
    rating: 4,
    price: '$299.00',
    duration: '08 hr 15 mins',
    lectures: 14,
  },
  {
    author: 'Pamella Foster',
    title: 'Create Amazing Color Schemes for Your UX Design Projects',
    image: 'images/courses-02.jpg',
    authorIcon: 'images/author-02.jpg',
    rating: 5,
    price: '$229.00',
    duration: '08 hr 15 mins',
    lectures: 14,
  },
  {
    author: 'Rose Simmons',
    title: 'Culture & Leadership: Strategies for a Successful Business',
    image: 'images/courses-03.jpg',
    authorIcon: 'images/author-03.jpg',
    rating: 3,
    price: 'Free',
    duration: '08 hr 15 mins',
    lectures: 14,
  },
  {
    author: 'Anna Maria',
    title: 'Finance Series: Learn to Budget and Calculate your Net Worth.',
    image: 'images/courses-04.jpg',
    authorIcon: 'images/author-04.jpg',
    rating: 4,
    price: '$136.00',
    duration: '08 hr 15 mins',
    lectures: 14,
  },
];
