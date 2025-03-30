import { defineStore } from "pinia";
import api from "../services/api"; // Importa Axios com interceptores

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    tipo: localStorage.getItem("tipo") || "",
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    tipo_usuario: (state) => state.tipo
  },
  actions: {
    // Login do usuário
    async login(email, senha) {
      try {
        const response = await api.post("/login", { email, senha });

        this.token = response.data.token;
        this.tipo = response.data.tipo;
        this.user = response.data.usuario; // Guarda dados do usuário

        localStorage.setItem("token", this.token);
        localStorage.setItem("tipo", this.tipo);
      } catch (error) {
        console.error("Erro no login", error);
        throw error;
      }
    },

    // Registro de usuário
    async register(nome, email, senha, tipo = null) {
      try {
        const data = tipo ? { nome, email, senha, tipo } : { nome, email, senha };
        await api.post("/register", data, {
          headers: tipo ? { Authorization: this.token } : {}
        });
      } catch (error) {
        console.error("Erro no registro", error);
        throw error;
      }
    },

    // Atualizar informações do usuário
    async updateUserInfo(updatedData) {
      try {
        const response = await api.put("/account", updatedData, {
          headers: { Authorization: this.token }
        });
        this.user = response.data;
      } catch (error) {
        console.error("Erro ao atualizar conta:", error);
      }
    },

    // Buscar dados do usuário logado
    async fetchUserInfo() {
      try {
        const response = await api.get("/account", {
          headers: { Authorization: this.token }
        });
        this.user = response.data;
      } catch (error) {
        console.error("Erro ao buscar dados da conta:", error);
      }
    },

    // Logout do usuário
    logout() {
      this.token = "";
      this.tipo = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("tipo");

      if (window.location.pathname !== "/conta") { // Evita redirecionar para login se já estiver lá
        window.location.href = "/conta"; 
      }
    },
  },
});
