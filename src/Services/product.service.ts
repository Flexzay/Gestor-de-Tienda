import { environment } from "../config/environmet";
import { storageService } from "../Services/storage.service";
import { ProductFormData } from "../interface/product";

const API_URL = `${environment.baseUrl}/product`;
const S3_BUCKET_URL = environment.s3Storage; // URL base de S3

export const productService = {
  /**
   * Subir imagen a S3 antes de crear el producto
   */
  async uploadImage(productId: string | number, file: File) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_URL}/images/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error(`Error al subir la imagen: ${response.statusText}`);

      const data = await response.json();
      if (!data.data?.path) throw new Error("La API no devolvió una ruta válida para la imagen.");

      return `${S3_BUCKET_URL}${data.data.path}`;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      return null;
    }
  },

  
  /**
   * Crear un nuevo producto
   */
  
  async createProduct(productData: any) {
    try {
      const token = storageService.getToken();
      const shopId = storageService.getShopId();
      if (!token || !shopId) throw new Error("Falta el token o el shopId.");

      // 📌 1️⃣ Crear el producto sin imagen
      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category_id: productData.category_id,
          available: productData.available,
        }),
      });

      if (!response.ok) throw new Error("Error al crear el producto.");

      const createdProduct = await response.json();

      // 📌 2️⃣ Subir la imagen después de crear el producto
      let imageUrl = null;
      if (productData.image) {
        imageUrl = await productService.uploadImage(createdProduct.data.id, productData.image);
      }

      // 📌 3️⃣ Asociar la imagen al producto
      if (imageUrl) {
        await fetch(`${API_URL}/${createdProduct.data.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imageUrl }),
        });
      }

      return {
        status: response.status,
        data: { ...createdProduct.data, image: imageUrl || null },
      };
    } catch (error) {
      console.error("Error al crear producto:", error);
      return { status: 500, message: "Error al crear el producto" };
    }
  },
  

  /**
   * Obtener todos los productos
   */
  async getProducts() {
    try {
      const token = storageService.getToken();
      const shopId = storageService.getShopId();
      if (!token || !shopId) throw new Error("Falta el token o el shopId.");

      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      // Asegurar que todas las imágenes tienen la URL completa
      return {
        status: response.status,
        data: data.data.map((product: any) => ({
          ...product,
          image: product.images?.length
            ? `${S3_BUCKET_URL}${product.images[0].path}`
            : null,
        })),
      };
    } catch (error: any) {
      console.error("Error al obtener productos:", error);
      return { status: 500, message: error.message || "Error al obtener productos" };
    }
  },
  

  /**
   * Actualizar un producto
   */
  async updateProduct(productId: string | number, productData: ProductFormData) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");
  
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("❌ Error en la API:", data);
        throw new Error(data.message || `Error ${response.status}`);
      }
  
      console.log("✅ Producto actualizado con éxito:", data);
      return { status: response.status, data };
    } catch (error: any) {
      console.error("Error al actualizar producto:", error);
      return { status: 500, message: error.message || "Error al actualizar producto" };
    }
  },
  

  /**
   * Obtener detalles de un producto
   */
  async getProductById(productId: string | number) {
    try {
      const token = storageService.getToken();
      const shopId = storageService.getShopId();
      if (!token || !shopId) throw new Error("Falta el token o el shopId.");

      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/product/detail/${productId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al obtener el producto" };
    }
  },

  /**
   * Eliminar una imagen de un producto
   */
  async deleteImage(imageId: string | number) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/images/${imageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      return { status: response.status, message: "Imagen eliminada con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al eliminar la imagen" };
    }
  },

  /**
   * Guardar precios de un producto
   */
  async savePrices(productId: string | number, prices: any) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/price/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prices),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, message: "Precios guardados con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al guardar precios" };
    }
  },

  /**
   * Eliminar un precio de un producto
   */
  async deletePrice(priceId: string | number) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/price/${priceId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      return { status: response.status, message: "Precio eliminado con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al eliminar el precio" };
    }
  },
};
