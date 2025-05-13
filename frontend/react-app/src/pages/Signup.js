import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { SnackbarContext } from '../components/SnackbarProvider';
import { useContext } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const showSnackbar = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/signup', { username, email, password });
      setSuccess('Signup successful! Please login.');
      setError('');
      showSnackbar('Signup successful! Please login.', 'success');
    } catch (err) {
      setError('Signup failed');
      setSuccess('');
      showSnackbar('Signup failed', 'error');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={4} sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h5" gutterBottom>Signup</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} required />
          <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Signup</Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Signup;
