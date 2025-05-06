import axios from "axios";
import { storageService } from "./storage.service";
import { environment } from "../config/environment";

const BASE_URL = environment.baseUrl;

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
   * Obtener la imagen principal de la tienda.
   */
  getShopImage(): string | undefined {
    const shopData = storageService.getShopData();
    if (!shopData?.media) return undefined;

    const avatarPath = shopData.media.avatar?.path;
    const frontPath = shopData.media.front?.path;

    if (avatarPath) {;
      return `${environment.s3Storage}${avatarPath}`;
    }

    if (frontPath) {
      return `${environment.s3Storage}${frontPath}`;
    }
    return undefined;
  },

  
  /**
   * Obtener el balance actual de la tienda.
   */
  async getBalance(): Promise<number | null> {
    try {
      const shopData = storageService.getShopData();
      if (!shopData || !shopData.id) throw new Error("No se encontró shopId");

      const response = await axios.get(`${BASE_URL}/shop/${shopData.id}/get_balance`, {
        headers: {
          Authorization: `Bearer ${storageService.getToken()}`,
        },
      });

      const balance = parseFloat(response.data?.data?.balance);
      return isNaN(balance) ? null : balance;
    } catch (error) {
      console.error("Error obteniendo balance de la tienda:", error);
      return null;
    }
  },

  /**
   * Obtener información completa de la tienda desde el backend.
   */
  async getShop() {
    const shopId = storageService.getShopId();
    return axios.get(`${BASE_URL}/shop/${shopId}`, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });
  },

  /**
   * Actualizar datos generales de la tienda.
   */
  async updateShop(data: any) {
    const shopId = storageService.getShopId();
    const res = await axios.put(`${BASE_URL}/shop/${shopId}`, data, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });

    // 🔥 Importante: actualizar datos en localStorage después del cambio
    const updatedShop = await this.getShop();
    storageService.setShopData(updatedShop.data.data);

    return res;
  },


  /**
   * Subir imagen de la tienda.
   * @param imageType - puede ser 'front', 'banner', etc.
   * @param formData - contiene la imagen en un FormData
   */
  async updateImageShop(imageType: string, formData: FormData) {
    const shopId = storageService.getShopId();
    const uploadRes = await axios.post(`${BASE_URL}/shop/${shopId}/images/${imageType}`, formData, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });

    const updatedShop = await this.getShop();
  
    
    storageService.setShopData(updatedShop.data.data);

    return uploadRes; 
  },

  /**
   * Actualizar configuraciones de entrega (deliverySettings).
   */
  async updateDeliverySettings(deliverySettings: any) {
    const shopId = storageService.getShopId();
    return axios.put(`${BASE_URL}/shop/${shopId}`, deliverySettings, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });
  },

  /**
   * Abrir o cerrar la tienda (online/offline).
   */
  async closeAndOpenStore(open: boolean) {
    const shopId = storageService.getShopId();
    return axios.put(`${BASE_URL}/shop/${shopId}`, { open }, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });
  },

  /**
   * Obtener espacios/lugares de la tienda (ej. mesas, stands, etc).
   */
  async getPlaces() {
    const shopId = storageService.getShopId();
    return axios.get(`${BASE_URL}/shop/${shopId}/spaces`, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });
  },

  /**
   * Crear un nuevo espacio/lugar en la tienda.
   */
  async createSpaces(space: any) {
    const shopId = storageService.getShopId();
    return axios.post(`${BASE_URL}/shop/${shopId}/spaces`, space, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });
  },

  /**
   * Actualizar un espacio existente.
   */
  async updatePlace(spaceId: number, data: any) {
    const shopId = storageService.getShopId();
    return axios.put(`${BASE_URL}/shop/${shopId}/spaces/${spaceId}`, data, {
      headers: {
        Authorization: `Bearer ${storageService.getToken()}`,
      },
    });
  },
};