<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <button @click="getLocation"
            class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Pegar Localização
        </button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

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
                console.log("Localização obtida com sucesso!");
                console.log("Latitude:", position.coords.latitude, "- Tipo:", typeof position.coords.latitude);
                console.log("Longitude:", position.coords.longitude, "- Tipo:", typeof position.coords.longitude);
                console.log("Altitude:", position.coords.altitude, "- Tipo:", typeof position.coords.altitude);
                console.log("Precisão:", position.coords.accuracy, "- Tipo:", typeof position.coords.accuracy);
                console.log("Precisão da altitude:", position.coords.altitudeAccuracy, "- Tipo:", typeof position.coords.altitudeAccuracy);
                console.log("Rumo (heading):", position.coords.heading, "- Tipo:", typeof position.coords.heading);
                console.log("Velocidade:", position.coords.speed, "- Tipo:", typeof position.coords.speed);
                console.log("Timestamp:", position.timestamp, "- Tipo:", typeof position.timestamp);
            },
            (error) => {
                console.error("Erro ao obter a localização:");
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("Usuário negou a solicitação de geolocalização.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Informação de localização não está disponível.");
                        break;
                    case error.TIMEOUT:
                        console.error("A requisição para obter a localização expirou.");
                        break;
                    default:
                        console.error("Erro desconhecido.");
                        break;
                }
            },
            options
        );
    } else {
        console.error("Geolocalização não é suportada pelo seu navegador.");
    }
};

onMounted(() => {
    console.log("Componente carregado (mounted).");
});
</script>
