import { Button, Container, Grid, Typography } from '@mui/material';
import { axiosPrivate } from '../../axios';
import theme from 'components/theme';
import AuthContext from 'context/authContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDescription = ({ coverImg, title, description, price, duration }) => {
  const [courses, setCourses] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const { courseId } = useParams();
  const navigate = useNavigate();

  if (!title) {
    navigate('/courses');
  }

  useEffect(() => {
    document.getElementById('description').setHTML(description);
  }, [description]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = (await axiosPrivate('/student/')).data.courses;

        console.log(data);
        setCourses(data);
      } catch (error) {
        console.log(error);
        alert('server error');
      }
    };
    if (user && !user.isAuthor) {
      getCourses();
    }
  }, []);

  const handlePurchase = (e) => {
    e.preventDefault();

    if (user && !user.isAuthor) {
      console.log();
      axiosPrivate.patch('/student/', { courses: [...courses, parseInt(courseId)] });
      navigate('/student', { replace: true });
    } else {
      navigate('/signin');
    }
  };

  return (
    <Container maxWidth='full'>
      {/* hero section */}
      <Grid
        container
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
          <Button onClick={handlePurchase} variant='contained' size='large'>
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
