import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import axios, { axiosPrivate } from '../axios';

import { Box, Button, Container, Grid, Paper } from '@mui/material';
import { ImageAspectRatioRounded } from '@mui/icons-material';
import theme from './theme';
import { Chart } from './lineChart';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const AuthorAccount = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(null);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const avatarRef = useRef(null);

  const fetchData = async () => {
    // You can await here
    try {
      const response = await axiosPrivate.get('author/');
      setData(() => ({ ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      last_name: lastNameRef.current.value,
      first_name: firstNameRef.current.value,
    };
    try {
      console.log(updatedData);
      const response = await axios.patch('author/', data);
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
              <ListItemAvatar>
                <Avatar alt='avatar' sx={{ height: 100, width: 100, margin: 1 }} src={data.avatar} />
              </ListItemAvatar>
              <Typography textAlign='center' variant='h5'>
                {data.first_name + ' ' + data.last_name}
              </Typography>
            </ListItem>

            <Divider variant='inset' component='li' />
          </List>
          <Grid item xs={10}>
            <Button
              size='large'
              variant='contained'
              sx={{ width: '100%', paddingY: 1.5, color: 'black', background: theme.palette.primary.line }}
            >
              Students
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Button
              size='large'
              variant='contained'
              sx={{ background: theme.palette.primary.line, width: '100%', paddingY: 1.5, color: 'black' }}
            >
              Assignments
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Button
              size='large'
              variant='contained'
              sx={{ background: theme.palette.primary.line, width: '100%', paddingY: 1.5, color: 'black' }}
            >
              Courses
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Button
              size='large'
              variant='contained'
              sx={{ background: theme.palette.primary.line, width: '100%', paddingY: 1.5, color: 'black' }}
            >
              Trafic & Conversion
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={9} padding={2}>
          <Grid container spacing={1} alignContent='space-between'>
            <Grid item xs={4}>
              <Button variant='outlined' color='inherit'>
                All Courses
              </Button>
            </Grid>
            <Grid item xs={8} container gap={2} justifyContent='end'>
              <Paper textAlign='center' sx={{ bgcolor: theme.palette.info.light, paddingX: 1.5, paddingY: 1 }}>
                <Typography variant='body2' color='initial'>
                  Total Revenue
                </Typography>
                <Typography variant='h5' color='initial'>
                  $580.00
                </Typography>
                <Typography variant='body2' color='initial'>
                  $235.00 This month
                </Typography>
              </Paper>
              <Paper textAlign='center' sx={{ bgcolor: theme.palette.primary.light, paddingX: 1.5, paddingY: 1 }}>
                <Typography variant='body2' color='initial'>
                  Total Revenue
                </Typography>
                <Typography variant='h5' color='initial'>
                  $580.00
                </Typography>
                <Typography variant='body2' color='initial'>
                  $235.00 This month
                </Typography>
              </Paper>
              <Paper textAlign='center' sx={{ bgcolor: theme.palette.warning.light, paddingX: 1.5, paddingY: 1 }}>
                <Typography variant='body2' color='initial'>
                  Total Revenue
                </Typography>
                <Typography variant='h5' color='initial'>
                  $580.00
                </Typography>
                <Typography variant='body2' color='initial'>
                  $235.00 This month
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Chart />
          <Typography variant='body1' textAlign='center' padding={4}>
            <Button variant='contained' size='large' color='primary'>
              Revenue Report
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Container>

    // <Container component='main' maxWidth='xs'>
    //   <Box
    //     component='form'
    //     noValidate
    //     onSubmit={handleSubmit}
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Grid container spacing={2}>
    //       <Grid item xs={12}>
    //         <img src={data.avatar} alt='avatar' />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           required
    //           fullWidth
    //           id='firstName'
    //           name='firstName'
    //           autoComplete='firstName'
    //           ref={firstNameRef}
    //           defaultValue={data.first_name}
    //           label={editing ? 'First name' : ''}
    //           variant={editing ? 'outlined' : 'standard'}
    //           disabled={!editing}
    //         ></TextField>
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           required
    //           fullWidth
    //           id='lastName'
    //           name='lastName'
    //           autoComplete='lastName'
    //           ref={lastNameRef}
    //           label={editing ? 'Last name' : ''}
    //           variant={editing ? 'outlined' : 'standard'}
    //           defaultValue={data.last_name}
    //         ></TextField>
    //       </Grid>
    //     </Grid>

    //  <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
    //       Save
    //     </Button>

    //     <Button fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={() => setEditing(true)}>
    //       Edit
    //     </Button>
    //   </Box>
    // </Container>
  );
};

export default AuthorAccount;
