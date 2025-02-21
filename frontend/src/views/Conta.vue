<template>
  <div class="p-6">
    <div class="p-6 mt-10 rounded-lg shadow-xl relative bg-gray-200 dark:bg-gray-800" v-if="userInfo">
      <h1 class="text-3xl font-bold mb-4">Minha Conta</h1>
      <UIInput id="nome" v-model="editedUser.nome" type="text" placeholder="Seu nome" label="Nome" />
      <UIInput id="email" v-model="editedUser.email" type="email" placeholder="Seu email" label="Email" />

      <!-- <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" v-model="editedUser.tema" :true-value="1" :false-value="0" />
          <div class="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 
    after:duration-300 after:bg-red-500 peer-checked:after:bg-stone-300 peer-checked:ring-stone-300 
    after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 
    after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 
    peer-hover:after:scale-95">
          </div>
        </label> -->

      <!-- <div class="mb-2">
          <label class="block font-semibold">Tema:</label>
          <select v-model="editedUser.tema" class="border p-2 w-full rounded">
            <option value="0">Claro</option>
            <option value="1">Escuro</option>
          </select>
        </div> -->

      <UISelect id="tema" v-model="editedUser.tema" label="Tema" :options="opcoesTema" />

      <UIButton class="mt-6" type="submit" variant="success" @click="saveChanges">
        Atualizar
      </UIButton>

      <i v-if="authStore.isAuthenticated" @click="authStore.logout()" class="fas fa-right-from-bracket cursor-pointer absolute top-0 right-0 pt-2 p-4 text-3xl nav-link mt-4"></i>
    </div>
    <div v-else class="text-center">Carregando informações...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '../stores/auth'
import UIInput from "../components/UI/Input.vue";
import UIButton from "../components/UI/Button.vue";
import UISelect from "../components/UI/Select.vue";

const authStore = useAuthStore();
const userInfo = ref(null);
const editedUser = ref({});

const opcoesTema = [
  { value: '0', text: 'Claro' },
  { value: '1', text: 'Escuro' },
];

onMounted(async () => {
  await authStore.fetchUserInfo();
  userInfo.value = authStore.user;
  if (userInfo.value) {
    editedUser.value = { ...userInfo.value }; // Copia os dados para edição
  }
});

const saveChanges = async () => {
  await authStore.updateUserInfo(editedUser.value);
  await authStore.fetchUserInfo();
};
</script>
