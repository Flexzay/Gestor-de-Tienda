import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductFormData } from "../../interface/product";
import { productService } from "../../Services/product.service";

export const useProductDetail = () => {
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
          expirationDate: productData.expirationDate,
          category_id: 0
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

  return {
    product,
    loading,
    error,
    handleDelete,
    navigate
  };
};