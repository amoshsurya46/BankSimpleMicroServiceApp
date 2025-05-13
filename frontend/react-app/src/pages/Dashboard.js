import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import { SnackbarContext } from '../components/SnackbarProvider';

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const showSnackbar = useContext(SnackbarContext);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/accounts', { headers: { Authorization: token } });
        setAccounts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load accounts');
        showSnackbar('Failed to load accounts', 'error');
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [showSnackbar]);

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box className="container mt-5">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {accounts.map(acc => (
          <Grid item xs={12} md={6} lg={4} key={acc.id}>
            <Card sx={{ minWidth: 275, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Account #{acc.account_number}</Typography>
                </Box>
                <Typography variant="body1">Type: {acc.type}</Typography>
                <Typography variant="body1">Balance: <b>${acc.balance.toFixed(2)}</b></Typography>
                <Typography variant="caption" color="text.secondary">Created: {new Date(acc.created_at).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={5} display="flex" alignItems="center">
        <BarChartIcon color="secondary" sx={{ fontSize: 32, mr: 1 }} />
        <Typography variant="subtitle1">Account summary and analytics coming soon!</Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;
