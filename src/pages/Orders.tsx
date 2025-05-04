import React, { useState } from 'react';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/common/Modal';
import { useAppStore } from '../store';
import { Order } from '../types';

const Orders: React.FC = () => {
  const { orders, updateOrder, deleteOrder } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Partial<Order> | null>(null);
  
  const columns = [
    { header: 'ID', accessor: 'id', width: 'w-16' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: (order: Order) => (
        <StatusBadge 
          status={order.status} 
          type={
            order.status === 'delivered' ? 'success' : 
            order.status === 'shipped' ? 'info' : 
            order.status === 'pending' ? 'warning' : 
            'error'
          } 
        />
      )
    },
    { 
      header: 'Total', 
      accessor: (order: Order) => `$${order.total.toFixed(2)}` 
    },
    { header: 'Payment Method', accessor: 'paymentMethod' },
  ];
  
  const handleEditClick = (order: Order) => {
    setCurrentOrder({ ...order });
    setIsModalOpen(true);
  };
  
  const handleDeleteClick = (order: Order) => {
    if (window.confirm(`Are you sure you want to delete order #${order.id}?`)) {
      deleteOrder(order.id);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentOrder || !currentOrder.id) return;
    
    updateOrder(currentOrder.id, currentOrder);
    
    setIsModalOpen(false);
    setCurrentOrder(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentOrder) return;
    
    setCurrentOrder({
      ...currentOrder,
      [e.target.name]: e.target.name === 'total' ? Number(e.target.value) : e.target.value,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      
      <DataTable 
        data={orders}
        columns={columns}
        title="Orders"
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Order"
        footerButtons={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="order-form"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Update
            </button>
          </>
        }
      >
        <form id="order-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Order ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={currentOrder?.id || ''}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white cursor-not-allowed"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={currentOrder?.date || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer
            </label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={currentOrder?.customer || ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={currentOrder?.status || 'pending'}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="total" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total
              </label>
              <input
                type="number"
                id="total"
                name="total"
                min="0"
                step="0.01"
                value={currentOrder?.total || 0}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Payment Method
              </label>
              <input
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                value={currentOrder?.paymentMethod || ''}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Orders;