import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-6 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;