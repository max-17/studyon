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
import { axiosPrivate } from '../../../../axios';
import { Modal } from '@mui/material';

const COURSE_URL = '/author/courses/';

export default function CourseForm() {
  // const errRef = useRef();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [coverImg, setCoverImg] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setErrMsg('');
  }, [title, duration, price, coverImg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { title, duration, price: parseInt(price), coverImg };
      console.log(data);

      const response = await axiosPrivate.post(COURSE_URL, data);

      setTitle('');
      setDuration('');
      setPrice('');
      setCoverImg('');
      setOpen(false);
      console.log(response.data);
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
    <>
      <Button variant='contained' sx={{ margin: 2 }} onClick={handleOpen}>
        Add New Coruse
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'white',
            }}
          >
            <Typography component='h1' variant='h5'>
              New Course
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
                    id='title'
                    label='Title'
                    name='title'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='duration'
                    label='Duration'
                    id='duration'
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='price'
                    label='Price'
                    id='price'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name='coverImg'
                    type='file'
                    label='Cover Image'
                    id='coverImg'
                    onChange={(e) => setCoverImg(e.target.files[0])}
                    focused
                  />
                </Grid>
              </Grid>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Add
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
