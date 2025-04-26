import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "../../components/dashboard/Product/ProductDatail";
import { ProductFormData } from "../../interface/product";

const ProductDetailPage = () => {
  const { id } = useParams();  // Obtener el id del producto desde la URL
  const [product, setProduct] = useState<ProductFormData | null>(null);

  // Llamada a la API para obtener el producto por id
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/products/${id}`); // Aquí usas tu API real
          const data = await response.json();
          setProduct(data);  // Guardamos el producto en el estado
        } catch (error) {
          console.error("Error al obtener el producto:", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  // Función para volver atrás
  const handleBack = () => {
    window.history.back();  // Simplemente vuelve a la página anterior
  };

  if (!product) {
    return <div>Cargando...</div>;  // Mostrar un mensaje mientras se carga el producto
  }

  return <ProductDetail product={product} onBack={handleBack} />;
};

export default ProductDetailPage;
