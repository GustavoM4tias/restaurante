import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({
  baseURL: "https://restaurante-api-gules.vercel.app/api", // URL base da API
});

// Interceptor para capturar erros 401 e forçar logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expirado! Redirecionando para login...");
      const authStore = useAuthStore();
      authStore.logout(); // Desloga o usuário automaticamente
    }
    return Promise.reject(error);
  }
);

export default api;