import { Grid, Container } from '@mui/material';

import { CourseCard } from 'components/course/courseCard';

const CourseList = () => {
  return (
    <>
      <Container maxWidth='full'>
        <Grid container spacing={2}>
          {Object.values(data).map((course, index) => {
            console.log(course);
            return (
              <Grid item xs={12} sm={6} lg={4} md={6} key={index}>
                <CourseCard {...course} lectures={course.lectures.length} image={course.coverImg} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default CourseList;
