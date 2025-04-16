import type React from "react"
import { ArrowLeft } from "lucide-react"
import type { ProductFormData } from "../../../interface/product"
import Sidebar from "../Sidebar"

interface ProductDetailViewProps {
  product: ProductFormData | null
  loading: boolean
  error: string | null
  onDelete: () => void
  onEdit: (id: string) => void
  onBack: () => void
  getImageUrl: (img?: string) => string
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  loading,
  error,
  onBack,
  getImageUrl,
}) => {
  // Contenido común para estados de carga/error
  const renderStatusContainer = (content: React.ReactNode) => (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 md:ml-72">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full">
          {content}
        </div>
      </div>
    </div>
  )

  // Estado de carga
  if (loading) {
    return renderStatusContainer(
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-700 font-medium">Cargando producto...</p>
      </div>
    )
  }

  // Estado de error
  if (error) {
    return renderStatusContainer(
      <div className="text-red-500 text-center">
        <svg
          className="h-12 w-12 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">Error al cargar el producto</h3>
        <p>{error}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
      </div>
    )
  }

  // Producto no encontrado
  if (!product) {
    return renderStatusContainer(
      <div className="text-center">
        <svg
          className="h-12 w-12 mx-auto mb-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Producto no encontrado</h3>
        <p className="text-gray-500">El producto que buscas no existe o ha sido eliminado.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
      </div>
    )
  }

  // Obtener la primera imagen de forma segura
  const firstImage = product.images?.length
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : product.images[0]?.path
    : getImageUrl()

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 md:ml-72">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Volver</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Sección de imagen */}
            <div className="md:w-1/2 p-4 md:p-6 bg-gray-50 flex items-center justify-center">
              <div className="w-full max-w-md">
                <img
                  src={getImageUrl(firstImage) || "/placeholder.svg"}
                  className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md mx-auto transition-all duration-300 hover:shadow-lg"
                  alt={product.name}
                  onError={(e) => (e.currentTarget.src = getImageUrl())}
                />
              </div>
            </div>

            {/* Sección de detalles */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                    {product.category?.name || "Sin categoría"}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
                <span className="text-xl font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg self-start shadow-sm">
                  ${(product.price || 0).toLocaleString()}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || "Sin descripción disponible."}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Detalles del producto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Marca */}
                    {product.brand && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Marca:</span>
                        <span>{product.brand}</span>
                      </div>
                    )}

                    {/* Stock */}
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Stock:</span>
                      <span className={`${product.stock > 0 ? "text-green-600" : "text-red-600"} font-medium`}>
                        {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
                      </span>
                    </div>

                    {/* Fecha de expiración */}
                    {product.expirationDate && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Fecha de expiración:</span>
                        <span>{new Date(product.expirationDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    {/* Disponibilidad */}
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Disponibilidad:</span>
                      <span className={product.available ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {product.available ? "Disponible 🟢" : "No disponible 🔴"}
                      </span>
                    </div>

                    {product.data_table && product.data_table.length > 0 ? (
                      <div className="md:col-span-2">
                        <div className="mt-4 space-y-2 border border-gray-200 p-4 rounded-md bg-gray-50">
                          <h3 className="text-lg font-semibold mb-2 text-gray-800">Ingredientes</h3>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {product.data_table.map((ing, i) => (
                              <li key={i} className="flex justify-between">
                                <span>
                                  <span className="font-medium">{ing.item}</span>: {ing.value}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Galería de imágenes adicionales */}
          {product.images && product.images.length > 1 && (
            <div className="p-4 md:p-6 border-t bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Más imágenes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {product.images.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white border border-gray-200"
                  >
                    <img
                      src={getImageUrl(typeof img === "string" ? img : img?.path)}
                      className="w-full h-28 object-cover"
                      alt={`${product.name} ${index + 1}`}
                      onError={(e) => (e.currentTarget.src = getImageUrl())}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}