import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Paper, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Stack
} from '@mui/material';
import { useAppStore } from '../store';
import { User } from '../types';

const UserForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, addUser, updateUser } = useAppStore();
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Viewer',
    status: 'active',
    lastLogin: new Date().toLocaleString()
  });

  useEffect(() => {
    if (id) {
      const user = users.find(u => u.id === Number(id));
      if (user) {
        setFormData(user);
      }
    }
  }, [id, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (id) {
      updateUser(Number(id), formData);
    } else {
      addUser(formData as Omit<User, 'id'>);
    }
    
    navigate('/users');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{id ? 'Edit User' : 'Add User'}</h1>
      </div>

      <Paper elevation={2} className="p-6 dark:bg-slate-800">
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                onClick={() => navigate('/users')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Update' : 'Add'} User
              </Button>
            </div>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

export default UserForm;