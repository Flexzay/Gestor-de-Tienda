import React, { useState } from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import Paginator from "../Paginator"; 

interface ProductListProps {
  products: ProductFormData[];
  onEdit: (product: ProductFormData) => void;
  onDelete: (product: ProductFormData) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="mt-8 w-full pb-30">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">📦 Productos Agregados</h3>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="w-full h-40 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                  <Package size={48} className="text-gray-400" />
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Categoría: {product.category}</p>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Precio:</strong> ${product.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Stock:</strong> {product.stock}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Marca:</strong> {product.brand}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Vencimiento:</strong> {product.expirationDate}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => onEdit(product)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-[#ff204e] hover:text-white transition duration-300"
              >
                <Pencil size={16} className="mr-2" /> Editar
              </button>
              <button
                onClick={() => onDelete(product)}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
              >
                <Trash2 size={16} className="mr-2" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginador reutilizable */}
      <Paginator
        currentPage={currentPage}
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
