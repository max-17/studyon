import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#309255',
      light: '#eefbf3',
      line: 'rgba(48, 146, 85, 0.2)',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 1000,
      lg: 1250,
      xl: 1536,
    },
  },
});

export default theme;
