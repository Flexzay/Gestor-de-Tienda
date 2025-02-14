import { environment } from "../config/environmet";
import { storageService } from "./storage.service";

const API_URL = environment.baseUrl;

export const authService = {
  async login(phone) {
    try {
      const response = await fetch(`${API_URL}/auth/phone/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      return { status: response.status, data: await response.json() };
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return { status: 500, message: "Error en el servidor" };
    }
  },

  async verifyCode({ userId, code }) {
    try {
      if (!userId) throw new Error("El `userId` es requerido para verificar el código.");
      
      const response = await fetch(`${API_URL}/auth/phone/verify/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: code }),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();
      if (data.token) storageService.setToken(data.token);
      
      return { status: response.status, data };
    } catch (error) {
      console.error("Error verificando código:", error);
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },

  isLoggedIn: () => !!localStorage.getItem("token"),
  logout: () => localStorage.removeItem("token"),
};
