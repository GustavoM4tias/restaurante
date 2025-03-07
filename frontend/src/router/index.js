// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Conta from "../views/Conta.vue";  
import Mapa from "../views/Mapa.vue";  
import Historico from "../views/Historico.vue";
import { useAuthStore } from "../stores/auth.js";
import { eventBus } from "../eventBus";  // Importa o eventBus
import RestauranteDetalhes from "../views/RestauranteDetalhes.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  // {
  //   path: "/create-product",
  //   name: "CreateProduct",
  //   component: CreateProduct,
  //   meta: { requiresAuth: true, requiredRole: "admin" } // Apenas admins podem criar produtos  
  // },
  {
    path: "/conta",
    name: "Conta",
    component: Conta,
    meta: { requiresAuth: true }
  },
  {
    path: "/mapa",
    name: "Mapa",
    component: Mapa,
    meta: { requiresAuth: true }
  },
  {
    path: "/historico",
    name: "Historico",
    component: Historico,
    meta: { requiresAuth: true }
  },
  {
    path: "/restaurante-detalhes",
    name: "RestauranteDetalhes",
    component: RestauranteDetalhes,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Função para extrair o role a partir do token
function pegaTipoDoToken(token) {
  try {
    // console.log("Decodificando token:", token); // Verifica o token recebido
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.warn("Token expirado!");
      return null;
    }

    // console.log("Token decodificado:", payload);
    return payload.role;
  } catch (e) {
    console.error("Erro ao processar token:", e);
    return null;
  }
}

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  if (authStore.token) {
    const role = pegaTipoDoToken(authStore.token);

    if (role === null) {
      console.warn("Token inválido ou expirado!");
      // Evita deslogar diretamente para testar melhor o comportamento
      // authStore.logout();
      // return next({ name: "Login" });
    }
  }
  
  if (to.meta.requiresAuth && !isAuthenticated) { 
    eventBus.emit("open-login");
    return next(false);
  }
  
  // Rotas que requerem autenticação
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   authStore.logout();
  //   return next({ name: "Login" });
  // }

  // Rotas exclusivas para visitantes
  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: "Home" });
  }

  // Verifica se a rota requer um role específico
  // if (to.meta.requiredRole) {
  //   const tipo_usuario = pegaTipoDoToken(authStore.token);
  //   Permite se o usuário tiver o role requerido ou se for "admin"
  //   if (tipo_usuario !== to.meta.requiredRole && tipo_usuario !== "admin") {
  //     return next({ name: "Home" });
  //   }
  // }

  next();
});

export default router;
