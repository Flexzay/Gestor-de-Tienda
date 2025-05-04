import { environment } from "../config/environmet";
import { storageService } from "./storage.service";

const API_URL = environment.baseUrl;

const handleRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
  return { status: response.status, data };
};

export const authService = {
  async login(phone: string) {
    return handleRequest(`${API_URL}/auth/phone/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
  },

  async verifyCode({ userId, code }: { userId: number; code: string }) {
    if (!userId || isNaN(userId)) throw new Error("Invalid user ID");
    if (!code) throw new Error("Verification code is required");

    const result = await handleRequest(`${API_URL}/auth/phone/verify/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: code }),
    });

    const { token, shop } = result.data || {};
    if (token) storageService.setToken(token);
    if (shop) {
      localStorage.setItem("shop_data", JSON.stringify(shop));
    }
    return result;
  },

  isLoggedIn: () => !!storageService.getToken(),

  logout: () => {
    storageService.removeToken();
    localStorage.removeItem("shop_data");
    localStorage.removeItem("phone");
    localStorage.removeItem("userId");
  },
};