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

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return { status: 500, message: "Error en el servidor" };
    }
  },

  async verifyCode({ userId, code }: { userId: string; code: string }) {
    try {
      if (!userId) throw new Error("🚨 El `userId` es requerido para verificar el código.");
      
      const url = `${API_URL}/auth/phone/verify/${userId}`; // Enviamos el ID como :user
      const body = JSON.stringify({ pin: code });
  
      console.log("📡 Enviando solicitud a:", url);
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
  
      if (response.status === 404) {
        throw new Error(`🚨 Error 404: La URL ${url} no existe.`);
      }
  
      const data = await response.json();
      console.log("✅ Respuesta de la API:", data);
  
      if (data.token) {
        storageService.setToken(data.token);
        return { status: response.status, data };
      }
  
      throw new Error("No se recibió un token válido.");
    } catch (error) {
      console.error("❌ Error verificando código:", error);
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },
  
  isLoggedIn() {
    return !!localStorage.getItem("token");
  },

  logout() {
    localStorage.removeItem("token");
  },
};
