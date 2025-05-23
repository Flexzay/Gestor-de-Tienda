import { storageService } from "./storage.service";
import { environment } from "../config/environment";
import { NewOrderOnSite } from "../interface/onsiteOrder";

const BASE_URL = environment.baseUrl;

const getShopId = () => {
  const shopId = storageService.getShopId();
  if (!shopId) throw new Error("Shop ID no disponible");
  return shopId;
};

const getHeaders = () => {
  const token = storageService.getToken();
  if (!token) throw new Error("Token no disponible");

  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
  return data;
};

export const orderService = {
  /**
   * Crea una orden en sitio
   * @param orderData - Datos de la orden in-site
   */
  createOnsiteOrder: async (orderData: NewOrderOnSite) => {
    const shopId = getShopId();

    const response = await fetch(`${BASE_URL}/${shopId}/bills/in-site`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData?.message || `Error ${response.status}`);
    }

    const bill = responseData?.data?.bills;

    if (!bill?.id) {
      console.warn("Respuesta sin ID:", responseData);
      throw new Error("La respuesta del servidor no incluye el ID de la orden.");
    }

    return {
      success: true,
      data: bill,
      message: responseData.message || "Orden creada correctamente",
    };
  },


  /**
   * Obtiene todas las órdenes en sitio
   */
  getOnSiteOrders: async () => {
    const shopId = getShopId();
    const res = await fetch(`${BASE_URL}/${shopId}/bills/in-site`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

    /**
     * Asigna un cliente a una orden en sitio
     * @param clientId - ID del cliente
     * @param orderId - ID de la orden
     */
    assignClientToOnsiteOrder: async (clientId: number, orderId: string | number) => {
      const shopId = getShopId();
      const res = await fetch(`${BASE_URL}/${shopId}/bills/in-site/${orderId}/add-client`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ client_id: clientId }),
      });
      return handleResponse(res);
    },
};
