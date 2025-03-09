<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">  
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
    <div v-if="userInfo" class="w-full max-w-2xl p-6 sm:p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 relative">
      <i
        v-if="authStore.isAuthenticated"
        @click="authStore.logout()"
        class="fas fa-right-from-bracket cursor-pointer absolute top-3 right-3 sm:top-4 sm:right-4 text-xl sm:text-2xl text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
      ></i>

      <h1 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800 dark:text-white">Minha Conta</h1>

      <div class="space-y-4 sm:space-y-6">
        <UIInput
          id="nome"
          v-model="editedUser.nome"
          type="text"
          placeholder="Seu nome"
          label="Nome"
          class="w-full"
        />

        <UIInput
          id="email"
          v-model="editedUser.email"
          type="email"
          placeholder="Seu email"
          label="Email"
          class="w-full"
        />

        <!-- Alternador de Tema -->
        <div class="flex items-center justify-between">
          <p class="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Tema</p>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only peer"
              v-model="editedUser.tema"
              :true-value="1"
              :false-value="0"
              aria-label="Alternar tema"
              @change="toggleTheme"
            />
            <div
              class="w-14 h-7 sm:w-16 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-500"
            >
              <!-- Tema Escuro -->
              <span
                class="absolute left-1 top-1/2 transform -translate-y-1/2 text-yellow-500 transition-opacity duration-500"
                :class="{ 'opacity-0': editedUser.tema === 1, 'opacity-100': editedUser.tema === 0 }"
              >
                <i class="bi bi-sun-fill text-lg sm:text-xl"></i> 
              </span>
              <!-- Tema Claro -->
              <span
                class="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 transition-opacity duration-500"
                :class="{ 'opacity-0': editedUser.tema === 0, 'opacity-100': editedUser.tema === 1 }"
              >
                <i class="bi bi-moon-fill text-lg sm:text-xl"></i> 
              </span>
            </div>
          </label>
        </div>

        <UIButton
          class="w-full mt-4 sm:mt-6 py-2 sm:py-3 text-base sm:text-lg font-semibold"
          type="submit"
          variant="success"
          @click="saveChanges"
        >
          Atualizar
        </UIButton>
      </div>

      <!-- Mensagem de Alterações Salvas -->
      <div
        v-show="showMessage"
        class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50"
      >
        Alterações salvas com sucesso!
      </div>
    </div>

    <!-- Mensagem de Carregamento -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-gray-600 dark:border-gray-400 mb-3 sm:mb-4"></div>
        <p class="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400">
          Carregando informações...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useAuthStore } from '../stores/auth';
import UIInput from "../components/UI/Input.vue";
import UIButton from "../components/UI/Button.vue";

const authStore = useAuthStore();
const userInfo = ref(null);
const editedUser = ref({
  tema: localStorage.getItem('theme') === 'dark' ? 0 : 1, 
});
const showMessage = ref(false);

// Função para alternar o tema
const toggleTheme = () => {
  if (editedUser.value.tema === 1) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

watch(() => editedUser.value.tema, toggleTheme);

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = '';
};

// Função para salvar as alterações
const saveChanges = async () => {
  await authStore.updateUserInfo(editedUser.value);
  await authStore.fetchUserInfo();

  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};

onMounted(async () => {
  disableScroll(); 
  await authStore.fetchUserInfo();
  userInfo.value = authStore.user;
  if (userInfo.value) {
    editedUser.value = { ...userInfo.value };
  }

  // Aplicar tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

onUnmounted(() => {
  enableScroll(); 
});
</script>

<style>
/* Animação para a mensagem */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
