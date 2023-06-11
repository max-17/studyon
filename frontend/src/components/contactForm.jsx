import { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Container } from '@mui/material';
import { Copyright } from './utils';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setMessage('');
    setName('');
    alert('Message has been recieved');
  };

  return (
    <Container maxWidth='lg' sx={{ height: '100vh', paddingTop: '5rem' }}>
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 2 }}>
          <Typography variant='h5' align='center' mb={2}>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin='normal'
                  required
                />
                <TextField
                  fullWidth
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin='normal'
                  required
                  type='email'
                />
                <TextField
                  fullWidth
                  label='Message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  margin='normal'
                  required
                  multiline
                  rows={4}
                />
                <Button variant='contained' fullWidth type='submit' sx={{ mt: 2 }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          <br />
          <Copyright />
        </Box>
      </Grid>
    </Container>
  );
}
