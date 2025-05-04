import { storageService } from "./storage.service";
import { environment } from "../config/environmet";

const BASE_URL = environment.baseUrl;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Error ${response.status}: ${errorBody}`);
  }
  return response.json();
};

export const membershipService = {
  getMembershipTypes: async () => {
    const shopId = storageService.getShopId();
    if (!shopId) throw new Error("No se encontró shopId.");
    const res = await fetch(`${BASE_URL}/shop/${shopId}/memberships/types`);
    return handleResponse(res);
  },

  selectMembership: async (membershipId: string) => {
    const shopId = storageService.getShopId();
    if (!shopId) throw new Error("No se encontró shopId.");
    const res = await fetch(`${BASE_URL}/shop/${shopId}/memberships/${membershipId}`, {
      method: "POST"
    });
    return handleResponse(res);
  },

  buyDucks: async (data: FormData) => {
    const shopId = storageService.getShopId();
    if (!shopId) throw new Error("No se encontró shopId.");
    const res = await fetch(`${BASE_URL}/shop/${shopId}/buy_ducks`, {
      method: "POST",
      body: data
    });
    return handleResponse(res);
  },

  getMembershipActive: async () => {
    const res = await fetch(`${BASE_URL}/shop/`);
    return handleResponse(res);
  },

  getHistoryCharges: async () => {
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
  }
};