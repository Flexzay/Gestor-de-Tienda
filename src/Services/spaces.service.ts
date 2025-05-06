import { environment } from "../config/environment";
import { storageService } from "./storage.service";

const API_URL = `${environment.baseUrl}/shop`;

export const spacesService = {
  async CreateSpace(shopId: string, data: { name: string; status: boolean; delivery: boolean }) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("Token no encontrado. Por favor inicia sesión.");
  
      const response = await fetch(`${API_URL}/${shopId}/spaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear espacio: ${errorText}`);
      }
  
      const result = await response.json();
  
      // ✅ Devuelve directamente el objeto de la mesa creada
      return result.data ?? result;
    } catch (error: any) {
      console.error("Error en CreateSpace:", error.message || error);
      throw error;
    }
  },
  

  async GetSpaces(shopId: string) {
    const token = storageService.getToken();
      if (!token) throw new Error("Token no encontrado. Por favor inicia sesión.");
    try {
      const response = await fetch(`${API_URL}/${shopId}/spaces`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener espacios");
      }
  
      const data = await response.json();
      
      // Depuración: ver estructura real de la respuesta
      console.log("Estructura de respuesta:", data);
      
      return data;
    } catch (error) {
      console.error("Error en GetSpaces:", error);
      throw error;
    }
  },

  async UpdateSpace(
    shopId: string,
    spaceId: string,
    data: Partial<{ name: string; status: boolean; delivery: boolean }>
  ) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("Token no encontrado.");

      const response = await fetch(`${API_URL}/${shopId}/spaces/${spaceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar espacio: ${errorText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Error en UpdateSpace:", error.message || error);
      throw error;
    }
  }
};
