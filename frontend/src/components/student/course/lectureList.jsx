import { Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, Box, Button } from '@mui/material';
import { fetchData } from 'components/utils';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const StudentLecureList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentLecture, setCurrentLecture] = useState();
  const [video, setVideo] = useState('');
  let { courseId } = useParams();
  const textRef = useRef();

  useEffect(() => {
    console.log('data fetched');
    fetchData(`student/courses/${courseId}/lectures/`, setData);
    console.log(data);
  }, []);

  useEffect(() => {
    console.log(data);
    if (data.length > 0) {
      const textDiv = document.getElementById('text');
      textDiv.setHTML(data[currentLecture].text);
    }
  }, [currentLecture]);

  const handleSubmit = async () => {
    // await axios.post('author/courses/', { title: newCourseRef.current.value });
    fetchData('student/courses/', setData);
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              overflow: 'auto',
              maxHeight: '80vh',
            }}
          >
            <Typography component='div' variant='h6' textAlign='center' px={2} id='list-subheader'>
              {data.length > 0 && data[0].course}
            </Typography>
            {data.length > 0 &&
              data.map((lecture, index) => (
                <ListItem key={lecture.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCurrentLecture(index);
                      setVideo(data[index].video);
                      console.log(data);
                    }}
                  >
                    <ListItemText
                      primary={lecture.title}
                      sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Box m={3}>
            <video controls src={video} width='100%' />
          </Box>

          <Box m={3}>
            <div ref={textRef} id='text'></div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentLecureList;
