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
  const createProduct = async (formData: ProductFormData) => {
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
  const updateProduct = async (id: number, formData: ProductFormData) => {
    setLoading(true);
    try {
      const response = await productService.updateProduct(id, formData);
      if (response.data) {
        await fetchProducts(); // Recargar productos después de actualizar
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setError("Error al actualizar producto");
    } finally {
      setLoading(false);
    }
  };

    // Eliminar un producto
  // const deleteProduct = async (id: number) => {
  //   setLoading(true);
  //   try {
  //     await productService.deleteProduct(id);
  //     setProducts((prevProducts) =>
  //       prevProducts.filter((product) => product.id !== id)
  //     );
  //   } catch (error) {
  //     console.error("Error al eliminar producto:", error);
  //     setError("Error al eliminar producto");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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
  };
};

export const compressImage = (file: File, maxSizeMB = 3, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto del canvas."));
          return;
        }

        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        // Ajustar tamaño manteniendo la proporción
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Función para comprimir con calidad ajustable
        const compress = (currentQuality: number) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedSizeMB = blob.size / (1024 * 1024);

                if (compressedSizeMB <= maxSizeMB || currentQuality <= 0.2) {
                  resolve(new File([blob], file.name, { type: "image/jpeg" }));
                } else {
                  // Reducir calidad y volver a intentar
                  compress(currentQuality - 0.1);
                }
              } else {
                reject(new Error("Error al comprimir la imagen."));
              }
            },
            "image/jpeg",
            currentQuality
          );
        };

        // Iniciar la compresión con la calidad inicial
        compress(quality);
      };
    };
    reader.onerror = (error) => reject(error);
  });
};


export default useProduct;
