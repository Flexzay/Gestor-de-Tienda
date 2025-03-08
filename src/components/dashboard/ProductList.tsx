import React from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import { ProductFormData } from "../../interface/product";

interface ProductListProps {
  products: ProductFormData[];
  onEdit: (product: ProductFormData) => void;
  onDelete: (product: ProductFormData) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => (
  <div className="mt-8 w-full">
    <h3 className="text-2xl font-bold mb-6 text-gray-900">📦 Productos Agregados</h3>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={index}
          className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2"
        >
          {/* Decoración en la esquina superior derecha */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff204e] dark:bg-[#ff3b61] rounded-bl-full opacity-20"></div>
          
          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-lg bg-[#ff204e] dark:bg-[#ff3b61] text-white shadow-md">
              <Package size={28} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Categoría: {product.category}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Precio:</strong> ${product.price}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Stock:</strong> {product.stock}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Marca:</strong> {product.brand}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Vencimiento:</strong> {product.expirationDate}</p>
          </div>

          {/* Botones de Acción */}
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
  </div>
);

export default ProductList;
