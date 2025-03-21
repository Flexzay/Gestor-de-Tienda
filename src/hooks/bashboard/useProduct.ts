import { useState, useEffect } from "react";
import { productService } from "../../Services/product.service";
import { ProductFormData } from "../../interface/product";

const useProduct = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener la lista de productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      if (response.status === 200 && response.data) {
        setProducts(Array.isArray(response.data) ? response.data : response.data.data || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo producto
  const createProduct = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await productService.createProduct(formData);
      if (response.data) {
        setProducts((prevProducts) => [...prevProducts, response.data]);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      setError("Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un producto existente
  const updateProduct = async (id: number, formData: FormData) => {
    setLoading(true);
    try {
      const response = await productService.updateProduct(id, formData);
      if (response.data) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? response.data : product
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setError("Error al actualizar producto");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await productService.deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setError("Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProduct;