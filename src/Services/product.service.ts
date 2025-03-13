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

      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: productData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
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

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al obtener productos" };
    }
  },

  /**
   * Actualizar un producto existente
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
   * Desactivar un producto (no eliminar)
   */
  async disableProduct(productId: number) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token de autenticación válido.");

      const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ available: false }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      return { status: response.status, message: "Producto desactivado con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al desactivar el producto" };
    }
  },
};
