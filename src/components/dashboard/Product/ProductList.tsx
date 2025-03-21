import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  // Actualiza la cantidad de productos mostrados según el tamaño de la pantalla
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 8 : 3);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Cálculo de productos para la página actual
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage, itemsPerPage]);

  // Manejo de edición
  const handleEdit = useCallback(
    (product: ProductFormData) => {
      onEdit?.(product);
    },
    [onEdit]
  );

  // Manejo de eliminación
  const handleDelete = useCallback(
    (product: ProductFormData) => {
      onDelete?.(product);
    },
    [onDelete]
  );

  return (
    <div className="mt-8 w-full pb-30">
      {showTitle && <h3 className="text-2xl font-bold mb-6 text-gray-900">📦 Productos Agregados</h3>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map(({ id, name, image, category, price, stock }) => (
          <div key={id} className="flex flex-col p-3 bg-gray-50 rounded-md border border-gray-200 shadow-md w-full">
            <div className="flex flex-col items-center">
              {image ? (
                <img src={image} alt={name} className="w-20 h-20 object-cover rounded-md shadow-sm" />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md shadow-sm">
                  <Package size={32} className="text-gray-400" />
                </div>
              )}
              <h4 className="font-medium text-gray-800 mt-2 text-center">{name}</h4>
              <p className="text-xs text-gray-500 text-center">
                Categoría: {category?.name || "Sin categoría"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Precio</label>
                <input
                  type="text"
                  value={`$${price}`}
                  disabled
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-center"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Stock</label>
                <input
                  type="text"
                  value={stock ?? "N/A"}
                  disabled
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-center"
                />
              </div>
            </div>

            {showActions && (
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleEdit({ id, name, image, category, price, stock })}
                  className="flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-[#ff204e] hover:text-white transition duration-300"
                  aria-label={`Editar ${name}`}
                >
                  <Pencil size={14} className="mr-1" /> Editar
                </button>
                <button
                  onClick={() => handleDelete({ id, name, image, category, price, stock })}
                  className="flex items-center px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                  aria-label={`Eliminar ${name}`}
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
