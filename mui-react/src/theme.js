import { createTheme } from '@mui/material/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});
const themeOptions = {
  root: {
    '&::-webkit-scrollbar': {
      width: 0,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      outline: `1px solid slategrey`,
    },
  },
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      main: '#1ef978',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        color: '#000',
      },
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textDecoration: 'none',
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
          backgroundColor: 'blue',
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
