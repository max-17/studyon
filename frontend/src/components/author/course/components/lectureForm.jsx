import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../../axios';
import { Modal } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function LectureForm() {
  let { courseId } = useParams();

  const LECTURE_URL = `/author/courses/${courseId}/lectures/`;
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [text, setText] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setErrMsg('');
  }, [title, video, text]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { title, text, video };
      console.log(data);

      const response = await axiosPrivate.post(LECTURE_URL, data);

      setTitle('');
      setVideo('');
      setText('');
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
        Add New Lecture
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
                    name='video'
                    type='file'
                    label='Video'
                    id='coverImg'
                    onChange={(e) => setVideo(e.target.files[0])}
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
