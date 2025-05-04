import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAppStore } from '../../store';

const Layout: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const location = useLocation();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
    
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname, setSidebarOpen]);
  
  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main 
          className={`flex-1 p-6 transition-all duration-300 overflow-y-auto
            ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}
        >
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;