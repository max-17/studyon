import { Add } from '@mui/icons-material';
import {
  Button,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react';
import { LinkButton, fetchData } from '../../utils';
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
      <Grid container>
        {Object.values(data).map((course, index) => {
          console.log(course);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CourseCard {...course} lectures={course.lectures.length} image={course.coverImg} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default AuthorCourseList;
