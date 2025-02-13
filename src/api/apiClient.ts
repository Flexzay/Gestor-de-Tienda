import axios from "axios";
import { environment } from "../config/environmet";

const apiClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
