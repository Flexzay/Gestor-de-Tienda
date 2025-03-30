import axios from "axios";
import { storageService } from "./storage.service";
import { environment } from "../config/environmet";

const API_URL = environment.baseUrl;

export const membership = {
    getBalance: async () => {
        try {
            const shopData = storageService.getShopData();
            if (!shopData || !shopData.id) throw new Error("No se encontró shopId");

            const response = await axios.get(`${API_URL}/shop/${shopData.id}/get_balance`, {
                headers: { Authorization: `Bearer ${storageService.getToken()}` },
            });
            // Validar que la API devuelve data y balance correctamente
            if (!response.data || !response.data.data) {
                return null;
            }

            // Convertir balance a número y manejar posibles errores
            const balance = parseFloat(response.data.data.balance);
            return isNaN(balance) ? null : balance;
        } catch (error) {
            return null;
        }
    },
};

