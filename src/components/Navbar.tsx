import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from '@mui/material';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    navigate('/login');
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Change this to your desired dark blue color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TASK MANAGEMENT
            </Typography>
            {isLoggedIn && (
              <Button
                color={location.pathname === '/' ? 'success' : 'inherit'}
                component={Link}
                to="/"
              >
                Home
              </Button>
            )}
            {!isLoggedIn && (
              <Button
                color={location.pathname === '/registration' ? 'success' : 'inherit'}
                component={Link}
                to="/registration"
              >
                Register
              </Button>
            )}
            {!isLoggedIn && (
              <Button
                color={location.pathname === '/login' ? 'success' : 'inherit'}
                component={Link}
                to="/login"
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
      </>
    </ThemeProvider>
  );
};

export default Navbar;
