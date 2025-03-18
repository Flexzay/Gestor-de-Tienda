import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import Paginator from "../Paginator";

interface ProductListProps {
  products: ProductFormData[];
  onEdit?: (product: ProductFormData) => void;
  onDelete?: (product: ProductFormData) => void;
  showTitle?: boolean;
  showActions?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, showTitle = true, showActions = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="mt-8 w-full pb-30">
      {showTitle && <h3 className="text-2xl font-bold mb-6 text-gray-900">📦 Productos Agregados</h3>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product, index) => (
          <div key={index} className="flex flex-col p-3 bg-gray-50 rounded-md border border-gray-200 shadow-md w-full">
            <div className="flex flex-col items-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md shadow-sm">
                  <Package size={32} className="text-gray-400" />
                </div>
              )}
              <h4 className="font-medium text-gray-800 mt-2 text-center">{product.name}</h4>
              <p className="text-xs text-gray-500 text-center">Categoría: {product.category}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Precio</label>
                <input
                  type="text"
                  value={`$${product.price}`}
                  disabled
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-center"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Stock</label>
                <input
                  type="text"
                  value={product.stock}
                  disabled
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-center"
                />
              </div>
            </div>

            {showActions && (
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => onEdit && onEdit(product)}
                  className="flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-[#ff204e] hover:text-white transition duration-300"
                >
                  <Pencil size={14} className="mr-1" /> Editar
                </button>
                <button
                  onClick={() => onDelete && onDelete(product)}
                  className="flex items-center px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  <Trash2 size={14} className="mr-1" /> Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

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
