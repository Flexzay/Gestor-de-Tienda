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
  
      const data = await response.json();
      console.log("📩 Respuesta del servidor en login:", data); // 🔍 Agregar log
  
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
  
      return { status: response.status, data };
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },
 

  async verifyCode({ userId, code }) {
    try {
      if (!userId || isNaN(Number(userId))) throw new Error("El `userId` es requerido y debe ser un número válido.");
      if (!code) throw new Error("El `code` es requerido para verificar el código.");
  
      const response = await fetch(`${API_URL}/auth/phone/verify/${Number(userId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: code }),
      });
  
      const data = await response.json();
      console.log("📩 Respuesta de verifyCode:", data); // 🔍 Verificar la estructura real de la respuesta
  
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
  
      const token = data.data?.token; // 🔑 Acceder correctamente al token dentro de "data.data"
  
      if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Token guardado correctamente:", token);
      } else {
        console.warn("⚠️ No se recibió token en la respuesta.");
      }
  
      return { status: response.status, data };
    } catch (error) {
      console.error("Error verificando código:", error.message);
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },

  isLoggedIn: () => !!storageService.getToken(),
  logout: () => storageService.removeToken(),
};
