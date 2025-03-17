import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "actions", headerName: "Actions", width: 200 },
];

const rows = [
    { id: 1, title: "Book One", actions: "Edit/Delete" },
    { id: 2, title: "Book Two", actions: "Edit/Delete" },
    { id: 3, title: "Book Three", actions: "Edit/Delete" },
];
const paginationModel = { page: 0, pageSize: 5 };

export default function CategoryTable() {
  return (
    <Paper sx={{ width: "100%" }}>
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
