<template>
    <TopReturn>Sobre esta versão</TopReturn>
    <div class="flex flex-col justify-between h-[calc(100vh-3.5rem)] p-2">
        <p class="text-gray-500 text-center">Eatzy 2.2.1</p>
        <p class="text-gray-600 text-center text-lg">Atec &copy; {{ new Date().getFullYear() }}</p>
    </div>
</template>

<script setup>
import TopReturn from '@/components/ui/TopReturnRed.vue';
</script>
