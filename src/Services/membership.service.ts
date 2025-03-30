import axios from "axios";
import { storageService } from "./storage.service"; 
import { environment } from "../config/environmet"; 

const API_URL = environment.baseUrl;

export const membership = {
  getBalance: async () => {
    try {
      const shopData = storageService.getShopData(); 
      console.log("📌 shopData obtenido:", shopData);

      if (!shopData || !shopData.id) throw new Error("No se encontró shopId");

      const response = await axios.get(`${API_URL}/shop/${shopData.id}/get_balance`, {
        headers: { Authorization: `Bearer ${storageService.getToken()}` },
      });

      console.log("📌 Respuesta de la API:", response.data);

      // Verificamos si response.data o response.data.data es null
      if (!response.data || !response.data.data) {
        console.warn("⚠️ No se encontró información de créditos en la API.");
        return null; // Retornar null para evitar mostrar 0
      }

      return response.data.data.credits ?? null; // Retornamos null si no hay créditos
    } catch (error) {
      console.error("❌ Error obteniendo el balance:", error);
      return null; // Retornamos null en caso de error
    }
  },
};
