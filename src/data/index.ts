import { User, Product, Order, Customer, MenuItem, Notification } from '../types';

export const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2023-07-15 10:30 AM' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastLogin: '2023-07-14 03:45 PM' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2023-06-30 09:15 AM' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', lastLogin: '2023-07-13 11:20 AM' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'active', lastLogin: '2023-07-15 08:55 AM' },
];

export const products: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15, status: 'available' },
  { id: 2, name: 'Smartphone X', category: 'Electronics', price: 899.99, stock: 25, status: 'available' },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 199.99, stock: 0, status: 'out_of_stock' },
  { id: 4, name: 'Coffee Maker', category: 'Appliances', price: 79.99, stock: 8, status: 'available' },
  { id: 5, name: 'Vintage Lamp', category: 'Home Decor', price: 49.99, stock: 3, status: 'discontinued' },
];

export const orders: Order[] = [
  { id: 1, customer: 'John Doe', date: '2023-07-15', status: 'pending', total: 1299.99, paymentMethod: 'Credit Card' },
  { id: 2, customer: 'Jane Smith', date: '2023-07-14', status: 'shipped', total: 899.99, paymentMethod: 'PayPal' },
  { id: 3, customer: 'Alice Brown', date: '2023-07-13', status: 'delivered', total: 199.99, paymentMethod: 'Credit Card' },
  { id: 4, customer: 'Bob Johnson', date: '2023-07-12', status: 'cancelled', total: 79.99, paymentMethod: 'Debit Card' },
  { id: 5, customer: 'Charlie Davis', date: '2023-07-11', status: 'delivered', total: 149.97, paymentMethod: 'PayPal' },
];

export const customers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St, Anytown, USA', joinDate: '2023-01-15', totalOrders: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901', address: '456 Oak St, Somewhere, USA', joinDate: '2023-02-20', totalOrders: 3 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '345-678-9012', address: '789 Pine St, Nowhere, USA', joinDate: '2023-03-10', totalOrders: 2 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '456-789-0123', address: '101 Elm St, Everywhere, USA', joinDate: '2023-04-05', totalOrders: 4 },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', phone: '567-890-1234', address: '202 Maple St, Anywhere, USA', joinDate: '2023-05-01', totalOrders: 1 },
];

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'layout-dashboard',
    path: '/'
  },
  {
    id: 'users',
    title: 'Users',
    icon: 'users',
    path: '/users'
  },
  {
    id: 'products',
    title: 'Products',
    icon: 'shopping-bag',
    path: '/products'
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: 'shopping-cart',
    path: '/orders'
  },
  {
    id: 'customers',
    title: 'Customers',
    icon: 'users',
    path: '/customers'
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: 'bar-chart',
    children: [
      {
        id: 'sales-report',
        title: 'Sales Report',
        path: '/reports/sales'
      },
      {
        id: 'inventory-report',
        title: 'Inventory Report',
        path: '/reports/inventory'
      },
      {
        id: 'user-report',
        title: 'User Report',
        path: '/reports/users'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'settings',
    children: [
      {
        id: 'profile',
        title: 'Profile',
        path: '/settings/profile'
      },
      {
        id: 'app-settings',
        title: 'App Settings',
        path: '/settings/app'
      },
      {
        id: 'security',
        title: 'Security',
        path: '/settings/security',
        children: [
          {
            id: 'password',
            title: 'Password',
            path: '/settings/security/password'
          },
          {
            id: 'two-factor',
            title: 'Two Factor Auth',
            path: '/settings/security/two-factor'
          }
        ]
      }
    ]
  }
];

export const notifications: Notification[] = [
  { id: 1, title: 'New Order', message: 'You have received a new order #12345', time: '5 min ago', read: false, type: 'info' },
  { id: 2, title: 'Low Stock Alert', message: 'Product "Smartphone X" is running low on stock', time: '1 hour ago', read: false, type: 'warning' },
  { id: 3, title: 'Payment Received', message: 'Payment of $899.99 has been received for order #12344', time: '3 hours ago', read: true, type: 'success' },
  { id: 4, title: 'Server Error', message: 'The database server encountered an error. Contact IT support.', time: '5 hours ago', read: true, type: 'error' },
  { id: 5, title: 'New User Registered', message: 'User "Mark Wilson" has registered an account', time: '1 day ago', read: true, type: 'info' },
];