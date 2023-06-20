import { Grid, OutlinedInput, Typography, InputAdornment, Button } from '@mui/material';
import { CourseCard } from 'components/course/courseCard';
import { fetchData } from 'components/utils';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import theme from 'components/theme';
import { Route, Routes } from 'react-router-dom';
import CourseDescription from './courseDescription';

const Courses = () => {
  const [data, setData] = useState();
  const [courseIndex, setCourseIndex] = useState();

  useEffect(() => {
    fetchData('courses/', setData);
    // console.log(data);
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
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
            <Grid container spacing={3} style={{ margin: '1rem' }}>
              {data &&
                data.map((course, index) => {
                  console.log(course);
                  return (
                    <Grid item xs={12} sm={6} lg={4} md={6} key={index}>
                      <CourseCard
                        handleClick={() => setCourseIndex(index)}
                        {...course}
                        lectures={course.lectures.length}
                        image={course.coverImg}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </>
        }
      />
      {data && <Route path='/:courseId' element={<CourseDescription {...data[courseIndex]} />} />}
      {/* <Route path='/*' element={<PageNotFound />} /> */}
    </Routes>
  );
};

export default Courses;
