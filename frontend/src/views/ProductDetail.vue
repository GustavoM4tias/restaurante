<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="produto" class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="md:w-1/2">
                <img :src="produto.imagem || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuRcI87rUYz_c0iNc1X9Cr_xFGJwvgM7A30Q&s'" alt="Imagem do Produto"
                    class="w-full h-full object-cover">
            </div>
            <div class="md:w-1/2 p-6">
                <h2 class="text-3xl font-bold mb-4">{{ produto.nome }}</h2>
                <p class="text-gray-700 mb-4">{{ produto.descricao }}</p>
                <p class="text-2xl font-semibold text-blue-500 mb-4">R$ {{ produto.preco }}</p>
                <button
                    class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Comprar</button>
            </div>
        </div>
        <div v-else class="text-center">
            <p>Carregando produto...</p>
        </div>
    </div>

    <!-- Observação: Certifique-se de que o backend tenha um endpoint para retornar os detalhes de um produto (por exemplo, GET /api/produtos/:id). -->

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const produto = ref(null);

onMounted(async () => {
    try {
        const id = route.params.id;
        const response = await axios.get(`http://localhost:5000/api/produtos/${id}`);
        produto.value = response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do produto", error);
    }
});
</script>