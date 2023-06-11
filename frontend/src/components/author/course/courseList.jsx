import { Button, TextField, Grid, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { fetchData } from '../../utils';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from 'components/course/courseCard';
import CourseForm from './components/courseForm';

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
      <CourseForm />
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
