import { Box, Button, Fade, useScrollTrigger, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
export function ScrollTop(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#root');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role='presentation' sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Fade>
  );
}

export const LinkButton = (props) => {
  const navigate = useNavigate();

  return (
    <Button {...props} onClick={() => navigate(props.to)}>
      {props.children}
    </Button>
  );
};

export const fetchData = async (link, setState) => {
  // You can await here
  try {
    const response = await axios.get(
      link,
      localStorage.getItem('accessToken')
        ? {
            headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
          }
        : {}
    );
    setState(() => ({ ...response.data }));
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status == 401) {
      localStorage.removeItem('accessToken');
    }
  }
};

export function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        STUDY-ON
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
