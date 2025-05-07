import { environment } from "../config/environment";

const baseUrl = environment.baseUrl;

export const userService = {
  async consultUser(phoneNumber: string) {
    const response = await fetch(`${baseUrl}/users/consult/${phoneNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al consultar el usuario");
    }

    return response.json(); // suponiendo que devuelve un objeto tipo `Response`
  },

  async registerUser(userId: number, data: any) {
    const response = await fetch(`${baseUrl}/users/register/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }

    return response.json(); // suponiendo que devuelve un objeto tipo `Response`
  }
};
