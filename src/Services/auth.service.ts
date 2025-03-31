import { environment } from "../config/environmet";
import { storageService } from "./storage.service";

const API_URL = environment.baseUrl;

export const authService = {
  /**
   *  Iniciar sesión con número de teléfono
   */
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
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },

  /**
   * Verificar código y guardar token + shop_id
   */
  async verifyCode({ userId, code }: { userId: number; code: string }) {
    try {
      if (!userId || isNaN(userId)) throw new Error("❌ `userId` debe ser un número válido.");
      if (!code) throw new Error("❌ `code` es requerido.");
  
      const response = await fetch(`${API_URL}/auth/phone/verify/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
  
      const { token, shop } = data.data || {};
      
      if (token) storageService.setToken(token);
      if (shop) {
        localStorage.setItem("shop_data", JSON.stringify(shop)); // ✅ Guarda TODO el objeto `shop`
      }
      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error en el servidor" };
    }
  },
  

  /**
   *  Verificar si el usuario está autenticado
   */
  isLoggedIn: () => !!storageService.getToken(),

  /**
   * 🚪 Cerrar sesión eliminando credenciales
   */
  logout: () => {
    storageService.removeToken();
    localStorage.removeItem("shop_data");  
    localStorage.removeItem("phone");
    localStorage.removeItem("userId");
  },
  
};
