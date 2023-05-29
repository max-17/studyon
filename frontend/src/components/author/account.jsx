import { useState, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Container, Fab, Grid, Paper, IconButton, TextField, Input, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import theme from '../theme';
import { Chart } from '../lineChart';
import axios from '../../axios';
import TrafficConversion from './trafficConversion';
import AuthorCourseList from './course/courseList';
import { LinkButton } from '../utils';
import Assignments from './assignments';
import Students from './students';
import AuthorLectureList from './course/lectureList';
import PageNotFound from 'components/404-page';

const menu = [
  { name: 'Students', link: 'students', component: <Students /> },
  { name: 'Assignments', link: 'assignments', component: <Assignments /> },
  { name: 'Courses', link: 'courses', component: <AuthorCourseList /> },
  { name: 'Traffic & Conversion', link: 'traffic-conversion', component: <TrafficConversion /> },
];

const AuthorAccount = () => {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(null);

  const firstNameRef = useRef();

  const lastNameRef = useRef();
  const avatarRef = useRef();

  const fetchData = async () => {
    // You can await here
    try {
      const response = await axios.get('author/', {
        headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
      });
      setData(() => ({ ...response.data }));
    } catch (error) {
      console.log(error);
      if (error.request.status == 401) {
        navigate('/signin', { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstNameRef.current.value);
    const updatedData = {
      ...data,
      last_name: lastNameRef.current.value,
      first_name: firstNameRef.current.value,
    };
    try {
      console.log(updatedData);
      const response = await axios.patch('author/', updatedData);
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

  if (!data) {
    return <h1>Loading ...</h1>;
  }

  return (
    <Container maxWidth='lg'>
      <Grid container direction='row'>
        <Grid
          container
          item
          direction='row'
          justifyContent='center'
          rowGap={3}
          alignContent='start'
          xs={3}
          sx={{ background: theme.palette.primary.light, height: '90vh' }}
        >
          <List sx={{ width: '100%', bgcolor: 'background.paper', height: '150px', margin: 0 }}>
            <ListItem alignItems='center'>
              <IconButton
                onClick={(e) => {
                  if (editing) {
                    handleSubmit(e);
                  }
                  setEditing(!editing);
                }}
                size='small'
                aria-label='edit'
                sx={{ position: 'absolute', top: '7%', right: '5%' }}
              >
                {editing ? <CheckIcon sx={{ color: 'black' }} /> : <EditIcon fontSize='10' sx={{ color: 'black' }} />}
              </IconButton>
              <ListItemAvatar>
                <Avatar alt='avatar' sx={{ height: 100, width: 100, margin: 1 }} src={data.avatar} />
              </ListItemAvatar>

              <Box>
                <Input
                  placeholder='First Name'
                  inputRef={firstNameRef}
                  defaultValue={data.first_name}
                  disabled={!editing}
                />
                <Input
                  placeholder='Last Name'
                  inputRef={lastNameRef}
                  defaultValue={data.last_name}
                  disabled={!editing}
                />
              </Box>
            </ListItem>

            <Divider variant='inset' component='li' />
          </List>
          {menu.map((i) => (
            <Grid item xs={10} key={i.name}>
              <LinkButton
                to={i.link}
                size='large'
                variant='contained'
                sx={{ width: '100%', paddingY: 1.5, color: 'black', background: theme.palette.primary.line }}
              >
                {i.name}
              </LinkButton>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={9} padding={2}>
          <Routes>
            {menu.map((item) => (
              <Route key={item.name} path={`/${item.link}/*`} element={item.component} />
            ))}
            <Route path='/' element={<TrafficConversion />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorAccount;
