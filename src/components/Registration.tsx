import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetCookies } from '../utils/cookies';

interface Errors {
  name: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [storageOption, setStorageOption] = useState<string>('local'); // Default option: local
  const [errors, setErrors] = useState<Errors>({ name: '', email: '', password: '' });

  const handleRegister = (): void => {
    setErrors({ name: '', email: '', password: '' });

    let isValid = true;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name is required',
      }));
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      isValid = false;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be at least 6 characters long',
      }));
      isValid = false;
    }

    if (isValid) {
      const user: any = { name, email, password };
      dispatch(setCurrentUser(user));
      localStorage.setItem('regi','')
      setName('');
      setEmail('');
      setPassword('');
      toast.success('Registration success'); // Show success toast notification


      if (storageOption === 'local') {
        localStorage.setItem('user', JSON.stringify(user));
      } else if (storageOption === 'session') {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else if (storageOption === 'cookies') {
        SetCookies({ name: 'user', value: JSON.stringify(user) });
      }
      navigate('/login');
    } else {
      toast.error('Invalid registration details'); // Show error toast notification
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h6" sx={{ marginBottom: '10px', padding: '5px', textAlign: 'center' }}>
        REGISTRATION
      </Typography>
      <TextField
        sx={{ marginBottom: '10px', width: '97%' }}
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        sx={{ marginBottom: '10px', width: '97%' }}
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        sx={{ marginBottom: '10px', width: '97%' }}
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <FormControl component="fieldset" sx={{ marginBottom: '10px', width: '97%' }}>
        <FormLabel component="legend">Storage Option</FormLabel>
        <RadioGroup
          value={storageOption}
          onChange={(e) => setStorageOption(e.target.value)}
          row
        >
          <FormControlLabel value="local" control={<Radio />} label="Local Storage" />
          <FormControlLabel value="session" control={<Radio />} label="Session Storage" />
          <FormControlLabel value="cookies" control={<Radio />} label="Cookies" />
        </RadioGroup>
      </FormControl>
      <Button
        sx={{ backgroundColor: '#1976d2', color: 'white', padding: '10px', width: '100%', borderRadius: '5px' }}
        onClick={handleRegister}
        variant="contained"
        color="primary"
      >
        Register
      </Button>
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default Registration;
