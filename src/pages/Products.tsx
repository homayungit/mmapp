import React, { useState } from 'react';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/common/Modal';
import { useAppStore } from '../store';
import { Product } from '../types';

const Products: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const columns = [
    { header: 'ID', accessor: 'id', width: 'w-16' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Price', 
      accessor: (product: Product) => `$${product.price.toFixed(2)}` 
    },
    { header: 'Stock', accessor: 'stock' },
    { 
      header: 'Status', 
      accessor: (product: Product) => (
        <StatusBadge 
          status={product.status} 
          type={
            product.status === 'available' ? 'success' : 
            product.status === 'out_of_stock' ? 'warning' : 
            'error'
          } 
        />
      )
    },
  ];
  
  const handleAddClick = () => {
    setIsEditMode(false);
    setCurrentProduct({ 
      name: '', 
      category: '', 
      price: 0, 
      stock: 0, 
      status: 'available' 
    });
    setIsModalOpen(true);
  };
  
  const handleEditClick = (product: Product) => {
    setIsEditMode(true);
    setCurrentProduct({ ...product });
    setIsModalOpen(true);
  };
  
  const handleDeleteClick = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      deleteProduct(product.id);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    // Update status based on stock
    let status: Product['status'] = 'available';
    if (Number(currentProduct.stock) <= 0) {
      status = 'out_of_stock';
    }
    
    const productData = {
      ...currentProduct,
      price: Number(currentProduct.price),
      stock: Number(currentProduct.stock),
      status
    };
    
    if (isEditMode && currentProduct.id) {
      updateProduct(currentProduct.id, productData);
    } else {
      addProduct(productData as Omit<Product, 'id'>);
    }
    
    setIsModalOpen(false);
    setCurrentProduct(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentProduct) return;
    
    setCurrentProduct({
      ...currentProduct,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      
      <DataTable 
        data={products}
        columns={columns}
        title="Products"
        onAdd={handleAddClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? 'Edit Product' : 'Add Product'}
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
              form="product-form"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {isEditMode ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentProduct?.name || ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={currentProduct?.category || ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={currentProduct?.price || 0}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              value={currentProduct?.stock || 0}
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
              value={currentProduct?.status || 'available'}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            >
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;