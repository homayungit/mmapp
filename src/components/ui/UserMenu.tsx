import React, { useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClose }) => {
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
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-slate-700 z-30"
    >
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold">John Doe</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
          <Icons.User size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm">Profile</span>
        </a>
        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
          <Icons.Settings size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm">Settings</span>
        </a>
        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
          <Icons.HelpCircle size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm">Help</span>
        </a>
      </div>
      
      <div className="p-2 border-t border-gray-200 dark:border-slate-700">
        <button className="flex w-full items-center gap-2 p-2 rounded-md text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700">
          <Icons.LogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;