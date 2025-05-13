import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { SnackbarContext } from '../components/SnackbarProvider';
import { useContext } from 'react';

function Transfer() {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const showSnackbar = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromAccount || !toAccount || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter valid details');
      showSnackbar('Please enter valid details', 'error');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post('/transfer', {
        from_account_id: fromAccount,
        to_account_id: toAccount,
        amount: parseFloat(amount),
        description
      }, { headers: { Authorization: token } });
      setSuccess('Transfer successful');
      setError('');
      showSnackbar('Transfer successful', 'success');
    } catch (err) {
      setError('Transfer failed');
      setSuccess('');
      showSnackbar('Transfer failed', 'error');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={4} sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h5" gutterBottom>Fund Transfer</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="From Account ID" fullWidth margin="normal" value={fromAccount} onChange={e => setFromAccount(e.target.value)} required />
          <TextField label="To Account ID" fullWidth margin="normal" value={toAccount} onChange={e => setToAccount(e.target.value)} required />
          <TextField label="Amount" type="number" fullWidth margin="normal" value={amount} onChange={e => setAmount(e.target.value)} required />
          <TextField label="Description" fullWidth margin="normal" value={description} onChange={e => setDescription(e.target.value)} />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Transfer</Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Transfer;
