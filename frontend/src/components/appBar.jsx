import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Container, Tooltip } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/authContext';

// import logo from './images/logo-study-on.png';
import axios from '../axios';

const drawerWidth = 240;
const navItems = ['Home', 'All Courses', 'Contact', 'Sign Up'];

const LinkButton = (props) => {
  const navigate = useNavigate();

  return (
    <Button {...props} sx={{ fontSize: 20 }} onClick={() => navigate(props.to)}>
      {props.children}
    </Button>
  );
};

function DrawerAppBar(props) {
  const { window } = props;
  const [user, setUser] = useState();
  const [errMsg, setErrMsg] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('auth/users/me/', {
          headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
        });
        setUser({ ...response.data });
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        STUDY-ON
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar component='nav' sx={{ background: 'white', color: 'black', maxWidth: 'content' }}>
        <Container>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <LinkButton to='/'>
              <img src='images/logo-study-on.png' height={40} pl={4} sx={{ display: { xs: 'none', sm: 'block' } }} />
            </LinkButton>

            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                margin: 'auto',
              }}
            >
              <LinkButton sx={{ fontSize: 18 }} to='/'>
                Home
              </LinkButton>
              <LinkButton sx={{ fontSize: 18 }} to='courses' color='inherit'>
                All courses
              </LinkButton>
              {!localStorage.getItem('accessToken') && (
                <>
                  <LinkButton sx={{ fontSize: 18 }} to='Contact' color='inherit'>
                    Contact
                  </LinkButton>
                  <LinkButton sx={{ fontSize: 18 }} variant='outlined' to='/signup' color='primary'>
                    <Typography variant='body1' sx={{ color: 'black' }}>
                      Sign Up
                    </Typography>
                  </LinkButton>
                  <LinkButton sx={{ fontSize: 18 }} to='signin' color='inherit'>
                    Sign in
                  </LinkButton>
                </>
              )}
              {localStorage.getItem('accessToken') && (
                <IconButton onClick={() => navigate(user.isAuthor ? 'author' : 'student')} sx={{ p: 0 }}>
                  <Avatar src='/static/images/avatar/2.jpg' />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ px: 3 }}>
        <Toolbar />
      </Box>
    </>
  );
}
export default DrawerAppBar;

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
