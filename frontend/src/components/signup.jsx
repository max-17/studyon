import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';
import { Copyright } from './utils';

const SIGNUP_URL = '/auth/users/';

export default function SignUp() {
  // const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [email, password1, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setErrMsg('passwords did not match!');
    } else {
      const password = password1;

      try {
        await axios.post(SIGNUP_URL, {
          email,
          password,
          isAuthor,
        });

        setEmail('');
        setPassword1('');
        setPassword2('');
        // console.log(response.data);
        navigate('/signin');
      } catch (err) {
        console.log(err);

        if (!err.response) {
          setErrMsg('No Server Response');
        } else {
          const errorMessage = Object.values(err.response.data)[0];
          setErrMsg(errorMessage);
        }
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
          Sign up
        </Typography>
        <Typography component='h4' variant='h6' color='error'>
          {errMsg}
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password1'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password2'
                label='Confirm password'
                type='password'
                id='password'
                autoComplete='new-password'
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='signupAsTeacher' color='primary' />}
                label='Sing up as teacher.'
                onChange={(e) => setIsAuthor(!isAuthor)}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
