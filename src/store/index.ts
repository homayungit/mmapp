import { create } from 'zustand';
import { users, products, orders, customers, notifications } from '../data';
import { User, Product, Order, Customer, Notification } from '../types';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Users
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: number, order: Partial<Order>) => void;
  deleteOrder: (id: number) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: number, customer: Partial<Customer>) => void;
  deleteCustomer: (id: number) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: number) => void;
  unreadNotificationsCount: number;
}

export const useAppStore = create<AppState>((set) => {
  // Try to load theme from localStorage
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const initialTheme = savedTheme || 'light';
  
  // Apply theme to document
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  
  return {
    // Theme
    theme: initialTheme,
    setTheme: (theme) => {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      set({ theme });
    },
    toggleTheme: () => 
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),
    
    // Sidebar
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    // Users
    users,
    addUser: (user) => 
      set((state) => ({ 
        users: [...state.users, { ...user, id: Math.max(0, ...state.users.map(u => u.id)) + 1 }] 
      })),
    updateUser: (id, user) => 
      set((state) => ({ 
        users: state.users.map(u => u.id === id ? { ...u, ...user } : u) 
      })),
    deleteUser: (id) => 
      set((state) => ({ 
        users: state.users.filter(u => u.id !== id) 
      })),

    // Products
    products,
    addProduct: (product) => 
      set((state) => ({ 
        products: [...state.products, { ...product, id: Math.max(0, ...state.products.map(p => p.id)) + 1 }] 
      })),
    updateProduct: (id, product) => 
      set((state) => ({ 
        products: state.products.map(p => p.id === id ? { ...p, ...product } : p) 
      })),
    deleteProduct: (id) => 
      set((state) => ({ 
        products: state.products.filter(p => p.id !== id) 
      })),

    // Orders
    orders,
    addOrder: (order) => 
      set((state) => ({ 
        orders: [...state.orders, { ...order, id: Math.max(0, ...state.orders.map(o => o.id)) + 1 }] 
      })),
    updateOrder: (id, order) => 
      set((state) => ({ 
        orders: state.orders.map(o => o.id === id ? { ...o, ...order } : o) 
      })),
    deleteOrder: (id) => 
      set((state) => ({ 
        orders: state.orders.filter(o => o.id !== id) 
      })),

    // Customers
    customers,
    addCustomer: (customer) => 
      set((state) => ({ 
        customers: [...state.customers, { ...customer, id: Math.max(0, ...state.customers.map(c => c.id)) + 1 }] 
      })),
    updateCustomer: (id, customer) => 
      set((state) => ({ 
        customers: state.customers.map(c => c.id === id ? { ...c, ...customer } : c) 
      })),
    deleteCustomer: (id) => 
      set((state) => ({ 
        customers: state.customers.filter(c => c.id !== id) 
      })),

    // Notifications
    notifications,
    addNotification: (notification) => 
      set((state) => ({ 
        notifications: [
          { 
            ...notification, 
            id: Math.max(0, ...state.notifications.map(n => n.id)) + 1, 
            time: 'Just now', 
            read: false 
          }, 
          ...state.notifications
        ] 
      })),
    markNotificationAsRead: (id) => 
      set((state) => ({ 
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n) 
      })),
    markAllNotificationsAsRead: () => 
      set((state) => ({ 
        notifications: state.notifications.map(n => ({ ...n, read: true })) 
      })),
    deleteNotification: (id) => 
      set((state) => ({ 
        notifications: state.notifications.filter(n => n.id !== id) 
      })),
    get unreadNotificationsCount() {
      return this.notifications.filter(n => !n.read).length;
    },
  };
});