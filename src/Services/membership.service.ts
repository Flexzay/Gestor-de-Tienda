import { storageService } from "./storage.service";
import { environment } from "../config/environmet";

const BASE_URL = environment.baseUrl;

// Maneja la respuesta de fetch: lanza error si no fue exitosa, o devuelve el JSON
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Error ${response.status}: ${errorBody}`);
  }
  return response.json();
};

export const membershipService = {
  /**
   * Obtiene los tipos de membresías disponibles para la tienda actual.
   */
  getMembershipTypes: async () => {
    const shopId = storageService.getShopId();
    if (!shopId) throw new Error("No se encontró shopId.");
    const res = await fetch(`${BASE_URL}/shop/${shopId}/memberships/types`);
    return handleResponse(res);
  },

  /**
   * Selecciona una membresía para la tienda.
   * @param membershipId - ID de la membresía a seleccionar.
   */
  selectMembership: async (membershipId: string) => {
    const shopId = storageService.getShopId();
    if (!shopId) throw new Error("No se encontró shopId.");
    const res = await fetch(`${BASE_URL}/shop/${shopId}/memberships/${membershipId}`, {
      method: "POST"
    });
    return handleResponse(res);
  },

  /**
   * Realiza la compra de "ducks" (créditos).
   * @param data - FormData que contiene los datos de la compra.
   */
  buyDucks: async (data: FormData) => {
    const shopId = storageService.getShopId();
    if (!shopId) throw new Error("No se encontró shopId.");
    const res = await fetch(`${BASE_URL}/shop/${shopId}/buy_ducks`, {
      method: "POST",
      body: data
    });
    return handleResponse(res);
  },

  /**
   * Obtiene información de la membresía activa actual (de toda la tienda, no requiere shopId).
   */
  getMembershipActive: async () => {
    const res = await fetch(`${BASE_URL}/shop/`);
    return handleResponse(res);
  },


  /**
   * Obtiene el historial de compras de "ducks" realizadas en la tienda.
   */
  async getHistoryCharges() {
    try {
      const shopId = storageService.getShopId();
      const token = storageService.getToken();

      if (!shopId) throw new Error("Shop ID no disponible");
      if (!token) throw new Error("Token de autenticación no disponible");

      const response = await fetch(`${BASE_URL}/shop/${shopId}/buy_ducks/history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data: data.data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  }
};
