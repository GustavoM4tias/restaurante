<template>
  <div class="h-screen w-screen flex relative">
    <iframe :src="mapUrl" class="w-full h-full border-0 absolute z-20" allowfullscreen loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>

    <!-- Passa as coordenadas atuais para o componente -->
    <Estabelecimentos :lat="currentLat" :lon="currentLon" class="z-10" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Estabelecimentos from "../components/Estabelecimentos.vue";
import { useRestaurantesStore } from "../stores/restaurante";

const restaurantesStore = useRestaurantesStore();

// Variáveis reativas para armazenar as coordenadas (padrão inicial)
const currentLat = ref(-22.2136781);
const currentLon = ref(-49.9476783);

// Variáveis para os parâmetros da busca (aqui definidas apenas para uso na busca inicial)
const radius = ref(3000);
const type = ref("restaurant");

// Monta a URL do mapa com base nas coordenadas
const mapUrl = computed(() =>
  `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d49168.20771789404!2d${currentLon.value}!3d${currentLat.value}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr`
);

// Função que obtém a localização do usuário e dispara a busca de restaurantes
const getLocation = () => {
  console.log("Iniciando requisição de localização...");
  if ("geolocation" in navigator) {
    const options = { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Localização obtida com sucesso!", position);
        currentLat.value = position.coords.latitude;
        currentLon.value = position.coords.longitude;
        restaurantesStore.buscarRestaurantes(
          position.coords.latitude,
          position.coords.longitude,
          radius.value,
          type.value
        );
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

onMounted(() => {
  getLocation();
});
</script>
