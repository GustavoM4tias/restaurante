<template>
    <div class="container mx-auto p-4">
        <!-- Inputs para definir radius e type -->
        <div class="mb-4">
            <label for="radius" class="block mb-1">Raio (metros):</label>
            <input id="radius" type="number" v-model="radius" class="border rounded p-1 w-full" />
        </div>
        <div class="mb-4">
            <label for="type" class="block mb-1">Tipo:</label>
            <input id="type" type="text" v-model="type" class="border rounded p-1 w-full" />
        </div>

        <!-- Botão para obter localização e buscar restaurantes -->
        <button @click="getLocation"
            class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Pegar Localização e Buscar Restaurantes
        </button>


        <div v-if="restaurantesStore.restaurantes.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div v-for="(restaurante, index) in restaurantesStore.restaurantes" :key="index"
                class="bg-white p-4 rounded-xl shadow-lg">
                <!-- Nome do Restaurante -->
                <h2 class="text-2xl font-bold mb-2 text-gray-800">{{ restaurante.name }}</h2>

                <!-- Status de abertura -->
                <p :class="restaurante.opening_hours?.open_now ? 'text-green-600' : 'text-red-600'">
                    {{ restaurante.opening_hours?.open_now ? 'Aberto agora' : 'Fechado' }}
                </p>

                <!-- Imagem do restaurante -->
                <img v-if="restaurante.photos?.length > 0"
                    :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + restaurante.photos[0].photo_reference + '&key=AIzaSyDBrSD2mGVgWC2UdMRNZABT0N-vsMS-E6E'"
                    alt="Imagem do restaurante" class="w-full h-40 object-cover rounded-md my-3">

                <!-- Endereço -->
                <p class="text-gray-600"><strong>Endereço:</strong> {{ restaurante.vicinity }}</p>

                <!-- Nível de preço -->
                <p class="mt-2" v-if="restaurante.price_level != null">
                    <strong>Faixa de preço:</strong>
                    <span v-html="getPriceLevel(restaurante.price_level)"></span>
                </p>

                <!-- Avaliação -->
                <p class="flex items-center mt-2">
                    <span class="text-yellow-500">⭐ {{ restaurante.rating }}</span>
                    <span class="text-gray-500 ml-2">({{ restaurante.user_ratings_total }} avaliações)</span>
                </p>
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
import { ref } from 'vue';
import { useRestaurantesStore } from '../stores/restaurante';

const restaurantesStore = useRestaurantesStore();

// Propriedades reativas para radius e type
const radius = ref(3000);
const type = ref("restaurant");

// Função para converter o price_level do Google
const getPriceLevel = (level) => {
    const priceLevels = {
        1: '💲 Econômico (R$20 - R$40)',
        2: '💲💲 Moderado (R$40 - R$70)',
        3: '💲💲💲 Caro (R$70 - R$150)',
        4: '💲💲💲💲 Muito Caro (Acima de R$150)'
    };
    return priceLevels[level] || 'null';
};


const getLocation = () => {
    console.log("Iniciando requisição de localização...");

    if ("geolocation" in navigator) {
        const options = {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Localização obtida com sucesso!", position);
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // Chama a ação da store passando lat, lon, radius e type definidos pelo usuário
                restaurantesStore.buscarRestaurantes(lat, lon, radius.value, type.value);
            },
            (error) => {
                console.error("Erro ao obter a localização:", error);
            },
            options
        );
    } else {
        console.error("Geolocalização não é suportada pelo seu navegador.");
    }
};
</script>