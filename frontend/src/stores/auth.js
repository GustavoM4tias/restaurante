// src/stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || ""
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
  },
  actions: {
    async login(email, senha) {
      try {
        const response = await axios.post("http://localhost:5000/api/login", { email, senha });
        // Atualiza token e role a partir da resposta
        this.token = response.data.token;
        this.role = response.data.role; 
        localStorage.setItem("token", this.token);
        localStorage.setItem("role", this.role);
      } catch (error) {
        console.error("Erro no login", error);
        throw error;
      }
    },
    async register(nome, email, senha, role = null) {
      try {
        // Se role for passado, envie-o; caso contrário, o backend definirá "user"
        const data = role ? { nome, email, senha, role } : { nome, email, senha };
        await axios.post("http://localhost:5000/api/register", data, {
          headers: role ? { Authorization: this.token } : {}
        });
      } catch (error) {
        console.error("Erro no registro", error);
        throw error;
      }
    },
    logout() {
      this.token = "";
      this.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});
