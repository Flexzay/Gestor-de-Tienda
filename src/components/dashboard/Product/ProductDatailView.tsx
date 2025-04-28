import type React from "react";
import { ArrowLeft } from "lucide-react";
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
  getImageUrl,
}) => {
  const renderStatusContainer = (content: React.ReactNode) => (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10 lg:p-16 md:ml-72">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 transition-all">{content}</div>
      </div>
    </div>
  );

  if (loading) {
    return renderStatusContainer(
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-800"></div>
        <p className="text-gray-600 font-semibold text-lg">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return renderStatusContainer(
      <div className="flex flex-col items-center text-center text-red-500 space-y-4 py-20">
        <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold">Error al cargar el producto</h2>
        <p className="text-sm">{error}</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2 mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      </div>
    );
  }

  if (!product) {
    return renderStatusContainer(
      <div className="flex flex-col items-center text-center space-y-4 py-20">
        <svg className="h-14 w-14 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700">Producto no encontrado</h2>
        <p className="text-sm text-gray-500">El producto que buscas no existe o ha sido eliminado.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2 mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      </div>
    );
  }

  const firstImage = resolveImage(product.images?.[0]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 lg:p-16 md:ml-72 space-y-8">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 bg-gray-50 p-6 flex justify-center items-center">
              <img
                src={getImageUrl(firstImage)}
                alt={product.name}
                className="w-full max-w-md object-contain rounded-xl shadow-md transition hover:scale-105 duration-300"
                onError={(e) => (e.currentTarget.src = getImageUrl())}
              />
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-6 space-y-6">
              <div className="space-y-2">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {product.category?.name || "Sin categoría"}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
                <p className="text-2xl font-bold text-red-600">${(product.price || 0).toLocaleString()}</p>
              </div>

              {/* Tarjetas de información */}
              <div className="space-y-4">
                {/* Descripción */}
                <div className="bg-gray-50 rounded-xl p-4 shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description || "Sin descripción disponible."}</p>
                </div>

                {/* Detalles del producto */}
                <div className="bg-gray-50 rounded-xl p-4 shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Detalles del producto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    {product.brand && (
                      <div><span className="font-semibold">Marca: </span>{product.brand}</div>
                    )}
                    <div>
                      <span className="font-semibold">Stock: </span>
                      <span className={product.stock > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
                      </span>
                    </div>
                    {product.expirationDate && (
                      <div>
                        <span className="font-semibold">Expiración: </span>
                        {new Date(product.expirationDate).toLocaleDateString()}
                      </div>
                    )}
                    <div>
                      <span className="font-semibold">Disponibilidad: </span>
                      <span className={product.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {product.available ? "Disponible 🟢" : "No disponible 🔴"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ingredientes */}
                {product.data_table && product.data_table.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 shadow">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Ingredientes</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {product.data_table.map((ingredient, index) => (
                        <li key={index}>
                          <span className="font-semibold">{ingredient.item}</span>: {ingredient.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Más imágenes */}
          {product.images && product.images.length > 1 && (
            <div className="p-6 border-t bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Más imágenes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {product.images.slice(1).map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-xl bg-white shadow hover:shadow-md transition">
                    <img
                      src={getImageUrl(resolveImage(img))}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => (e.currentTarget.src = getImageUrl())}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
