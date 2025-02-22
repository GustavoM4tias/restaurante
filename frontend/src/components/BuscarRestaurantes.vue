<template>
    <div>
        <button @click="getLocation">Pegar Localização</button>
    </div>
</template>

<script>
export default {
    name: 'LocationComponent',
    methods: {
        getLocation() {
            console.log("Iniciando requisição de localização...");

            if ("geolocation" in navigator) {
                const options = {
                    enableHighAccuracy: false, // Desabilita alta precisão para acelerar o processo em desktops
                    timeout: 10000,            // Timeout de 15 segundos
                    maximumAge: 0              // Não utiliza cache de localização
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
        }
    },
    mounted() {
        console.log("Componente carregado (mounted).");
    }
}
</script>

<style scoped>
button {
    padding: 10px;
    border: none;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    border-radius: 4px;
}
</style>