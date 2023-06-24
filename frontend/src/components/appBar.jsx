import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Container, Menu, MenuItem } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useContext, useState } from 'react';

import AuthContext from 'context/authContext';

//import logo-study-on from './images/logo.png';
import logo from 'logo.png';

const drawerWidth = 240;

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
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'All Courses', link: 'courses' },
    { name: 'Contact', link: 'contact' },
    { name: 'Sign Up', link: 'signup' },
    { name: 'Sign In', link: 'signin' },
  ];

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAccount = () => {
    setAnchorEl(null);
    navigate(user.isAuthor ? 'author' : 'student/account');
  };
  const handleSignout = () => {
    setAnchorEl(null);
    localStorage.removeItem('accessToken');
    console.log(localStorage);
    setUser(false);
    navigate('/');
  };

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
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <LinkButton to={item.link}>{item.name}</LinkButton>
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
              <img src={logo} height={40} pl={4} sx={{ display: { xs: 'none', sm: 'block' } }} />
            </LinkButton>

            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                margin: 'auto',
              }}
            >
              <LinkButton sx={{ fontSize: 18 }} to='/' color='inherit'>
                Home
              </LinkButton>
              {!(user & user.isAuthor) && (
                <LinkButton sx={{ fontSize: 18 }} to='courses' color='inherit'>
                  All courses
                </LinkButton>
              )}
              {user && !user.isAuthor && (
                <LinkButton sx={{ fontSize: 18 }} to='student/courses' color='inherit'>
                  My courses
                </LinkButton>
              )}
              <LinkButton sx={{ fontSize: 18 }} to='contact' color='inherit'>
                Contact
              </LinkButton>
              {!localStorage.getItem('accessToken') && (
                <>
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
            </Box>
            {user.id && (
              <Box sx={{ marginLeft: 'auto' }}>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleAccount}>Account</MenuItem>
                  <MenuItem onClick={handleSignout}>Sign out</MenuItem>
                </Menu>

                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.first_name} src={user.avater} />
                </IconButton>
              </Box>
            )}
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
