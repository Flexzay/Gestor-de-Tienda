import { environment } from "../config/environment";
import { storageService } from "./storage.service";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en la solicitud");
  }
  return await response.json();
};

const getAuthHeaders = () => {
  const token = storageService.getToken();
  if (!token) throw new Error("No hay token de autenticación en localStorage");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const PaymentMethodsService = {
  getConfigurations: async () => {
    try {
      const response = await fetch(`${environment.baseUrl}/methods/config`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getPaymentMethods: async () => {
    const shopId = storageService.getShopData()?.id;
    if (!shopId) throw new Error("No se encontró shopId en localStorage");
  
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods`, {
        headers: getAuthHeaders(),
      });
      const data = await handleResponse(response);
      return data;
    } catch (error) { 
      throw error;
    }
  },

  createPaymentMethod: async (paymentMethod: FormData) => {
    const shopId = storageService.getShopData()?.id;
    if (!shopId) throw new Error("No se encontró shopId en localStorage");
  
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods`, {
        method: "POST",
        headers: { Authorization: `Bearer ${storageService.getToken()}` },
        body: paymentMethod,
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  changeStatusPaymentMethod: async (paymentMethodId: string) => {
    const shopId = storageService.getShopData()?.id;
    if (!shopId) throw new Error("No se encontró shopId en localStorage");

    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods/${paymentMethodId}/status`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  deletePaymentMethod: async (paymentMethodId: string) => {
    const shopId = storageService.getShopData()?.id;
    if (!shopId) throw new Error("No se encontró shopId en localStorage");

    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods/${paymentMethodId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  updatePaymentMethod: async (paymentMethodId: string, paymentMethod: FormData) => {
    const shopId = storageService.getShopData()?.id;
    if (!shopId) throw new Error("No se encontró shopId en localStorage");
  
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods/${paymentMethodId}/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${storageService.getToken()}` },
        body: paymentMethod,
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

export default PaymentMethodsService;