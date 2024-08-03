import React from 'react';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, onPageChange, onItemsPerPageChange, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-1 bg-white text-gray-800"
        >
          {[4, 8, 12].map(count => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
      </div>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
