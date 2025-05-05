import { environment } from "../config/environmet";
import { storageService } from "./storage.service";

const API_URL = `${environment.baseUrl}/shop`;

export const spacesService = {

  /**
   * Crear un espacio (mesa)
   */
  async CreateSpace(shopId: string, data: { name: string; status: boolean; delivery: boolean }) {
    try {
      const token = storageService.getToken();
      const response = await fetch(`${API_URL}/${shopId}/spaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      console.error("Error en CreateSpace:", error);
      throw error;
    }
  },

  /**
   * Obtener todos los espacios
   */
  async GetSpaces(shopId: string) {
    try {
      const token = storageService.getToken();
      const response = await fetch(`${API_URL}/${shopId}/spaces`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      console.error("Error en GetSpaces:", error);
      throw error;
    }
  },

  /**
   * Actualizar un espacio
   */
  async UpdateSpace(shopId: string, spaceId: string, data: Partial<{ name: string; status: boolean; delivery: boolean }>) {
    try {
      const token = storageService.getToken();
      const response = await fetch(`${API_URL}/${shopId}/spaces/${spaceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      console.error("Error en UpdateSpace:", error);
      throw error;
    }
  }
};
