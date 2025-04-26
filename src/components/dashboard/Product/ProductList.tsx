import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Pencil, Trash2, ListCollapse, Tag, ShoppingBag } from "lucide-react"
import type { ProductFormData, ProductImage } from "../../../interface/product"
import Paginator from "../shop/Paginator"
import { useNavigate } from "react-router-dom"
import Domiduck from "../../../assets/img/domiduck.svg"
import { environment } from "../../../config/environmet"

interface ProductListProps {
  products: ProductFormData[]
  onEdit?: (product: ProductFormData) => void
  onDelete?: (productId: string | number) => void
  onSelectProduct?: (product: ProductFormData) => void  
  showTitle?: boolean
}


const getImageUrl = (img?: string) => {
  if (!img) return Domiduck
  return img.startsWith("http") ? img : `${environment.s3Storage}${img}`
}

const resolveImage = (image: string | ProductImage | File): string => {
  if (typeof image === "string") return image
  if ("path" in image && typeof image.path === "string") return image.path
  return Domiduck
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, showTitle = true }) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [, setHoveredCard] = useState<string | number | null>(null)

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 8 : 6)
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="mt-6 w-full pb-16 px-4">
      {showTitle && (
        <div className="flex items-center mb-8">
          <div className="p-2 bg-red-100 rounded-full mr-3">
            <ShoppingBag className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Nuestros Productos</h3>
          <div className="ml-auto bg-gray-100 rounded-full py-1.5 px-3 text-sm text-gray-700 font-medium">
            {products.length} productos
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No hay productos disponibles</h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            No se encontraron productos para mostrar. Intenta agregar nuevos productos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => {
            const firstImage = product.images?.length ? resolveImage(product.images[0]) : Domiduck

            return (
              <div
                key={product.id}
                className="w-full bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 flex flex-col"
                onMouseEnter={() => setHoveredCard(product.id || null)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden group">
                  <img
                    src={getImageUrl(firstImage)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product.name}
                    onError={(e) => (e.currentTarget.src = Domiduck)}
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="bg-white text-gray-800 p-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                        title="Ver detalles"
                      >
                        <ListCollapse size={20} />
                      </button>
                      <button
                        onClick={() => onEdit?.(product)}
                        className="bg-white text-gray-800 p-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                        title="Editar producto"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => product.id !== undefined && onDelete?.(product.id)}
                        className="bg-white text-gray-800 p-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                        title="Eliminar producto"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-gray-800 text-xs font-medium py-1.5 px-3 rounded-full shadow-md flex items-center">
                    <Tag className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                    {product.category?.name || "Sin categoría"}
                  </div>

                  <div
                    className={`absolute top-3 right-3 rounded-full h-8 w-8 flex items-center justify-center shadow-md ${
                      product.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <span className="sr-only">{product.available ? "Disponible" : "No disponible"}</span>
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-red-600 transition-colors duration-200">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{product.description}</p>

                  <div className="mt-auto">
                    <div className="flex items-baseline mb-2">
                      <span className="text-xl font-bold text-red-600">{formatCurrency(product.price)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div
                        className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center ${
                          product.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full mr-1.5 ${
                            product.available ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        {product.available ? "Disponible" : "No disponible"}
                      </div>

                      {product.stock !== undefined && (
                        <div className="text-xs text-gray-500">
                          Stock: <span className="font-medium">{product.stock}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-8">
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
        </div>
      )}
    </div>
  )
}

export default ProductList
