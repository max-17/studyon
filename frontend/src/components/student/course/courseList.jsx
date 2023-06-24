import { Grid, Container, Typography } from '@mui/material';

import { CourseCard } from 'components/course/courseCard';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../../../axios';

const CourseList = () => {
  const [courses, setCourses] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getCourses = async () => {
      // You can await here
      try {
        const response = await axios.get('student/courses/', {
          headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
        });
        setCourses(() => ({ ...response.data }));
      } catch (error) {
        console.log(error);
        if (error.request.status == 401) {
          navigate('/signin', { replace: true });
        }
      }
    };
    getCourses();
  }, []);

  return (
    <>
      <Typography variant='h4' textAlign='center' mt={3}>
        My Courses
      </Typography>
      <Grid container spacing={2} mt={2}>
        {Object.values(courses).map((course, index) => {
          console.log(course);
          return (
            <Grid item xs={12} sm={6} lg={4} md={6} key={index}>
              <CourseCard {...course} student={true} lectures={course.lectures.length} image={course.coverImg} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CourseList;
