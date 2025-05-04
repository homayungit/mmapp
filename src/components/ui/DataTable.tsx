import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title: string;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string;
}

function DataTable<T extends { id: number | string }>({
  data,
  columns,
  title,
  onAdd,
  onEdit,
  onDelete
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredData = data.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
      return sortDirection === 'asc'
        ? (a[sortField] as string).localeCompare(b[sortField] as string)
        : (b[sortField] as string).localeCompare(a[sortField] as string);
    }
    
    return sortDirection === 'asc'
      ? (a[sortField] as number) - (b[sortField] as number)
      : (b[sortField] as number) - (a[sortField] as number);
  });
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Icons.Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            
            {onAdd && (
              <button
                onClick={onAdd}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Icons.Plus size={18} />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-slate-600">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 ${
                    column.width || ''
                  }`}
                  onClick={() => typeof column.accessor === 'string' && handleSort(column.accessor)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {typeof column.accessor === 'string' && sortField === column.accessor && (
                      sortDirection === 'asc' ? <Icons.ChevronUp size={16} /> : <Icons.ChevronDown size={16} />
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider w-32">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <tr 
                  key={item.id.toString()}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                      {typeof column.accessor === 'function'
                        ? column.accessor(item)
                        : item[column.accessor] as React.ReactNode}
                    </td>
                  ))}
                  
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <Icons.Edit2 size={18} />
                          </button>
                        )}
                        
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Icons.Trash size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-gray-400 text-sm">
        Showing {sortedData.length} of {data.length} results
      </div>
    </div>
  );
}

export default DataTable;