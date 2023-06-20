import { Button, Container, Grid, Typography } from '@mui/material';
import theme from 'components/theme';
import { LinkButton } from 'components/utils';
import AuthContext from 'context/authContext';
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseDescription = ({ coverImg, title, description, price, duration }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!title) {
    navigate('/courses');
  }

  useEffect(() => {
    document.getElementById('description').setHTML(description);
  }, [description]);

  return (
    <Container maxWidth='full'>
      {/* hero section */}
      <Grid
        container
        mX={3}
        justifyContent='space-around'
        alignItems='center'
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        <Grid item xs={8} md={5}>
          <Typography variant='body1' pt={2} px={1} color='primary'>
            Start your favourite course
          </Typography>
          <Typography variant='h4' p={1} color='initial'>
            {title}
          </Typography>
          <Typography variant='body1' py={3} px={1} color='grey'>
            {duration}
          </Typography>
          <Typography variant='body1' py={3} px={1} color='grey'>
            {`${price} KRW`}
          </Typography>
          <Button
            onClick={() => {
              if (user & !user.isAuthor) {
                console.log('purchased');
              } else {
                navigate('/signin');
              }
            }}
            variant='contained'
            size='large'
          >
            Purchase
          </Button>
        </Grid>
        <Grid item xs={5} md={0}>
          <img src={coverImg} width='100%' />
        </Grid>
      </Grid>
      <div id='description'></div>
    </Container>
  );
};

export default CourseDescription;
