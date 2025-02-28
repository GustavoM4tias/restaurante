<template>
    <div class="container mx-auto p-4">
        <!-- Inputs para definir raio e tipo -->
        <div class="mb-4">
            <label for="radius" class="block mb-1">Raio (metros):</label>
            <input id="radius" type="number" v-model="radius" class="border rounded p-1 w-full" />
        </div>
        <div class="mb-4">
            <label for="type" class="block mb-1">Tipo:</label>
            <input id="type" type="text" v-model="type" class="border rounded p-1 w-full" />
        </div>

        <!-- Botão para disparar a busca utilizando as coordenadas recebidas -->
        <button @click="searchRestaurants"
            class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Pegar Localização e Buscar Restaurantes
        </button>

        <!-- Lista de restaurantes -->
        <div v-if="restaurantesStore.restaurantes.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 filter drop-shadow-2xl mt-4">
            <div v-for="(restaurante, index) in restaurantesStore.restaurantes" :key="index"
                class="flex flex-col rounded-3xl shadow-sm my-3 overflow-hidden relative">
                <!-- Imagem do restaurante -->
                <img :src="restaurante.imageUrl" alt="Imagem do restaurante"
                    class="w-full h-48 object-cover rounded-t-3xl">
                <!-- Nível de preço -->
                <p class="bg-gray-300 dark:bg-gray-700 text-sm absolute m-3 py-1 px-2.5 rounded-2xl shadow-md"
                    v-if="restaurante.price_level != null">
                    <span v-html="getPriceLevel(restaurante.price_level)"></span>
                </p>
                <div
                    class="infos-card bg-gray-300 dark:bg-gray-700 drop-shadow-[0_-30px_25px_rgba(0,0,0,0.25)] flex-1 rounded-xl -mt-5 py-3 px-4">
                    <!-- Nome do Restaurante -->
                    <h2 class="text-2xl font-bold truncate">{{ restaurante.name }}</h2>
                    <!-- Status de abertura -->
                    <p class="font-bold"
                        :class="restaurante.opening_hours?.open_now ? 'text-green-600' : 'text-red-500'">
                        {{ restaurante.opening_hours?.open_now ? 'Aberto agora' : 'Fechado' }}
                    </p>
                    <!-- Endereço -->
                    <p class="opacity-80"><strong>Endereço:</strong> {{ restaurante.vicinity }}</p>
                    <!-- Avaliação -->
                    <p class="flex items-center">
                        <span class="text-yellow-500">
                            <i class="fas fa-star"></i> {{ restaurante.rating }}
                        </span>
                        <span class="ml-2">({{ restaurante.user_ratings_total }} avaliações)</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Mensagens de carregamento ou erro -->
        <div v-if="restaurantesStore.carregando" class="mt-4 text-center">
            Carregando...
        </div>
        <div v-if="restaurantesStore.erro" class="mt-4 text-center text-red-500">
            Ocorreu um erro ao buscar restaurantes.
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRestaurantesStore } from "../stores/restaurante";

// Recebe as coordenadas passadas pelo componente pai
const props = defineProps({
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    }
});

const restaurantesStore = useRestaurantesStore();
const radius = ref(3000);
const type = ref("restaurant");

// Função que usa as coordenadas recebidas e os inputs para buscar restaurantes
const searchRestaurants = () => {
    restaurantesStore.buscarRestaurantes(props.lat, props.lon, radius.value, type.value);
};

const getPriceLevel = (level) => {
    const priceLevels = {
        1: ' R$20 - R$40',
        2: ' R$40 - R$70',
        3: ' R$70 - R$150',
        4: ' Acima de R$150'
    };
    return priceLevels[level] || 'Não informado';
};
</script>