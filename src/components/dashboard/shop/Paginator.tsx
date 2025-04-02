import React from "react";
import PaginatorProps from "../../interface/paginator";

const Paginator: React.FC<PaginatorProps> = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; 

  return (
    <div className="flex flex-col items-center mt-6 space-y-2">
      {/* Selector de productos por página */}
      <div className="flex items-center space-x-2">
        <label className="text-gray-700 dark:text-gray-300 text-sm">Mostrar:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
        </select>
        <span className="text-gray-700 dark:text-gray-300 text-sm">productos por página</span>
      </div>

      {/* Botones de paginación */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300 disabled:opacity-50"
        >
          ← Anterior
        </button>

        <span className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-red-700">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300 disabled:opacity-50"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default Paginator;
