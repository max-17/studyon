import { Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { fetchData } from 'components/utils';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const AuthorCourseDetail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const newLectureTitleRef = useRef();
  const newLectureVideoRef = useRef();
  const newLectureTextRef = useRef();

  useEffect(() => {
    fetchData('author/courses/', setData);
  }, []);

  const handleSubmit = async () => {
    // await axios.post('author/courses/', { title: newCourseRef.current.value });
    fetchData('author/courses/', setData);
  };
  return (
    <>
      <Grid container spacing={0}>
        <grid item sx={3}>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              overflow: 'auto',
              maxHeight: '80vh',
            }}
          >
            <Typography component='div' variant='h6' textAlign='center' px={2} id='list-subheader'>
              Course Title
            </Typography>
            {Object.values(data).map((lecture) => (
              <ListItem
                key={lecture.id}
                disablePadding
                secondaryAction={
                  <IconButton edge='end' aria-label='delete' sx={{ background: 'white' }}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton onClick={() => navigate(`${lecture.id}`)}>
                  <ListItemText
                    primary={lecture.title}
                    sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </grid>
        <grid item sx={9}></grid>
      </Grid>
    </>
  );
};

export default AuthorCourseDetail;
