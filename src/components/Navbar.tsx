import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from '@mui/material';

const Navbar: React.FC = () => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    navigate('/login');
  };

  const theme = createTheme({
    typography: {
      button: {
        fontWeight: 'inherit',
        '&.active': {
          fontWeight: 'bold',
        },
      },
    },
  });

  const isActiveLink = (pathname: string) => location.pathname === pathname;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TASK MANAGEMENT
          </Typography>
          {isLoggedIn && (
            <Button
              color="inherit"
              component={Link}
              to="/"
              className={isActiveLink('/') ? 'active' : ''}
            >
              Home
            </Button>
          )}
          {!isLoggedIn && (
            <Button
              color="inherit"
              component={Link}
              to="/registration"
              className={isActiveLink('/registration') ? 'active' : ''}
            >
              Register
            </Button>
          )}
          {!isLoggedIn && (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              className={isActiveLink('/login') ? 'active' : ''}
            >
              Login
            </Button>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '64px' }}></div>
      {/* Rest of your components */}
    </ThemeProvider>
  );
};

export default Navbar;
