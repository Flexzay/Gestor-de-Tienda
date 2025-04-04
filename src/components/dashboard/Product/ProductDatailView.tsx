import { Pencil, Trash2 } from "lucide-react";
import { ProductFormData } from "../../../interface/product";
import Sidebar from "../Sidebar";

interface ProductDetailViewProps {
  product: ProductFormData | null;
  loading: boolean;
  error: string | null;
  onDelete: () => void;
  onEdit: (id: string) => void;
  onBack: () => void;
  getImageUrl: (img?: string) => string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  loading,
  error,
  onDelete,
  onEdit,
  onBack,
  getImageUrl
}) => {
  // Estado de carga
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8 w-full">
          <div className="p-4 text-center">Cargando producto...</div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8 w-full">
          <div className="p-4 text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  // Producto no encontrado
  if (!product) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8 w-full">
          <div className="p-4">Producto no encontrado</div>
        </div>
      </div>
    );
  }

  // Obtener la primera imagen de forma segura
  const firstImage = product.images?.length
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : product.images[0]?.path
    : getImageUrl();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="md:flex">
            <div className="md:w-1/2 p-4">
              <img
                src={getImageUrl(firstImage)}
                className="w-full h-auto max-h-96 object-contain rounded-lg"
                alt={product.name}
                onError={(e) => (e.currentTarget.src = getImageUrl())}
              />
            </div>
            
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                    {product.category?.name || "Sin categoría"}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                </div>
                <span className="text-2xl font-bold text-red-500">
                  ${(product.price || 0).toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <p className="text-gray-600">{product.description}</p>
                
                {product.brand && <p><strong>Marca:</strong> {product.brand}</p>}
                {product.stock !== undefined && <p><strong>Stock:</strong> {product.stock}</p>}
                {product.expirationDate && (
                  <p><strong>Fecha de expiración:</strong> {new Date(product.expirationDate).toLocaleDateString()}</p>
                )}
                <p><strong>Disponibilidad:</strong> {product.available ? "Disponible" : "No disponible"}</p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => onEdit(product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <Pencil size={16} /> Editar
                </button>
                <button
                  onClick={onDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="p-6 border-t">
              <h3 className="text-xl font-semibold mb-4">Más imágenes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.images.slice(1).map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={getImageUrl(typeof img === 'string' ? img : img?.path)}
                      className="w-full h-32 object-cover rounded-lg"
                      alt={`${product.name} ${index + 1}`}
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