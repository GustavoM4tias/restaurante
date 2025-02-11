<!-- src/components/auth/LoginModal.vue -->
<template>
  <!-- Modal wrapper -->
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    <!-- Modal content -->
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
      <button class="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700" @click="closeModal">
        &times;
      </button>
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <UIInput id="email" v-model="email" type="email" placeholder="Seu email" label="Email" />
        <UIInput id="senha" v-model="senha" type="password" placeholder="Sua senha" label="Senha" />
        <UIButton type="submit" variant="primary">
          Entrar
        </UIButton>
      </form>
      <p class="mt-4 text-center text-gray-800 dark:text-gray-200">
        Não tem conta?
        <button @click="switchToRegister" class="text-blue-500 hover:underline">
          Cadastre-se
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import UIInput from "../UI/Input.vue";
import UIButton from "../UI/Button.vue";

const email = ref("");
const senha = ref("");
const authStore = useAuthStore();
const emit = defineEmits(["close", "switch-to-register"]);

const handleLogin = async () => {
  try {
    await authStore.login(email.value, senha.value);
    emit("close");
  } catch (error) {
    alert("Erro ao fazer login. Verifique suas credenciais.");
  }
};

const closeModal = () => {
  emit("close");
};

const switchToRegister = () => {
  emit("switch-to-register");
};
</script>
