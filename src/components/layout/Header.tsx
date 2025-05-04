import React, { useState } from 'react';
import { useAppStore } from '../../store';
import * as Icons from 'lucide-react';
import NotificationMenu from '../ui/NotificationMenu';
import UserMenu from '../ui/UserMenu';

const Header: React.FC = () => {
  const { toggleSidebar, theme, toggleTheme } = useAppStore();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 z-20 flex items-center px-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700"
          >
            <Icons.Menu size={20} />
          </button>
          
          <div className="ml-4 flex items-center">
            <Icons.Layout className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700"
          >
            {theme === 'light' ? <Icons.Moon size={20} /> : <Icons.Sun size={20} />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700 relative"
            >
              <Icons.Bell size={20} />
              <NotificationBadge />
            </button>
            
            {notificationsOpen && (
              <NotificationMenu onClose={() => setNotificationsOpen(false)} />
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="ml-2 flex items-center gap-2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <span className="text-sm font-medium">JD</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">John Doe</span>
              <Icons.ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
            
            {userMenuOpen && (
              <UserMenu onClose={() => setUserMenuOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const NotificationBadge: React.FC = () => {
  const notifications = useAppStore(state => state.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  if (unreadCount === 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {unreadCount}
    </span>
  );
};

export default Header;