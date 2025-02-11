<!-- src/components/ProductCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
    <router-link :to="`/product/${produto.id}`">
      <div class="h-48 w-full bg-gray-200">
        <img :src="produto.imagem || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuRcI87rUYz_c0iNc1X9Cr_xFGJwvgM7A30Q&s'" alt="Imagem do produto"
          class="w-full h-full object-cover rounded-t-lg">
      </div>
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">{{ produto.nome }}</h3>
        <p class="text-gray-600 mb-2 truncate">{{ produto.descricao }}</p>
        <p class="text-blue-500 font-semibold text-lg">R$ {{ produto.preco }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  produto: {
    type: Object,
    required: true
  }
});
</script>
