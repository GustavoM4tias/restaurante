<template>
  <nav class="fixed top-0 left-0 w-full bg-gray-300 dark:bg-gray-700">
    <!-- Container principal com flexbox para alinhar os elementos (ícones e input) -->
    <div class="nav p-2 flex justify-between items-center">
      <!-- Ícone do hambúrguer na esquerda, que mantém a funcionalidade de abrir/fechar o menu lateral -->
      <div @click="toggleMenu()" to="/" class="text-2xl font-bold z-20 ms-2 cursor-pointer">
        <i class="fas fa-burger dark:text-white text-black"></i>
      </div>

      <div class="flex items-center space-x-3 ms-2">
        <!-- Logo -->
        <img src="\eatzy.png" alt="Logo" class="h-10 w-auto" />
      </div>


      <!-- Container central que ocupa o espaço disponível para centralizar o input -->
      <div class="flex-100 flex justify-center">
        <!-- Container do input com transição de largura para abrir/fechar a pesquisa -->
        <div class="transition-all duration-300 overflow-hidden" :style="searchStyle">
          <input type="text" placeholder="Pesquisar..."
            class="py-2.5 px-10 sm:px-12 border shadow bg-gray-300 dark:bg-gray-0 border-none rounded-full focus:outline-none focus:ring-transparent"
            style="text-indent: 0.8rem;" />
        </div>
      </div>

      <!-- Ícone de pesquisa à direita que ativa o toggle da barra de pesquisa -->
      <div class="me-2">
        <button v-if="isHomePage" @click="toggleSearch"
          class="text-xl focus:outline-none z-20 rounded-full bg-gray-300 dark:bg-gray-700 px-2.5">
          <i class="fas fa-search dark:text-white text-black"></i>
        </button>
      </div>
    </div>

    <!-- Menu lateral com transição, mantendo a funcionalidade de exibir/ocultar -->
    <div :class="{ 'translate-x-0': menuOpen, '-translate-x-full': !menuOpen }"
      class="menu-hover fixed z-20 w-[60vw] md:w-[30vw] top-0 h-[100vh] transform transition-transform duration-300 ease-in-out filter drop-shadow-md">
      <div class="bg-gray-300 dark:bg-gray-700 w-full h-full">
        <!-- Botão para fechar o menu lateral -->
        <div class="flex justify-end p-2">
          <i class="fas fa-xmark cursor-pointer text-3xl" @click="toggleMenu()"></i>
        </div>
        <!-- Links do menu lateral -->
        <div class="flex flex-col text-lg text-gray-700 dark:text-gray-300 p-3 space-y-3">
          <RouterLink to="/" class="flex items-center group hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg">
            <i class="fas fa-home w-6 text-center"></i>
            <span class="ml-2">Início</span>
          </RouterLink>
          <RouterLink to="/mapa"
            class="flex items-center group hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg">
            <i class="fas fa-map w-6 text-center"></i>
            <span class="ml-2">Mapa</span>
          </RouterLink>
          <RouterLink to="/historico"
            class="flex items-center group hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg">
            <i class="fas fa-history w-6 text-center"></i>
            <span class="ml-2">Histórico</span>
          </RouterLink>
          <RouterLink to="/conta"
            class="flex items-center group hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg">
            <i class="fas fa-user w-6 text-center"></i>
            <span class="ml-2">Conta</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Overlay que fecha o menu lateral ao clicar fora -->
    <div v-if="menuOpen" class="fixed z-10 w-[100vw] top-0 h-[100vh]" @click="toggleMenu()"></div>
  </nav>
</template>

<script setup>
// Importa as funções reativas do Vue e o hook para obter a rota atual
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// Obtém a rota atual para verificar se é a Home
const route = useRoute();

// Variáveis reativas para controlar a visibilidade do menu lateral e da barra de pesquisa
const menuOpen = ref(false);
const searchOpen = ref(false);

// Computed que verifica se a página atual é a Home (rota '/')
const isHomePage = computed(() => route.path === '/');

// Função para alternar o menu lateral
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Função para alternar a barra de pesquisa
const toggleSearch = () => {
  searchOpen.value = !searchOpen.value;
};

// Computed que define o estilo dinâmico do container do input
// Controla a largura (0 quando fechado e 100% quando aberto) com transição suave
const searchStyle = computed(() => ({
  width: searchOpen.value ? '100%' : '0',
  transition: 'width 0.3s ease-in-out'
}));
</script>

<style scoped>
/* Classe para posicionar o menu lateral com ajuste personalizado */
.menu-hover {
  transform: translateX(-50);
}
</style>
