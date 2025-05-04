import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../../store';
import * as Icons from 'lucide-react';
import { Notification } from '../../types';

interface NotificationMenuProps {
  onClose: () => void;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({ onClose }) => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification 
  } = useAppStore();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-slate-700 z-30"
    >
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button 
            onClick={markAllNotificationsAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Mark all as read
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification}
              onMarkAsRead={markNotificationAsRead}
              onDelete={deleteNotification}
            />
          ))
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200 dark:border-slate-700">
        <button className="w-full py-2 text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          View all notifications
        </button>
      </div>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'info':
        return <Icons.Info size={16} className="text-blue-500" />;
      case 'warning':
        return <Icons.AlertTriangle size={16} className="text-amber-500" />;
      case 'success':
        return <Icons.CheckCircle size={16} className="text-green-500" />;
      case 'error':
        return <Icons.XCircle size={16} className="text-red-500" />;
      default:
        return <Icons.Bell size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <div 
      className={`mb-2 p-3 rounded-md ${notification.read 
        ? 'bg-gray-50 dark:bg-slate-700/50' 
        : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400'
      }`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium">{notification.title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-500">{notification.time}</span>
            <div className="flex space-x-2">
              {!notification.read && (
                <button 
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Mark as read
                </button>
              )}
              <button 
                onClick={() => onDelete(notification.id)}
                className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMenu;