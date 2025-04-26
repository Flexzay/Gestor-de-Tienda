import type React from "react";
import { ArrowLeft, Pencil,  } from "lucide-react";
import type { ProductFormData, ProductImage } from "../../../interface/product";
import Sidebar from "../Sidebar";
import Domiduck from "../../../assets/img/domiduck.svg";

interface ProductDetailViewProps {
  product: ProductFormData | null;
  loading: boolean;
  error: string | null;
  onDelete: () => void;
  onEdit: (id: string) => void;
  onBack: () => void;
  getImageUrl: (img?: string) => string;
}

const resolveImage = (image: string | ProductImage | File | undefined): string => {
  if (!image) return Domiduck;
  if (typeof image === "string") return image;
  if ("path" in image && typeof image.path === "string") return image.path;
  return Domiduck;
};

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  loading,
  error,
  onBack,
  onEdit,
  getImageUrl,
}) => {
  const renderStatusContainer = (content: React.ReactNode) => (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 pb-20 md:p-20 md:ml-72">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full">
          {content}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return renderStatusContainer(
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-700 font-medium">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return renderStatusContainer(
      <div className="text-red-500 text-center">
        <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold mb-2">Error al cargar el producto</h3>
        <p>{error}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center ml-[15px] sm:ml-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
      </div>
    );
  }

  if (!product) {
    return renderStatusContainer(
      <div className="text-center">
        <svg className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Producto no encontrado</h3>
        <p className="text-gray-500">El producto que buscas no existe o ha sido eliminado.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center ml-[15px] sm:ml-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
      </div>
    );
  }

  const firstImage = resolveImage(product.images?.[0]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 md:ml-72">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </button>
            <button
              onClick={() => onEdit(product.id?.toString() || "")}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </button>
            
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-4 md:p-6 bg-gray-50 flex items-center justify-center">
              <div className="w-full max-w-md">
                <img
                  src={getImageUrl(firstImage)}
                  className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md mx-auto transition-all duration-300 hover:shadow-lg"
                  alt={product.name}
                  onError={(e) => (e.currentTarget.src = getImageUrl())}
                />
              </div>
            </div>

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
                    {product.brand && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Marca:</span>
                        <span>{product.brand}</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Stock:</span>
                      <span className={`${product.stock > 0 ? "text-green-600" : "text-red-600"} font-medium`}>
                        {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
                      </span>
                    </div>

                    {product.expirationDate && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Fecha de expiración:</span>
                        <span>{new Date(product.expirationDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Disponibilidad:</span>
                      <span className={product.available ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {product.available ? "Disponible 🟢" : "No disponible 🔴"}
                      </span>
                    </div>

                    {product.data_table && product.data_table.length > 0 && (
                      <div className="md:col-span-2">
                        <div className="mt-4 space-y-2 border border-gray-200 p-4 rounded-md bg-gray-50">
                          <h3 className="text-lg font-semibold mb-2 text-gray-800">Ingredientes</h3>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {product.data_table.map((ing, i) => (
                              <li key={i}>
                                <span className="font-medium">{ing.item}</span>: {ing.value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      src={getImageUrl(resolveImage(img))}
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
  );
};
