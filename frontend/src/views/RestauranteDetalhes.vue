<template>
    <div class="container mx-auto p-4">
        <button @click="$router.back()"
            class="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg">
            Voltar
        </button>
        <div v-if="restaurante" class="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <img :src="restaurante.imageUrl" alt="Imagem do restaurante" class="w-full h-64 object-cover">
            <div class="p-4">
                <h1 class="text-3xl font-bold">{{ restaurante.name }}</h1>
                <p class="text-gray-600">{{ restaurante.vicinity }}</p>
                <p class="mt-2 text-lg" :class="restaurante.opening_hours?.open_now ? 'text-green-600' : 'text-red-500'">
                    {{ restaurante.opening_hours?.open_now ? 'Aberto agora' : 'Fechado' }}
                </p>
                <p class="mt-2 text-yellow-500">
                    <i class="fas fa-star"></i> {{ restaurante.rating }}
                    <span class="text-gray-500">({{ restaurante.user_ratings_total }} avaliações)</span>
                </p>
                <p class="mt-2 text-sm text-gray-500" v-if="restaurante.price_level">
                    Faixa de preço: {{ getPriceLevel(restaurante.price_level) }}
                </p>
            </div>
        </div>
        <div v-else class="text-center">Carregando...</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const restaurante = ref(null);

onMounted(() => {
    restaurante.value = route.query;
});

const getPriceLevel = (level) => {
    const priceLevels = {
        1: 'R$20 - R$40',
        2: 'R$40 - R$70',
        3: 'R$70 - R$150',
        4: 'Acima de R$150'
    };
    return priceLevels[level] || 'Não informado';
};
</script>
