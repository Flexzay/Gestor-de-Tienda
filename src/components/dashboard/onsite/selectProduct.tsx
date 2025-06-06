import React from "react"
import { ShoppingCart, AlertCircle, Search, Package, Loader, Filter, X } from "lucide-react"
import { useSelectProduct } from "../../../hooks/bashboard/useSelectProduct"
import type { ProductFormData } from "../../../interface/product"

interface SelectProductProps {
  onAddProduct: (product: ProductFormData) => void
}

const SelectProduct: React.FC<SelectProductProps> = ({ onAddProduct }) => {
  const {
    filteredProducts,
    loading,
    error,
    searchTerm,
    categories,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
    formatPrice,
    clearFilters,
    getImageUrl
  } = useSelectProduct()

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 mb-8">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Producto</h3>
          <div className="text-sm text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Elige los productos para agregar a la orden
        </p>
      </div>

      {/* Filtros */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filtro visual por categoría */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              {selectedCategory || "Todas las categorías"}
            </button>
          </div>
        </div>

        {/* Chips de filtros activos */}
        {(searchTerm || selectedCategory) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Búsqueda: {searchTerm}
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Categoría: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 text-green-500 hover:text-green-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
            >
              Limpiar todos
            </button>
          </div>
        )}
      </div>

      {/* Lista de categorías */}
      {categories.length > 0 && (
        <div className="px-4 py-2 border-b border-gray-100 overflow-x-auto">
          <div className="flex space-x-2 pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={`px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lista de productos */}
      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader className="h-8 w-8 text-blue-500 animate-spin mb-2" />
            <span className="text-gray-600">Cargando productos...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 font-medium">
              No hay productos disponibles con los filtros actuales.
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-3 border rounded-lg hover:shadow-sm transition-shadow bg-white"
              >
                <div className="flex-shrink-0">
                  {getImageUrl(product.images) ? (
                    <img
                      src={getImageUrl(product.images)}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="ml-3 flex-grow min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.category?.name && (
                      <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {product.category.name}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  onClick={() => onAddProduct(product)}
                  title="Agregar producto"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectProduct