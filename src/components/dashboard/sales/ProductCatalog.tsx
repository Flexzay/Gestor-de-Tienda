import React, { useEffect, useState } from "react";
import { Package, Search } from "lucide-react";
import { productService } from "../../../Services/product.service";
import { ProductFormData } from "../../../interface/product";
import Paginator from "../Paginator";
import ProductList from "../Product/ProductList";

const ProductCatalog = () => {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Cantidad de productos por página

  // Se ejecuta al montar el componente para obtener los productos de la API
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener productos desde el servicio API
  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      if (response.status === 200 && response.data) {
        setProducts(Array.isArray(response.data) ? response.data : response.data.data || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]); // En caso de error, se limpia la lista de productos
    }
  };

  // Paginación: calcular el índice de los productos a mostrar
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Título del catálogo */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Package className="mr-2 text-[#ff204e]" size={20} />
        Catálogo de Productos
      </h3>

      {/* Barra de búsqueda y filtro de categorías */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Input de búsqueda */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Selector de categorías */}
        <select className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]">
          <option value="all">Todas las categorías</option>
          <option value="category1">Categoría 1</option>
          <option value="category2">Categoría 2</option>
        </select>
      </div>

      {/* Listado de productos y paginación */}
      <div className="mt-8 w-full pb-30">
        {/* Se reutiliza el componente ProductList para mostrar los productos sin acciones */}
        <ProductList products={currentProducts} showTitle={false} showActions={false} />

        {/* Paginador para navegar entre páginas de productos */}
        <Paginator 
          currentPage={currentPage} 
          totalItems={products.length} 
          itemsPerPage={itemsPerPage} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
};

export default ProductCatalog;
