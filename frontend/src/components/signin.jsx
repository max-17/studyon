import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
<<<<<<< HEAD
=======
import Link from '@mui/material/Link';
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
import { useEffect, useState } from 'react';
import axios from '../axios';
const LOGIN_URL = '/auth/jwt/create';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        STUDY-ON
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
      const response = await axios.post(LOGIN_URL, { email, password, headers: {} });
      const accessToken = response.data.access;
      localStorage.setItem('accessToken', accessToken);

      const user = await axios('auth/users/me/', {
        headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
      });
      console.log(user);
      const account = user.data.isAuthor ? '/author' : '/student';
      navigate(account);
=======
      const response = await axios.post(LOGIN_URL, { email, password });
      const accessToken = response.data.access;
      localStorage.setItem('accessToken', accessToken);
      navigate('/account');
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setErrMsg('No Server Response');
      } else {
        const errorMessage = Object.values(err.response.data)[0];
        setErrMsg(errorMessage);
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
<<<<<<< HEAD
              <Link to='/signup' variant='body2'>
                "Don't have an account? Sign Up"
=======
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
