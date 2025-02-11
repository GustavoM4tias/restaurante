<!-- src/views/Account.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Minha Conta</h1>
    <div class="bg-white p-6 rounded-lg shadow-md" v-if="userInfo">
      <p><strong>ID:</strong> {{ userInfo.id }}</p>
      <p><strong>Email:</strong> {{ userInfo.email }}</p>
      <p><strong>Nome:</strong> {{ userInfo.nome || 'Não informado' }}</p>
      <p><strong>Perfil:</strong> {{ userInfo.role }}</p>
    </div>
    <div v-else class="text-center">Carregando informações...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userInfo = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/account", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    userInfo.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da conta:", error);
  }
});
</script>
