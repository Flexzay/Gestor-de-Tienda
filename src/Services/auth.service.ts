import { environment } from "../config/environmet";

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
      return { status: response.status, data };
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return { status: 500, message: "Error en el servidor" };
    }
  },

  async verifyCode(phone: string, code: string) {
    try {
      const response = await fetch(`${API_URL}/auth/phone/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error verificando código:", error);
      return { status: 500, message: "Error en el servidor" };
    }
  },

  
  isLoggedIn() {
    return !!localStorage.getItem("token"); // Si hay un token, el usuario está logueado
  },

  logout() {
    localStorage.removeItem("token"); // Elimina el token al cerrar sesión
  },
};
