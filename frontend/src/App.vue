<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from './stores/auth'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/auth/Login.vue'
import RegisterModal from './components/auth/Register.vue'
import { eventBus } from "./eventBus"  // Se você já utiliza o eventBus para outras funcionalidades

const authStore = useAuthStore();

// Exemplo de controle de tema (opcional)
const aplicarTema = () => {
  if (authStore.tema === 1) {
    document.documentElement.classList.add('dark');
  } else if (authStore.tema === 0) {
    document.documentElement.classList.remove('dark');
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

onMounted(async () => {
  await authStore.fetchUserInfo();
  aplicarTema();
});

watch(() => authStore.tema, () => {
  aplicarTema();
});

// Controle dos modais de autenticação
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const switchAuthModals = (type) => {
  if (type === 'login') {
    showLoginModal.value = true;
    showRegisterModal.value = false;
  } else if (type === 'register') {
    showLoginModal.value = false;
    showRegisterModal.value = true;
  }
}

const closeAuthModals = () => {
  showLoginModal.value = false;
  showRegisterModal.value = false;
}

// Se você quiser também abrir o modal via eventBus (opcional)
onMounted(() => {
  eventBus.on("open-login", () => {
    switchAuthModals('login');
  });
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <NavBar class="fixed top-0 w-full" />

    <router-view class="mb-[10vh] min-h[84vh] h-full flex-1" />

    <Footer class="fixed bottom-0 w-full h-[8vh]" />

    <!-- Auth Modals -->
    <LoginModal v-if="showLoginModal" @close="closeAuthModals" @switch-to-register="switchAuthModals('register')" />

    <RegisterModal v-if="showRegisterModal" @close="closeAuthModals" @switch-to-login="switchAuthModals('login')" />
  </div>
</template>
