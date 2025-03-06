<template>
  <!-- Container Principal -->
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
    <!-- Div centralizada com as informações da conta -->
    <div v-if="userInfo" class="w-full max-w-2xl p-6 sm:p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 relative">
      <!-- Ícone de Logout dentro da div centralizada -->
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
            />
            <div
              class="group peer bg-white rounded-full duration-300 w-14 h-7 sm:w-16 sm:h-8 ring-2 ring-red-500 
              after:duration-300 after:bg-red-500 peer-checked:after:bg-stone-300 peer-checked:ring-stone-300 
              after:rounded-full after:absolute after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:top-1 after:left-1 
              after:flex after:justify-center after:items-center peer-checked:after:translate-x-7 sm:peer-checked:after:translate-x-8 
              peer-hover:after:scale-95"
            ></div>
          </label>
        </div>

        <!-- Botão de Atualizar -->
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
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from '../stores/auth';
import UIInput from "../components/UI/Input.vue";
import UIButton from "../components/UI/Button.vue";

const authStore = useAuthStore();
const userInfo = ref(null);
const editedUser = ref({});
const showMessage = ref(false);

// Função para desabilitar a rolagem da página
const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

// Função para reabilitar a rolagem da página
const enableScroll = () => {
  document.body.style.overflow = '';
};

// Desabilita a rolagem ao montar o componente
onMounted(async () => {
  disableScroll(); // Desabilita a rolagem
  await authStore.fetchUserInfo();
  userInfo.value = authStore.user;
  if (userInfo.value) {
    editedUser.value = { ...userInfo.value };
  }
});

// Reabilita a rolagem ao desmontar o componente
onUnmounted(() => {
  enableScroll(); // Reabilita a rolagem
});

const saveChanges = async () => {
  await authStore.updateUserInfo(editedUser.value);
  await authStore.fetchUserInfo();

  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};
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
