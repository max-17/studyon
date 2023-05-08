<<<<<<< HEAD
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
=======
import * as React from 'react';
import PropTypes from 'prop-types';
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
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
<<<<<<< HEAD
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';

import { LinkButton } from './utils';
=======
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503

const drawerWidth = 240;
const navItems = ['Home', 'All Courses', 'Contact', 'Sign Up'];

<<<<<<< HEAD
function DrawerAppBar(props) {
=======
const LinkButton = (props) => {
  const navigate = useNavigate();

  return (
    <Button {...props} sx={{ fontSize: 20 }} onClick={() => navigate(props.to)}>
      {props.children}
    </Button>
  );
};

function DrawerAppBar(props) {
  const navigate = useNavigate();
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
            <img src='./images/logo-study-on.png' height={40} pl={4} sx={{ display: { xs: 'none', sm: 'block' } }} />

            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                margin: 'auto',
              }}
            >
<<<<<<< HEAD
              <LinkButton sx={{ fontSize: 18 }} to='/'>
                Home
              </LinkButton>
              <LinkButton sx={{ fontSize: 18 }} to='courses' color='inherit'>
                All courses
              </LinkButton>
              <LinkButton sx={{ fontSize: 18 }} to='Contact' color='inherit'>
                Contact
              </LinkButton>
              <LinkButton sx={{ fontSize: 18 }} variant='outlined' to='/signup' color='primary'>
                <Typography variant='body1' sx={{ color: 'black' }}>
=======
              <LinkButton to='/'>Home</LinkButton>
              <LinkButton to='courses' color='inherit'>
                All courses
              </LinkButton>
              <LinkButton to='Contact' color='inherit'>
                Contact
              </LinkButton>
              <LinkButton variant='outlined' to='/signup' color='primary'>
                <Typography variant='body2' sx={{ color: 'black' }}>
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
                  Sign Up
                </Typography>
              </LinkButton>
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

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
