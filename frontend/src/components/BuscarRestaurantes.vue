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

        <!-- Exibe os restaurantes em cards simples -->
        <div v-if="restaurantesStore.restaurantes.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div v-for="(restaurante, index) in restaurantesStore.restaurantes" :key="index"
                class="bg-white p-4 rounded shadow">
                <h2 class="text-xl font-bold mb-2">{{ restaurante.name }}</h2>
                <p v-if="restaurante.vicinity">{{ restaurante.vicinity }}</p>
                <!-- Adicione mais informações conforme necessário -->
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
import { useRestaurantesStore } from '@/stores/restaurantes';

const restaurantesStore = useRestaurantesStore();

// Propriedades reativas para radius e type
const radius = ref(3000);
const type = ref("restaurant");

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