import { environment } from "../config/environmet";
import { storageService } from "../Services/storage.service";

const API_URL = `${environment.baseUrl}/product`;

export const productService = {
  /**
   * Crear un nuevo producto
   */
  async createProduct(productData: FormData) {
    try {
      const token = storageService.getToken();
      const shopId = storageService.getShopId();
      if (!token || !shopId) throw new Error("Falta el token o el shopId.");

      console.log("📤 Enviando datos a la API:", Object.fromEntries(productData.entries())); // 🔹 Verifica qué se está enviando

      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: productData,
      });

      if (!response.ok) {
        const errorData = await response.text(); // Obtén el texto de la respuesta
        console.error("❌ Error del servidor:", errorData);
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      console.log("🔄 Respuesta de la API al crear producto:", data); // 🔹 Revisa si la API devuelve la imagen

      return { status: response.status, data };
    } catch (error: any) {
      console.error("❌ Error al crear el producto:", error.message);
      return { status: 500, message: error.message || "Error al crear el producto" };
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
      if (!token) throw new Error("No hay un token de autenticación válido.");

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
   * Guardar imágenes de un producto
   */
  async saveImages(productId: string | number, images: FormData) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/images/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: images,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, message: "Imágenes guardadas con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al guardar imágenes" };
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
