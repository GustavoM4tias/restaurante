<!-- src/components/UI/ThemeButton.vue -->
<template>
    <button @click="toggleDarkMode" class="p-2 rounded-full focus:outline-none transition-colors duration-200">
        <!-- Ícone de sol se estiver no modo escuro -->
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" viewBox="0 0 20 20"
            fill="currentColor">
            <path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
            <path fill-rule="evenodd"
                d="M10 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0L6.64 5.22a1 1 0 11-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM13.36 13.36a1 1 0 011.42 0l1 1a1 1 0 01-1.42 1.42l-1-1a1 1 0 010-1.42zM1 10a1 1 0 011-1h1a1 1 0 110 2H2a1 1 0 01-1-1zM16 9a1 1 0 011 1h1a1 1 0 110 2h-1a1 1 0 01-1-1 1 1 0 011-1zM4.22 15.78a1 1 0 010-1.42l1-1a1 1 0 111.42 1.42l-1 1a1 1 0 01-1.42 0zM13.36 6.64a1 1 0 010 1.42l-1 1a1 1 0 11-1.42-1.42l1-1a1 1 0 011.42 0z"
                clip-rule="evenodd" />
        </svg>
        <!-- Ícone de lua se estiver no modo claro -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800 dark:text-gray-200"
            viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 116.707 2.707a8.001 8.001 0 0010.586 10.586z" />
        </svg>
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

// Exemplo simples de toggle dark mode:
const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
};


onMounted(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

});
</script>