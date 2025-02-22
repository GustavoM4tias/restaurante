import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    tipo: localStorage.getItem("tipo") || ""
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    tipo_usuario: (state) => state.tipo
  },
  actions: {
    async login(email, senha) {
      try {
        const response = await axios.post("http://192.168.3.66:5000/api/login", { email, senha });
        // Atualiza token e tipo a partir da resposta
        this.token = response.data.token;
        this.tipo = response.data.tipo;  
        // this.tema = response.data.tema;
        localStorage.setItem("token", this.token);
        localStorage.setItem("tipo", this.tipo); 
      } catch (error) {
        console.error("Erro no login", error);
        throw error;
      }
    },
    async register(nome, email, senha, tipo = null) {
      try {
        const data = tipo ? { nome, email, senha, tipo } : { nome, email, senha };
        await axios.post("http://192.168.3.66:5000/api/register", data, {
          headers: tipo ? { Authorization: this.token } : {}
        });
      } catch (error) {
        // Verifica se o erro é de token expirado
        if (
          error.response &&
          error.response.data &&
          error.response.data.msg === "Token expired"
        ) {
          this.logout();
          window.location.href = "/login";
        }
        console.error("Erro no registro", error);
        throw error;
      }
    },
    async updateUserInfo(updatedData) {
      try {
        const response = await axios.put("http://192.168.3.66:5000/api/account", updatedData, {
          headers: {
            Authorization: this.token
          }
        });
        this.user = response.data;  
      } catch (error) {
        console.error("Erro ao atualizar conta:", error);
      }
    },
    async fetchUserInfo() {
      try {
        const response = await axios.get("http://192.168.3.66:5000/api/account", {
          headers: {
            Authorization: this.token
          }
        });
        this.user = response.data;
        this.tema = response.data.tema; 
      } catch (error) {
        console.error("Erro ao buscar dados da conta:", error);
      }
    },
    logout() {
      this.token = "";
      this.tipo = "";
      localStorage.removeItem("token");
      localStorage.removeItem("tipo");
      window.location.href = "/";
    },
  },
});

