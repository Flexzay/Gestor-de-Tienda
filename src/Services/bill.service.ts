import { environment } from "../config/environment";
import { storageService } from "./storage.service";

const baseUrl = environment.baseUrl;
const shopId = storageService.getShopId();

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${storageService.getToken()}`,
});

export const billService = {
  // 🔹 Obtener facturas activas
  async getBillsActive() {
    const response = await fetch(`${baseUrl}/${shopId}/bills/active`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener facturas activas");
    return response.json();
  },

  // 🔹 Obtener facturas procesadas
  async getBillsProcessed() {
    const response = await fetch(`${baseUrl}/${shopId}/bills/processed`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener facturas procesadas");
    return response.json();
  },

  // 🔹 Obtener detalle de factura
  async getBillDetail(billId: number) {
    const response = await fetch(`${baseUrl}/${shopId}/bills/${billId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener detalle de factura");
    return response.json();
  },

  // 🔹 Crear factura
  async createBill(data: any) {
    const response = await fetch(`${baseUrl}/${shopId}/bills`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear factura");
    return response.json();
  },

  // 🔹 Crear factura en sitio
  async createBillInSite(data: any) {
    const response = await fetch(`${baseUrl}/${shopId}/bills/in-site`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear factura en sitio");
    return response.json();
  },

  // 🔹 Obtener facturas en sitio
  async getBillsInSite() {
    const response = await fetch(`${baseUrl}/${shopId}/bills/in-site`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener facturas en sitio");
    return response.json();
  },

  // 🔹 Asignar cliente a factura
  async assignClientToBill(billId: number, clientId: number) {
    const response = await fetch(`${baseUrl}/${shopId}/bills/in-site/${billId}/add-client`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ client_id: clientId }),
    });
    if (!response.ok) throw new Error("Error al asignar cliente a factura");
    return response.json();
  },

  // 🔹 Cambiar estado de una factura
  async changeStatus(billId: number, status: number, code?: string) {
    const body: any = { status };
    if (code) body.code = code;

    const response = await fetch(`${baseUrl}/${shopId}/bills/${billId}/status`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Error al cambiar estado de la factura");
    return response.json();
  },

  // 🔹 Validar código de factura
  async validateBillCode(billId: number, code: string) {
    const response = await fetch(`${baseUrl}/${shopId}/bills/${billId}/status`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ code }),
    });
    if (!response.ok) throw new Error("Error al validar código de factura");
    return response.json();
  },

  // 🔹 Resumen del día
  async getDayResument(day: string) {
    const response = await fetch(`${baseUrl}/${shopId}/bills/day`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ day }),
    });
    if (!response.ok) throw new Error("Error al obtener resumen diario");
    return response.json();
  },

  // 🔹 Marcar voucher como leído
  async markVoucherAsRead(voucherId: number) {
    const response = await fetch(`${baseUrl}/${shopId}/bills/vouchers/${voucherId}/read`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al marcar voucher como leído");
    return response.json();
  },

  // 🔹 Aprobar voucher
  async approveVoucher(voucherId: number, status: boolean) {
    const response = await fetch(`${baseUrl}/${shopId}/bills/vouchers/${voucherId}/approved`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Error al aprobar voucher");
    return response.json();
  },
};
