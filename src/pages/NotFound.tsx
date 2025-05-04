import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 mb-6 text-blue-500">
        <Icons.AlertCircle size={64} />
      </div>
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Icons.Home size={20} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};

export default NotFound;