import { useState, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Container, Grid, IconButton, Input, Box, ListItemText, Typography, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import theme from '../theme';
import axios from '../../axios';
import { LinkButton } from '../utils';
import PageNotFound from 'components/404-page';
import { CourseCard } from 'components/course/courseCard';
import StudentLecureList from './course/lectureList';
import CourseList from 'components/student/course/courseList';

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

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birth_dateRef = useRef();
  const phoneNumRef = useRef();

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      last_name: lastNameRef.current.value,
      first_name: firstNameRef.current.value,
      birth_date: birth_dateRef.current.value,
      phone: phoneNumRef.current.value,
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
          path='/account'
          element={
            <Grid container direction='column' spacing={2} padding={5}>
              <AccountFormInput
                name={<Avatar src={user.avatar}>{!user.avatar && `${user.first_name[0]}${user.last_name[0]}`}</Avatar>}
                value={user.first_name + ' ' + user.last_name}
              />
              <AccountFormInput
                name={<Typography fontWeight={700}>First Name</Typography>}
                value={<TextField ref={firstNameRef} value={user.first_name} />}
              />
              <AccountFormInput
                name={<Typography fontWeight={700}>Last Name</Typography>}
                value={<TextField ref={lastNameRef} value={user.last_name} />}
              />
              <AccountFormInput
                name={<Typography fontWeight={700}>Date of Birth</Typography>}
                value={<TextField ref={birth_dateRef} value={user.birth_date} />}
              />
              <AccountFormInput
                name={<Typography fontWeight={700}>Email</Typography>}
                value={<TextField value={user.user_email} disabled />}
              />
              <AccountFormInput
                name={<Typography fontWeight={700}>Phone number</Typography>}
                value={<TextField ref={phoneNumRef} value={user.phone} />}
              />

              <AccountFormInput
                value={
                  <Button onClick={handleSubmit} variant='contained'>
                    {editing ? 'Sabmit' : 'Edit'}
                  </Button>
                }
              />
            </Grid>
          }
        />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/courses/:courseId' element={<StudentLecureList />} />
        {/* <Route path='/*' element={<PageNotFound />} /> */}
      </Routes>
    </Container>
  );
};

const AccountFormInput = ({ name, value }) => {
  return (
    <Grid p={0} container item>
      <Grid item display='flex' xs={3} justifyContent='end' alignItems='center' px={1}>
        {name}
      </Grid>
      <Grid item display='flex' xs={6} px={1} alignItems='center'>
        {value}
      </Grid>
    </Grid>
  );
};

export default StudentAccount;
