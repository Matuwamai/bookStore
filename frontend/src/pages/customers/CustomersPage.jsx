import React, { useEffect, useState } from 'react';
import PageHeaderWithSearch from '../../components/PageHeaderWithSearch';
import Table from '../../components/Table';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import axios from 'axios';
import { CircularProgress, Alert } from '@mui/material';
import { BASE_URL } from '../../base_url';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users`);
        console.log('API Response:', response.data); // Debug log
        // Ensure we're setting an array
        const data = Array.isArray(response.data) ? response.data : [];
        setCustomers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setCustomers([]); // Ensure customers is set to empty array on error
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => {
    if (!customer) return false;
    return (
      (customer.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (customer.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (customer.contact || '').includes(searchTerm)
    );
  });

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "contact", headerName: "Phone No", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 280,
      renderCell: (params) => (
        <div>
          <Button startIcon={<EditIcon />} size="small">Edit</Button>
          <Button startIcon={<VisibilityIcon />} size="small">View</Button>
          <Button startIcon={<BlockIcon />} size="small">Deactivate</Button>
        </div>
      ),
    }
  ];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div className=''>
      <PageHeaderWithSearch 
        title='Customers' 
        subtitle='All customers' 
        search 
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table columns={columns} rows={filteredCustomers} />
    </div>
  );
}

export default CustomersPage;