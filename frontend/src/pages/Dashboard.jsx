import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import  BASE_URL from "../base_url.js"
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector(state => state.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/dashboard`, config);
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchDashboardStats();
    }
  }, [userInfo]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h6">No data available</Typography>
      </Box>
    );
  }

  const { summary, stockAnalysis, salesTrends, recentOrders } = dashboardData;
  const pieChartData = stockAnalysis.bySubject.map(subject => ({
    name: subject.subjectName,
    value: subject.stock
  }));

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: theme.palette.primary.main }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: 3,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <InventoryIcon fontSize="large" color="primary" />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>Total Stock</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {summary.totalStock || 0}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon color="success" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  +5% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: 3,
            background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalShippingIcon fontSize="large" color="primary" />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>Total Orders</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {summary.totalOrders || 0}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon color="success" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: 3,
            background: 'linear-gradient(135deg, #fff8e1 0%, #ffd54f 100%)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoneyIcon fontSize="large" color="primary" />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>Total Sales</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                KSh {summary.totalSales?.toLocaleString() || 0}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon color="success" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  +8% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: 3,
            background: 'linear-gradient(135deg, #f1f8e9 0%, #aed581 100%)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoneyIcon fontSize="large" color="primary" />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>Avg. Order Value</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                KSh {summary.avgOrderValue?.toFixed(2).toLocaleString() || 0}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon color="success" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  +3% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            p: 2, 
            height: '100%', 
            boxShadow: 3,
            borderRadius: 3
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Monthly Sales</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales (KSh)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: 2, 
            height: '100%', 
            boxShadow: 3,
            borderRadius: 3
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Stock by Subject</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders Section */}
      <Card sx={{ 
        mt: 3, 
        p: 2, 
        boxShadow: 3,
        borderRadius: 3
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Recent Orders</Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Items</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>KSh {order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Box 
                      sx={{
                        display: 'inline-block',
                        p: '4px 8px',
                        borderRadius: 1,
                        backgroundColor: 
                          order.status === 'PENDING' ? 'rgba(255, 152, 0, 0.1)' :
                          order.status === 'COMPLETED' ? 'rgba(76, 175, 80, 0.1)' :
                          'rgba(244, 67, 54, 0.1)',
                        color: 
                          order.status === 'PENDING' ? 'rgb(255, 152, 0)' :
                          order.status === 'COMPLETED' ? 'rgb(76, 175, 80)' :
                          'rgb(244, 67, 54)',
                        fontWeight: 'bold'
                      }}
                    >
                      {order.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.quantity}x {item.title} (KSh {item.price.toLocaleString()} each)
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    </Box>
  );
};

export default DashboardPage;