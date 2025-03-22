import { environment } from "../config/environmet";
import { storageService } from "../Services/storage.service";

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
      formData.append("file", file); // Asegúrate de que el backend espera "file"
  
      const response = await fetch(`${API_URL}/product/images/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al subir la imagen: ${errorText}`);
      }
  
      const data = await response.json();
      
      // Retornamos la URL de la imagen en S3 si el backend la envía correctamente
      return data.filename ? `${S3_BUCKET_URL}${data.filename}` : null;
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

      // 📤 Si hay imagen, subir a S3 primero
      if (productData.image) {
        const imageUrl = await productService.uploadImage(shopId, productData.image);
        if (imageUrl) productData.image = imageUrl;
      }

      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Error al crear el producto.");

      const data = await response.json();
      return { status: response.status, data };
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

      return { status: response.status, data: data.data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al obtener productos" };
    }
  },

  /**
   * Actualizar un producto
   */
  async updateProduct(productId: string | number, productData: FormData) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: productData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al actualizar el producto" };
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
