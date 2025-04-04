// src/pages/private/product/ProductDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Domiduck from "../../../assets/img/domiduck.svg";
import { environment } from "../../../config/environmet";
import { ProductFormData } from "../../../interface/product";

const getImageUrl = (img?: string) => {
  if (!img) return Domiduck;
  return img.startsWith("http") ? img : `${environment.s3Storage}${img}`;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<ProductFormData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Aquí deberías cargar el producto específico usando el ID
    // Esto es un ejemplo, deberías implementar tu propia lógica de carga
    const fetchProduct = async () => {
      try {
        // Simulando una llamada a la API
        // const response = await productService.getProductById(id);
        // setProduct(response.data);
        
        // Mientras tanto, usaremos un mock:
        setProduct({
          id: id || "",
          name: "Producto de ejemplo",
          description: "Descripción detallada del producto",
          price: 99.99,
          category: { id: "1", name: "Categoría ejemplo" },
          images: [Domiduck],
          available: true
        });
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4">Cargando producto...</div>;
  if (!product) return <div className="p-4">Producto no encontrado</div>;

  const firstImage = product.images?.length
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : product.images[0].path
    : Domiduck;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
      >
        ← Volver a la lista
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={getImageUrl(firstImage)}
              className="w-full h-full object-cover"
              alt={product.name}
              onError={(e) => (e.currentTarget.src = Domiduck)}
            />
          </div>
          
          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                  {product.category?.name || "Sin categoría"}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              </div>
              <span className="text-2xl font-bold text-red-500">${product.price}</span>
            </div>
            
            <p className="mt-4 text-gray-600">{product.description}</p>
            
            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => navigate(`/product/edit/${product.id}`)} // Asume que tienes una ruta de edición
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <Pencil size={16} />
                Editar
              </button>
              <button
                onClick={() => {/* Lógica para eliminar */}}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
        
        {/* Sección adicional para mostrar todas las imágenes */}
        {product.images?.length > 1 && (
          <div className="p-6 border-t">
            <h3 className="text-xl font-semibold mb-4">Más imágenes</h3>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={getImageUrl(typeof img === 'string' ? img : img.path)}
                  className="w-full h-32 object-cover rounded-lg"
                  alt={`${product.name} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;