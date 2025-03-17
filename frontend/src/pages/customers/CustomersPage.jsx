import React from 'react'
import PageHeaderWithSearch from '../../components/PageHeaderWithSearch'
import Table from '../../components/Table'
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';

const CustomersPage = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "phoneNo", headerName: "Phone No", width: 130 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 280,
      renderCell: () => (
        <div>
          <Button startIcon={<EditIcon />} size="small">Edit</Button>
          <Button startIcon={<VisibilityIcon />} size="small">View</Button>
          <Button startIcon={<BlockIcon />} size="small">Deactivate</Button>
        </div>
      ),
    }
  ];

  const rows = [
    { id: 1, fullName: 'John Doe', phoneNo: '123-456-7890', email: 'john@example.com', address: '123 Main St' },
    { id: 2, fullName: 'Jane Smith', phoneNo: '987-654-3210', email: 'jane@example.com', address: '456 Elm St' },
    { id: 3, fullName: 'Alice Johnson', phoneNo: '555-555-5555', email: 'alice@example.com', address: '789 Oak St' },
    { id: 4, fullName: 'Bob Brown', phoneNo: '111-222-3333', email: 'bob@example.com', address: '101 Pine St' },
  ];
  return (
    <div>
      <PageHeaderWithSearch title='Customers' subtitle='All customers' search />
      <Table columns={columns} rows={rows} />
    </div>
  )
}

export default CustomersPage