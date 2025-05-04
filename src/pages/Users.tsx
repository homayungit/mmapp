import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';
import { Plus } from 'lucide-react';
import { useAppStore } from '../store';
import { User } from '../types';

const Users: React.FC = () => {
  const { users } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200, filterable: true },
    { field: 'email', headerName: 'Email', width: 250, filterable: true },
    { field: 'role', headerName: 'Role', width: 150, filterable: true },
    { field: 'status', headerName: 'Status', width: 150, filterable: true },
    { field: 'lastLogin', headerName: 'Last Login', width: 200, filterable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate(`/users/edit/${params.row.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (location.pathname !== '/users') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={20} />}
          onClick={() => navigate('/users/add')}
        >
          Add User
        </Button>
      </div>

      <Paper elevation={2}>
        <DataGrid
          rows={users}
          columns={columns}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          autoHeight
          className="dark:bg-slate-800"
        />
      </Paper>
    </div>
  );
};

export default Users;