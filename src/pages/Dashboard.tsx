import React from 'react';
import * as Icons from 'lucide-react';
import { useAppStore } from '../store';

const Dashboard: React.FC = () => {
  const { users, products, orders, customers } = useAppStore();
  
  const stats = [
    { 
      title: 'Total Users', 
      value: users.length,
      icon: <Icons.Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      change: '+5%',
      changeType: 'positive'
    },
    { 
      title: 'Products', 
      value: products.length,
      icon: <Icons.ShoppingBag className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />,
      change: '+12%',
      changeType: 'positive'
    },
    { 
      title: 'Orders', 
      value: orders.length,
      icon: <Icons.ShoppingCart className="h-12 w-12 text-amber-600 dark:text-amber-400" />,
      change: '+3%',
      changeType: 'positive'
    },
    { 
      title: 'Customers', 
      value: customers.length,
      icon: <Icons.UserCheck className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
      change: '-2%',
      changeType: 'negative'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600">
            <div className="flex items-center gap-1">
              <Icons.Calendar size={16} />
              <span>Today</span>
            </div>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            <div className="flex items-center gap-1">
              <Icons.Download size={16} />
              <span>Reports</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 transition-transform hover:scale-[1.02] hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                <div className={`flex items-center mt-2 ${
                  stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.changeType === 'positive' ? <Icons.TrendingUp size={16} /> : <Icons.TrendingDown size={16} />}
                  <span className="ml-1 text-sm font-medium">{stat.change} this week</span>
                </div>
              </div>
              <div>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order ID</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="text-right py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="py-3 text-sm text-gray-900 dark:text-white">#{order.id}</td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white">{order.customer}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white text-right">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <a href="/orders" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View all orders →
            </a>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                    <Icons.Box className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                  <p className={`text-xs ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a href="/products" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View all products →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;