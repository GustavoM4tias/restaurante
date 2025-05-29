// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/config/authModal'; // <-- precisa importar
import Home from '../views/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: () => import('@/components/auth/Login.vue') },
    { path: '/register', name: 'Register', component: () => import('@/components/auth/Register.vue') },
    { path: '/restaurantes/:id', name: 'RestauranteDetalhes', component: () => import('@/views/RestauranteDetalhes.vue'), props: true, meta: { hideNavbar: true, requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: () => import('@/views/profile/Index.vue'), meta: { requiresAuth: true } },
    { path: '/profile/account', name: 'ProfileAccount', component: () => import('@/views/profile//account/Index.vue'), meta: { requiresAuth: true } },
    { path: '/profile/account/personal', name: 'ProfileAccountPersonal', component: () => import('@/views/profile/account/Personal.vue'), props: true, meta: { hideNavbar: true, requiresAuth: true } },
    { path: '/profile/account/security', name: 'ProfileAccountSecurity', component: () => import('@/views/profile/account/Security.vue'), props: true, meta: { hideNavbar: true, requiresAuth: true } },
    { path: '/profile/help', name: 'ProfileHelp', component: () => import('@/views/profile//help/Index.vue'), meta: { requiresAuth: true } },
    { path: '/profile/settings', name: 'ProfileSettings', component: () => import('@/views/profile/settings/Index.vue'), meta: { requiresAuth: true } },
    { path: '/profile/settings/version', name: 'ProfileSettingsVersion', component: () => import('@/views/profile/settings/Version.vue'), props: true, meta: { hideNavbar: true, requiresAuth: true } },
];

// ✅ Crie o router ANTES de aplicar guards
const router = createRouter({
    history: createWebHistory(),
    routes
});

// ✅ Guard global para autenticação
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const modalStore = useModalStore();

    if (userStore.isInitialized && to.meta.requiresAuth && !userStore.user) {
        modalStore.openModal();
        return next(false);
    }

    next();
});

export default router;