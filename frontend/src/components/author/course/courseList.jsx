import { Add } from '@mui/icons-material';
import { Button, TextField, Grid, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { fetchData } from '../../utils';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from 'components/course/courseCard';

const AuthorCourseList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const newCourseRef = useRef();

  useEffect(() => {
    fetchData('author/courses/', setData);
  }, []);

  const handleSubmit = async () => {
    await axios.post('author/courses/', { title: newCourseRef.current.value });
    fetchData('author/courses/', setData);
  };

  return (
    <>
      <TextField placeholder='New Course Title' inputRef={newCourseRef} variant='standard' sx={{ width: '100%' }} />
      <Button onClick={handleSubmit} variant='contained' startIcon={<Add />}>
        Add Course
      </Button>
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

export default AuthorCourseList;
