<template>
  <nav class="fixed">
    <div class="nav p-4 relative flex justify-between">
      <div @click="toggleMenu()" to="/"
        class="text-4xl font-bold z-20 ms-3 bg-gray-300 dark:bg-gray-700 px-2 py-1.5 rounded-full cursor-pointer">
        <i class="fas fa-burger dark:text-white text-black"></i>
      </div>

      <div class="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 overflow-hidden z-10"
        :style="searchStyle">
        <input type="text" placeholder="Pesquisar..."
          class="w-full py-3.5 px-12 sm:px-16 border shadow bg-gray-300 dark:bg-gray-700 border-none rounded-full focus:outline-none focus:ring-transparent"
          style="text-indent: 1rem;" />
      </div>

      <button @click="toggleSearch"
        class="text-2xl focus:outline-none transform z-20 me-3 rounded-full bg-gray-300 dark:bg-gray-700 px-3.5">
        <i class="fas fa-magnifying-glass dark:text-white text-black"></i>
      </button>
    </div>

    <div :class="{ 'translate-x-0': menuOpen, '-translate-x-full': !menuOpen }"
      class="menu-hover fixed z-20 w-[75vw] md:w-[40vw] top-0 h-[100vh] transform transition-transform duration-300 ease-in-out filter drop-shadow-md">
      <div class="bg-gray-300 dark:bg-gray-700 w-full h-full">
        <div class="flex justify-end p-3">
          <i class="fas fa-xmark cursor-pointer text-5xl" @click="toggleMenu()"></i>
        </div>

        <!-- Dados do menu lateral aqui -->

      </div>

    </div>
    <div v-if="menuOpen" class="fixed z-10 w-[100vw] top-0 h-[100vh]" @click="toggleMenu()"></div>

  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'

// Controle se o campo de pesquisa está aberto ou fechado
const searchOpen = ref(false)
const menuOpen = ref(false);

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Offsets para posicionar o input entre a logo e o botão de pesquisa
const leftOffset = 1.7  // em rem; ajuste conforme a logo
const rightOffset = 1.7 // em rem; ajuste conforme seu layout

// Estilo dinâmico: posiciona o input e anima com translateY(-50%) + scaleX
const searchStyle = computed(() => ({
  top: '50%',
  left: `${leftOffset}rem`,
  right: `${rightOffset}rem`,
  transformOrigin: 'right center',
  transform: `translateY(-50%) scaleX(${searchOpen.value ? 1 : 0})`
}))
</script>

<style scoped>
.menu-hover {
  transform: translateX(-10);
}
</style>