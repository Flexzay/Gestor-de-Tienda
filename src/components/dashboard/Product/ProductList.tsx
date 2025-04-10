
import React, { useState, useEffect, useMemo } from "react"
import { Pencil, Trash2, ListCollapse } from "lucide-react"
import type { ProductFormData } from "../../../interface/product"
import Paginator from "../shop/Paginator"
import { useNavigate } from "react-router-dom"
import Domiduck from "../../../assets/img/domiduck.svg"
import { environment } from "../../../config/environmet"

interface ProductListProps {
  products: ProductFormData[]
  onEdit?: (product: ProductFormData) => void
  onDelete?: (productId: string | number) => void
  showTitle?: boolean
}

const getImageUrl = (img?: string) => {
  if (!img) return Domiduck
  return img.startsWith("http") ? img : `${environment.s3Storage}${img}`
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onEdit, 
  onDelete, 
  showTitle = true 
}) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 8 : 4)
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)

    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
    return products.slice(indexOfFirstProduct, indexOfLastProduct)
  }, [products, currentPage, itemsPerPage])

  return (
    <div className="mt-8 w-full pb-20 px-4">
      {showTitle && (
        <h3 className="text-3xl font-bold mb-8 text-gray-900">
          🛒 Nuestros Productos
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentProducts.map((product) => {
          const firstImage = product.images?.length
            ? typeof product.images[0] === "string"
              ? product.images[0]
              : product.images[0].path
            : Domiduck

          return (
            <div
              key={product.id}
              className="w-full bg-white shadow-xl rounded-3xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl border border-gray-200 flex flex-col"
            >
              {/* Imagen del producto */}
              <div className="relative w-full aspect-square bg-gray-100">
                <img
                  src={getImageUrl(firstImage)}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  alt={product.name}
                  onError={(e) => (e.currentTarget.src = Domiduck)}
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-4 py-2 text-sm rounded-tr-2xl z-10">
                  {product.category?.name || "Sin categoría"}
                </div>
              </div>

              {/* Información del producto */}
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                  {product.description}
                </p>
                
                {/* Precio y acciones */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-red-500">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-green-500 text-white p-2.5 rounded-xl hover:bg-green-600 transition"
                      title="Ver detalles"
                    >
                      <ListCollapse size={20} />
                    </button>
                    <button
                      onClick={() => onEdit?.(product)}
                      className="bg-blue-500 text-white p-2.5 rounded-xl hover:bg-blue-600 transition"
                      title="Editar"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => onDelete?.(product.id)}
                      className="bg-red-500 text-white p-2.5 rounded-xl hover:bg-red-600 transition"
                      title="Eliminar"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {products.length > 0 && (
        <Paginator
          currentPage={currentPage}
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value)
            setCurrentPage(1)
          }}
        />
      )}
    </div>
  )
}

export default ProductList