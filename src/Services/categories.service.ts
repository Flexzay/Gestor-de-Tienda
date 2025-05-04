import { environment } from "../config/environmet";
import { storageService } from "./storage.service";

const API_URL = `${environment.baseUrl}/categories`;








export const categoriesService = {
  /**
   *  Obtener categorías
   */
  async getCategories() {
    try {
      const token = storageService.getToken();
      const shop = JSON.parse(localStorage.getItem("shop_data") || "{}");
      const shopId = shop.id;
      if (!token || !shopId) throw new Error("Falta el token o el shop_id.");


      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al obtener categorías" };
    }
  },

  /**
   *  Crear una nueva categoría
   */
  async createCategory(name: string) {
    try {
      const token = storageService.getToken();
      const shop = JSON.parse(localStorage.getItem("shop_data") || "{}");
      const shopId = shop.id;
      if (!token || !shopId) throw new Error("Falta el token o el shop_id.");


      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al crear la categoría" };
    }
  },

  /**
   *  Actualizar una categoría
   */
  async updateCategory(categoryId: number, name: string) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token de autenticación válido.");

      const response = await fetch(`${API_URL}/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al actualizar la categoría" };
    }
  },

  /**
   *  Eliminar una categoría
   */
  async deleteCategory(categoryId: number) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token de autenticación válido.");

      const response = await fetch(`${API_URL}/${categoryId}/delete`, {
        method: "GET", // Según Postman, la eliminación usa `GET`
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al eliminar la categoría" };
    }
  },
};