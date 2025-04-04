import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Domiduck from "../../../assets/img/domiduck.svg";
import { environment } from "../../../config/environmet";
import { ProductFormData } from "../../../interface/product";
import { productService } from "../../../Services/product.service";
import Sidebar from "../Sidebar";

const getImageUrl = (img?: string) => {
  if (!img) return Domiduck;
  return img.startsWith("http") ? img : `${environment.s3Storage}${img}`;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id || "");
        
        if (response.status !== 200 || !response.data?.data) {
          throw new Error(response.data?.message || "Producto no encontrado");
        }

        const productData = response.data.data;
        
        const formattedProduct: ProductFormData = {
          id: productData.id,
          name: productData.name || "Nombre no disponible",
          description: productData.description || "Sin descripción",
          price: Number(productData.price) || 0,
          category: productData.category || {
            id: productData.category_id,
            name: "Sin categoría"
          },
          images: productData.images || [],
          available: productData.available ?? true,
          brand: productData.brand || "",
          stock: productData.stock || 0,
          expirationDate: productData.expirationDate
        };

        setProduct(formattedProduct);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchProduct();
    } else {
      setError("ID de producto no proporcionado");
      setLoading(false);
    }
  }, [id]);

  const handleDelete = async () => {
    if (!product?.id) return;
    
    try {
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto?");
      if (!confirmDelete) return;
      
      navigate("/products", { replace: true });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setError("No se pudo eliminar el producto");
    }
  };

  if (loading) return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 w-full">
        <div className="p-4 text-center">Cargando producto...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 w-full">
        <div className="p-4 text-red-500">{error}</div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 w-full">
        <div className="p-4">Producto no encontrado</div>
      </div>
    </div>
  );

  const firstImage = product.images?.length
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : product.images[0].path
    : Domiduck;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-4 md:p-8 w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Botón de volver */}
          <button
            onClick={() => navigate(-1)}
            className="ml-4 mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            ← Volver a la lista
          </button>

          <div className="md:flex">
            <div className="md:w-1/2 p-4">
              <img
                src={getImageUrl(firstImage)}
                className="w-full h-auto max-h-96 object-contain rounded-lg"
                alt={product.name}
                onError={(e) => (e.currentTarget.src = Domiduck)}
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
                
                {product.brand && (
                  <p><strong>Marca:</strong> {product.brand}</p>
                )}
                
                {product.stock !== undefined && (
                  <p><strong>Stock:</strong> {product.stock}</p>
                )}
                
                {product.expirationDate && (
                  <p><strong>Fecha de expiración:</strong> {new Date(product.expirationDate).toLocaleDateString()}</p>
                )}
                
                <p>
                  <strong>Disponibilidad:</strong> {product.available ? "Disponible" : "No disponible"}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/product/edit/${product.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <Pencil size={16} />
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          
          {product.images?.length > 1 && (
            <div className="p-6 border-t">
              <h3 className="text-xl font-semibold mb-4">Más imágenes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.images.slice(1).map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={getImageUrl(typeof img === 'string' ? img : img.path)}
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

export default ProductDetail;