import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store';
import { ChevronRight, LayoutDashboard, Users, ShoppingBag, Package } from 'lucide-react';
import { MenuItem } from '../../types';
import { menuItems } from '../../data';

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
}

const iconMap = {
  'LayoutDashboard': LayoutDashboard,
  'Users': Users,
  'ShoppingBag': ShoppingBag,
  'Package': Package
};

const SidebarItem: React.FC<SidebarItemProps> = ({ item, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const isActive = item.path ? location.pathname === item.path : false;
  const hasChildren = item.children && item.children.length > 0;
  
  const isActiveParent = hasChildren 
    ? item.children?.some(child => 
        child.path === location.pathname || 
        child.children?.some(grandchild => grandchild.path === location.pathname)
      )
    : false;

  const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;

  return (
    <div className="w-full">
      {!hasChildren && item.path ? (
        <NavLink
          to={item.path}
          className={({ isActive }) => `
            block relative py-2 px-3 rounded-md transition-colors
            ${level === 0 ? 'mb-1' : 'ml-4'}
            ${isActive 
              ? 'bg-blue-50 text-blue-700 dark:bg-slate-700 dark:text-blue-300' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }
          `}
        >
          <div className="flex items-center gap-3" style={{ paddingLeft: `${level * 12}px` }}>
            {Icon && <Icon size={18} />}
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        </NavLink>
      ) : (
        <div 
          className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors
            ${level === 0 ? 'mb-1' : 'ml-4'}
            ${isActiveParent 
              ? 'bg-blue-50 text-blue-700 dark:bg-slate-700 dark:text-blue-300' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          onClick={() => hasChildren && setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between w-full" style={{ paddingLeft: `${level * 12}px` }}>
            <div className="flex items-center gap-3">
              {Icon && <Icon size={18} />}
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            {hasChildren && (
              <ChevronRight
                size={16}
                className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
              />
            )}
          </div>
        </div>
      )}

      {hasChildren && expanded && (
        <div className="mt-1">
          {item.children?.map((child) => (
            <SidebarItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { sidebarOpen } = useAppStore();
  
  return (
    <aside 
      className={`fixed top-16 bottom-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transition-all duration-300 z-30
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}
    >
      <div className="p-4 h-full overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              {sidebarOpen ? (
                <SidebarItem item={item} />
              ) : (
                <div 
                  className="py-2 flex justify-center hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md"
                  title={item.title}
                >
                  {item.icon && iconMap[item.icon as keyof typeof iconMap] && 
                    React.createElement(iconMap[item.icon as keyof typeof iconMap], { size: 20 })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;