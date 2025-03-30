import axios from "axios";
import { storageService } from "./storage.service";

export const shopService = {
    /**
     * Obtener todos los datos de la tienda desde localStorage.
     */
    getShopData(): any | null {
      const shopData = storageService.getShopData();
      if (!shopData) return null;
  
      return {
        ...shopData,
        media: {
          ...shopData.media,
          front: {
            ...shopData.media?.front,
            path: shopData.media?.front?.path || undefined, 
          },
        },
      };
    },
  
    /**
     * Obtener la imagen de la tienda.
     */
    getShopImage(): string | undefined {
      const shopData = storageService.getShopData();
      return shopData?.media?.front?.path || undefined;
    },
  
    /**
     * Obtener el balance de la tienda desde la API.
     * Se necesita el ID de la tienda almacenado en localStorage.
     */
    async getBalance(): Promise<number | null> {
      try {
        const shopData = storageService.getShopData();
        if (!shopData || !shopData.id) throw new Error("No se encontró shopId");
  
        const response = await axios.get(`${shopData.id}/get_balance`, {
          headers: { Authorization: `Bearer ${storageService.getToken()}` },
        });
  
        if (!response.data || !response.data.data) {
          return null;
        }
  
        const balance = parseFloat(response.data.data.balance);
        return isNaN(balance) ? null : balance;
      } catch (error) {
        console.error("Error obteniendo balance de la tienda:", error);
        return null;
      }
    },
  };
  