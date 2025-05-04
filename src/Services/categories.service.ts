import { environment } from "../config/environmet";
import { storageService } from "./storage.service";

const API_URL = `${environment.baseUrl}/categories`;

const handleRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
  return { status: response.status, data };
};

export const categoriesService = {
  async getCategories() {
    const token = storageService.getToken();
    const shop = JSON.parse(localStorage.getItem("shop_data") || "{}");
    const shopId = shop.id;
    if (!token || !shopId) throw new Error("Missing token or shop_id");

    return handleRequest(`${API_URL}/${shopId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async createCategory(name: string) {
    const token = storageService.getToken();
    const shop = JSON.parse(localStorage.getItem("shop_data") || "{}");
    const shopId = shop.id;
    if (!token || !shopId) throw new Error("Missing token or shop_id");

    return handleRequest(`${API_URL}/${shopId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
  },

  async updateCategory(categoryId: number, name: string) {
    const token = storageService.getToken();
    if (!token) throw new Error("No valid authentication token");

    return handleRequest(`${API_URL}/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
  },

  async deleteCategory(categoryId: number) {
    const token = storageService.getToken();
    if (!token) throw new Error("No valid authentication token");

    return handleRequest(`${API_URL}/${categoryId}/delete`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};