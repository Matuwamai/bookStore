import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../base_url';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';

const UserOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector(state => state.user);
  const [error, setError] = useState(null);
  const userId = userInfo?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        const response = await axios.get(`${BASE_URL}/orders/${userId}`, config);
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo, userId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">No orders found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Box key={order.id} sx={{ mb: 4 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">
                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Order ID:</strong> {order.id}
              </Typography>
              <Chip
                label={order.status || 'Processing'}
                color={
                  order.status === 'Delivered' ? 'success' : 
                  order.status === 'Cancelled' ? 'error' : 'warning'
                }
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
              <Box sx={{ minWidth: '250px', flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Delivery Information
                </Typography>
                <Typography><strong>Location:</strong> {order.deliveryLocation}</Typography>
                <Typography><strong>Contact:</strong> {order.deliveryContact}</Typography>
                {order.deliveryNotes && (
                  <Typography><strong>Notes:</strong> {order.deliveryNotes}</Typography>
                )}
              </Box>

              {order.delivery && (
                <Box sx={{ minWidth: '250px', flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Delivery Service
                  </Typography>
                  <Typography>
                    <strong>Carrier:</strong> {order.delivery.carrierName}
                  </Typography>
                  <Typography>
                    <strong>Scheduled:</strong> {new Date(order.delivery.scheduledDate).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Driver:</strong> {order.delivery.driverName} ({order.delivery.driverContact})
                  </Typography>
                  <Typography>
                    <strong>Vehicle:</strong> {order.delivery.carRegistration}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>

          <Typography variant="h5" gutterBottom>
            Order Items
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography fontWeight="bold">{item.book.title}</Typography>
                    </TableCell>
                    <TableCell>
                      {item.book.class && <Typography>Class: {item.book.class.name}</Typography>}
                      {item.book.subject && <Typography>Subject: {item.book.subject.name}</Typography>}
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">KSh {item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">KSh {(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">KSh {order.total.toFixed(2)}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Container>
  );
};

export default UserOrderPage;