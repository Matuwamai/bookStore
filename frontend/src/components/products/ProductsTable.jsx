import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <div class='flex items-center'>
        <div class='relative inline-block shrink-0 rounded-lg me-3'>
          <img
            src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg'
            class='w-[50px] h-[40px] inline-block shrink-0 rounded-lg'
            alt=''
          />
        </div>
      </div>
    ),
  },
  { field: "title", headerName: "Title", width: 200 },
  { field: "price", headerName: "Price", type: "number", width: 70 },
  {
    field: "stock",
    headerName: "Stock Qty",
    type: "number",
    width: 100,
  },
  {
    field: "author",
    headerName: "Author",
    width: 130,
  },
  {
    field: "class",
    headerName: "Class",
    width: 130,
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    title: "Book A",
    price: 29.99,
    stock: 100,
    author: "Author A",
    class: "Class 1",
    subject: "Math",
  },
  {
    id: 2,
    title: "Book B",
    price: 19.99,
    stock: 50,
    author: "Author B",
    class: "Class 2",
    subject: "Science",
  },
  {
    id: 3,
    title: "Book C",
    price: 39.99,
    stock: 75,
    author: "Author C",
    class: "Class 3",
    subject: "History",
  },
  {
    id: 4,
    title: "Book D",
    price: 24.99,
    stock: 20,
    author: "Author D",
    class: "Class 4",
    subject: "Literature",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductsTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
