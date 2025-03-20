import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <div class='flex items-center'>
        <div class='relative inline-block shrink-0 rounded-lg me-3'>
          <img
            src={params.row.imageUrl}
            class='w-[50px] h-[40px] inline-block shrink-0 rounded-lg'
            alt=''
          />
        </div>
      </div>
    ),
  },
  { field: "title", headerName: "Title", width: 250 },
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
    width: 170,
  },
  {
    field: "class",
    headerName: "Class",
    width: 150,
    renderCell: (params) => (
      <div class='flex items-center'>
        <div class='relative inline-block shrink-0 rounded-lg me-3'>
          <span class='px-2 py-1 text-xs text-white bg-blue-500 rounded-full'>
            {params.row.class.name}
          </span>
        </div>
      </div>
    ),
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 130,
    renderCell: (params) => (
      <div
        class='flex items
      -center'>
        <div class='relative inline-block shrink-0 rounded-lg me-3'>
          <span class='px-2 py-1 text-sm text-white bg-green-500 rounded-full'>
            {params.row.subject.name}
          </span>
        </div>
      </div>
    ),
  },
  {
    field: "wholesale",
    headerName: "Type",
    width: 100,
    renderCell: (params) => (
      <div class=''>
        {params.row.wholesale ? (
          <span className='bg-green-500 text-white px-2 py-1 rounded-full'>
            Wholesale
          </span>
        ) : (
          <span className='bg-amber-500 text-white px-2 py-1 rounded-full'>
            Retail
          </span>
        )}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    renderCell: (params) => (
      <div
        class='flex items
      -center'>
        <div class='relative inline-block shrink-0 rounded-lg me-3'>
          <span class='px-2 py-1 text-xs text-white bg-gray-500 rounded-full'>
            {new Date(params.row.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 30 };

export default function ProductsTable({data}) {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
