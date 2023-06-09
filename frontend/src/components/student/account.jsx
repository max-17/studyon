import { useState, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Container, Grid, IconButton, Input, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import theme from '../theme';
import axios from '../../axios';
import { LinkButton } from '../utils';
import PageNotFound from 'components/404-page';
import { CourseCard } from 'components/course/courseCard';
import StudentLecureList from './course/lectureList';

// const menu = [
//   { name: 'Students', link: 'students', component: <Students /> },
//   { name: 'Assignments', link: 'assignments', component: <Assignments /> },
//   { name: 'Courses', link: 'courses', component: <AuthorCourseList /> },
//   { name: 'Traffic & Conversion', link: 'traffic-conversion', component: <TrafficConversion /> },
// ];

const StudentAccount = () => {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState({});

  const firstNameRef = useRef();

  const lastNameRef = useRef();
  const avatarRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      // You can await here
      try {
        const response = await axios.get('student/', {
          headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
        });
        setUser(() => ({ ...response.data }));
      } catch (error) {
        console.log(error);
        if (error.request.status == 401) {
          navigate('/signin', { replace: true });
        }
      }
    };
    getUser();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstNameRef.current.value);
    const updatedData = {
      ...user,
      last_name: lastNameRef.current.value,
      first_name: firstNameRef.current.value,
    };
    try {
      console.log(updatedData);
      const response = await axios.patch('student/', updatedData);
      console.log(response);
      alert('updated');
      // navigate('/author', { replace: true });
    } catch (err) {
      console.log(err);
      if (!err.response) {
        alert('No Server Response');
      } else {
        const errorMessage = JSON.stringify(err.response.data).replace(/[{"}[\]]/g, ' ');
        alert(errorMessage);
      }
    }
  };

  if (!user) {
    return <h1>Loading ...</h1>;
  }

  return (
    <Container maxWidth='lg'>
      <Routes>
        <Route
          path='/'
          element={
            <Grid container spacing={2} mt={2}>
              {Object.values(courses).map((course, index) => {
                console.log(course);
                return (
                  <Grid item xs={12} sm={6} lg={4} md={6} key={index}>
                    <CourseCard {...course} student lectures={course.lectures.length} image={course.coverImg} />
                  </Grid>
                );
              })}
            </Grid>
          }
        />
        <Route path='/courses/:courseId' element={<StudentLecureList />} />
        {/* <Route path='/*' element={<PageNotFound />} /> */}
      </Routes>
    </Container>
  );
};

export default StudentAccount;
