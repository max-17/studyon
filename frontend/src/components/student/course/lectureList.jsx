import { Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, Box, Button } from '@mui/material';
import { fetchData } from 'components/utils';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const StudentLecureList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [currentLecture, setCurrentLecture] = useState({});
  const [editedLecture, setEditedLecture] = useState({});
  const newLectureTitleRef = useRef();
  const newLectureVideoRef = useRef();
  const newLectureTextRef = useRef();
  let { courseId } = useParams();
  const textRef = useRef();

  useEffect(() => {
    console.log('data fetched');
    fetchData(`student/courses/${courseId}/`, setData);
    console.log(data);
  }, []);

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
              Course Title
            </Typography>
            {data &&
              data.lectures.map((lecture, index) => (
                <ListItem key={lecture.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCurrentLecture({ ...data.lectures[index] });
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
            <video controls src={currentLecture.video} width='100%' />
          </Box>

          <Box m={3}>
            <CKEditor
              editor={ClassicEditor}
              data={currentLecture.text}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditedLecture({ ...currentLecture, text: data });
                // console.log({ event, editor, data });
              }}
              ref={textRef}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentLecureList;
