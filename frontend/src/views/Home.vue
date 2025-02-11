<!-- src/views/Home.vue -->
<template>
  <div>
    <!-- Seção Hero -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Bem-vindo ao Nosso E-commerce</h1>
        <p class="mb-8">Encontre os melhores produtos com os melhores preços.</p>
      </div>
    </div>

    <!-- Grid de Produtos -->
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-4">Produtos em Destaque</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductCard
          v-for="produto in produtos"
          :key="produto.id"
          :produto="produto"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import axios from "axios";

const produtos = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/produtos");
    produtos.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos", error);
  }
});
</script>
