import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import Paginator from "../Paginator";

interface ProductListProps {
  products: ProductFormData[];
  onEdit?: (product: ProductFormData) => void;
  onDelete?: (productId: string | number) => void;
  showTitle?: boolean;
  showActions?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, showTitle = true, showActions = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 8 : 3);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage, itemsPerPage]);

  return (
    <div className="mt-8 w-full pb-30">
      {showTitle && <h3 className="text-2xl font-bold mb-6 text-gray-900">📦 Productos Agregados</h3>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => {
          return (
            <div key={product.id} className="p-3 bg-gray-50 rounded-md border border-gray-200 shadow-md">
              <img
                src={product.images?.[0] || "/default.jpg"} // Mostrar la primera imagen del array
                className="w-20 h-20 object-cover rounded-md mx-auto"
                alt={product.name}
                onError={(e) => (e.currentTarget.src = "/default.jpg")}
              />
              <h4 className="text-center">{product.name}</h4>
              <p className="text-xs text-center">{product.category?.name || "Sin categoría"}</p>
            </div>
          );
        })}

      </div>

      <Paginator currentPage={currentPage} totalItems={products.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProductList;
