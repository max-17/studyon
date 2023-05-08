import { Add } from '@mui/icons-material';
import {
  Button,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react';
import { LinkButton, fetchData } from '../../utils';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';

const AuthorCourseList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const newCourseRef = useRef();

  useEffect(() => {
    fetchData('author/courses/', setData);
  }, []);

  const handleSubmit = async () => {
    await axios.post('author/courses/', { title: newCourseRef.current.value });
    fetchData('author/courses/', setData);
  };

  return (
    <>
      <TextField placeholder='New Course Title' inputRef={newCourseRef} variant='standard' sx={{ width: '100%' }} />
      <Button onClick={handleSubmit} variant='contained' startIcon={<Add />}>
        Add Course
      </Button>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            List of Courses
          </ListSubheader>
        }
      >
        {Object.values(data).map((course) => (
          <ListItem
            key={course.id}
            disablePadding
            secondaryAction={
              <IconButton edge='end' aria-label='delete' sx={{ background: 'white' }}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => navigate(`${course.id}`)}>
              <ListItemText
                primary={course.title}
                sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AuthorCourseList;
