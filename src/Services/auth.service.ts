import { environment } from "../config/environmet";
import { storageService } from "./storage.service";

const API_URL = environment.baseUrl;

export const authService = {
  async login(phone: string) {
    try {
      const response = await fetch(`${API_URL}/auth/phone/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      console.error("Error en la autenticación:", error.message);
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },

  async verifyCode({ userId, code }: { userId: number; code: string }) {
    try {
      if (!userId || isNaN(userId)) throw new Error("El `userId` es requerido y debe ser un número válido.");
      if (!code) throw new Error("El `code` es requerido para verificar el código.");

      const response = await fetch(`${API_URL}/auth/phone/verify/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      const token = data.data?.token;
      if (token) storageService.setToken(token);
      else console.warn("⚠️ No se recibió token en la respuesta.");

      return { status: response.status, data };
    } catch (error: any) {
      console.error("Error verificando código:", error.message);
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },

  isLoggedIn: () => !!storageService.getToken(),
  logout: () => storageService.removeToken(),
};
