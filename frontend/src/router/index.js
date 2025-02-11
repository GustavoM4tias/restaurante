// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Login from "../views/Login.vue";
// import Register from "../views/Register.vue";
import ProductDetail from "../views/ProductDetail.vue";
import CreateProduct from "../views/CreateProduct.vue";
import Account from "../views/Account.vue";
import { useAuthStore } from "../stores/auth.js";

const routes = [
  { path: "/", name: "Home", component: Home },
  // { path: "/login", name: "Login", component: Login, meta: { guestOnly: true } },
  // { path: "/register", name: "Register", component: Register, meta: { guestOnly: true } },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetail },
  { 
    path: "/create-product", 
    name: "CreateProduct", 
    component: CreateProduct, 
    meta: { requiresAuth: true, requiredRole: "admin" } // Apenas admins podem criar produtos  
  },
  { 
    path: "/account", 
    name: "Account", 
    component: Account, 
    meta: { requiresAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Função para extrair o role a partir do token
function getRoleFromToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.role;
  } catch (e) {
    return null;
  }
}

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  // Rotas que requerem autenticação
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: "Login" });
  }

  // Rotas exclusivas para visitantes
  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: "Home" });
  }

  // Verifica se a rota requer um role específico
  if (to.meta.requiredRole) {
    const userRole = getRoleFromToken(authStore.token);
    // Permite se o usuário tiver o role requerido ou se for "admin" (admin pode fazer tudo)
    if (userRole !== to.meta.requiredRole && userRole !== "admin") {
      return next({ name: "Home" });
    }
  }

  next();
});

export default router;
