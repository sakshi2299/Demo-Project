import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography } from '@mui/material';

interface Errors {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({ email: '', password: '' });

  const handleLogin = () => {
    setErrors({ email: '', password: '' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be at least 6 characters long',
      }));
      return;
    }

    let storedUser = null;
    const storageLocations = ['localStorage', 'sessionStorage', 'cookies'];

    // Iterate over storage locations to find user data
    for (const storageLocation of storageLocations) {
      if (storageLocation === 'localStorage') {
        storedUser = localStorage.getItem('user');
      } else if (storageLocation === 'sessionStorage') {
        storedUser = sessionStorage.getItem('user');
      } else if (storageLocation === 'cookies') {
        storedUser = getCookie('user');
      }

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email === email && parsedUser.password === password) {
          dispatch(setCurrentUser(parsedUser));
          setEmail('');
          setPassword('');
          toast.success('Login success');
          localStorage.setItem('login', 'true');
          navigate('/');
          return;
        }
      }
    }

    toast.error('Invalid email or password');
    setEmail('');
    setPassword('');
  };

  // Helper function to get cookie value by name
  const getCookie = (name: string) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ marginBottom: '10px', textAlign: 'center' }}>
        LOGIN
      </Typography>
      <TextField
        sx={{ marginBottom: '10px', width: '100%' }}
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        sx={{ marginBottom: '10px', width: '100%' }}
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />
      <Button
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '10px',
          width: '100%',
          borderRadius: '5px',
        }}
        onClick={handleLogin}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default Login;
