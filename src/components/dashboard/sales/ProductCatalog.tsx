import React from "react";
import { Package, Search } from "lucide-react";

const ProductCatalog = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Package className="mr-2 text-[#ff204e]" size={20} />
        Catálogo de Productos
      </h3>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <select className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]">
          <option value="all">Todas las categorías</option>
          <option value="category1">Categoría 1</option>
          <option value="category2">Categoría 2</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Aquí irían los productos */}
      </div>
    </div>
  );
};

export default ProductCatalog;