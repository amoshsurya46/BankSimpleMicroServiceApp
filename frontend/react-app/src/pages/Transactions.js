import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, CircularProgress, Alert } from '@mui/material';
import { SnackbarContext } from '../components/SnackbarProvider';
import { useContext } from 'react';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [orderBy, setOrderBy] = useState('timestamp');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const showSnackbar = useContext(SnackbarContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        // TODO: Replace with actual account id and API endpoint
        const res = await axios.get('/transactions/1', { headers: { Authorization: token } });
        setTransactions(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load transactions');
        showSnackbar('Failed to load transactions', 'error');
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [showSnackbar]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setTransactions([...transactions].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    }));
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box className="container mt-5">
      <Typography variant="h4" gutterBottom>Transaction History</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={orderBy === 'timestamp'} direction={order} onClick={() => handleSort('timestamp')}>
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'amount'} direction={order} onClick={() => handleSort('amount')}>
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(txn => (
              <TableRow key={txn.id}>
                <TableCell>{new Date(txn.timestamp).toLocaleString()}</TableCell>
                <TableCell>{txn.from_account_id}</TableCell>
                <TableCell>{txn.to_account_id}</TableCell>
                <TableCell>${txn.amount.toFixed(2)}</TableCell>
                <TableCell>{txn.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Transactions;
