<!-- src/view/Home.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-4">
    <!-- <p>{{ user.user?.default_mode }}</p>
    <p>{{ user.user?.default_radius }}</p> -->

    <!-- SearchBar normal -->
    <SearchBar v-model:mode="restaurant.params.mode" v-model:radius="restaurant.params.radius"
      @save="saveSearchPreferences" />

    <!-- Nome do usuário -->
    <div class="bg-gray-50 pt-6 pb-2 px-4">
      <p v-if="user?.user" class="text-center font-medium text-lg px-14 truncate">Olá, {{ user.user?.name }}!</p>
      <p v-else class="text-center font-medium text-lg px-14 truncate">Bem vindo ao Eatzy!</p>
    </div>

    <!-- <div class="p-4">
      <div class="relative h-60 rounded-xl overflow-hidden bg-black">
        <img src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/f55c87d06a345e9c94021f3e/3007283.jpg"
          class="w-full h-full object-cover transition-opacity duration-700" alt="Carousel Image" />
      </div>

    </div> -->

    <!-- KeywordList sticky -->
    <div class="bg-gray-50 px-4 py-8">
      <KeywordBanner :keywordsBanner="keywordsBanner" @select-keyword="buscarPorKeyword" />
    </div>

    <!-- KeywordList sticky -->
    <KeywordList ref="keywordListRef" :keywords="keywords" @select-keyword="buscarPorKeyword" />

    <!-- Lista de restaurantes -->
    <RestaurantList :places="placesToDisplay" />

    <!-- Componente de status -->
    <StatusMessage :loading="restaurant.loading" :all-pages-loaded="restaurant.allPagesLoaded"
      :open-places-count="restaurant.openPlaces.length" :closed-places-count="restaurant.closedPlaces.length" />

    <div ref="sentinela" class="h-[80vh] -mt-[80vh]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { useRestaurantsStore } from '../stores/restaurants';
import { useLocationStore } from '@/stores/location'
import { useUserStore } from '@/stores/user'
import SearchBar from '@/components/home/SearchBar.vue';
import KeywordList from '@/components/home/keywordList.vue';
import KeywordBanner from '@/components/home/KeywordBanner.vue';
import RestaurantList from '@/components/home/RestaurantList.vue';
import StatusMessage from '@/components/home/StatusMessage.vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

const loc = useLocationStore()
const restaurant = useRestaurantsStore();
const user = useUserStore();
const sentinela = ref(null);
let observer;

const keywordsBanner = [
  { label: 'Lanches', value: 'Hamburguer', padding: 'p-4', image: new URL('@/assets/keywords/burguer.png', import.meta.url).href },
  { label: 'Mercado', value: 'Market', padding: '', image: new URL('@/assets/keywords/mercado.png', import.meta.url).href },
  { label: 'Sushi', value: 'Sushi', padding: 'ps-1 py-2.5', image: new URL('@/assets/keywords/sushi.png', import.meta.url).href },
  { label: 'Pizza', value: 'Pizza', padding: ' p-1', image: new URL('@/assets/keywords/pizza.png', import.meta.url).href },
  { label: 'Sorvete', value: 'Ice-cream', padding: 'py-2', image: new URL('@/assets/keywords/sorvete.png', import.meta.url).href },
]
const keywords = [
  { label: 'Padaria', value: 'Bakery', padding: 'p-3', color: 'bg-amber-500/60', image: new URL('@/assets/keywords/padaria.png', import.meta.url).href },
  { label: 'Japonesa', value: 'Japanese', padding: '', color: 'bg-purple-500/60', image: new URL('@/assets/keywords/lamen.png', import.meta.url).href },
  { label: 'Churrasco', value: 'Barbecue', padding: '', color: 'bg-orange-500/60', image: new URL('@/assets/keywords/churrasco.png', import.meta.url).href },
  { label: 'Italiana', value: 'Italian', padding: '', color: 'bg-yellow-400/60', image: new URL('@/assets/keywords/macarrao.png', import.meta.url).href },
  { label: 'Mexicana', value: 'Mexican', padding: 'py-1', color: 'bg-orange-600/80', image: new URL('@/assets/keywords/taco.png', import.meta.url).href },
  { label: 'Árabe', value: 'Arabian', padding: '', color: 'bg-rose-500/60', image: new URL('@/assets/keywords/esfiha.png', import.meta.url).href },
  { label: 'Almoço', value: 'Lunch', padding: '', color: 'bg-red-600/80', image: new URL('@/assets/keywords/almoco.png', import.meta.url).href },
  { label: 'Jantar', value: 'Dinner', padding: '', color: 'bg-indigo-500/60', image: new URL('@/assets/keywords/jantar.png', import.meta.url).href },
  { label: 'Vegetariana', value: 'Vegetarian', padding: '', color: 'bg-teal-500/60', image: new URL('@/assets/keywords/salad.png', import.meta.url).href },
  { label: 'Vegana', value: 'Vegan', padding: 'p-3', color: 'bg-lime-500/60', image: new URL('@/assets/keywords/vegano.png', import.meta.url).href },
  { label: 'Chinesa', value: 'Chinese', padding: 'p-2', color: 'bg-red-500/60', image: new URL('@/assets/keywords/chinese.png', import.meta.url).href },
];

function buscarPorKeyword(keywordObj) {
  restaurant.params.keyword = keywordObj.value;
  restaurant.openPlaces = [];
  restaurant.closedPlaces = [];
  restaurant.nextPageToken = null;
  restaurant.allPagesLoaded = false;
  search(true);
}

// 2) Watcher para quando a store de usuário “chegar”  
watch(
  () => user.user,
  (user) => {
    if (!user) return;
    initParamsFromUser();
    // se já tem coords, dispara a busca (feito só uma vez)
    if (loc.lat && loc.lon) {
      search(true);
    }
  }
);

// só dispara busca quando já tiver coords
watch(
  () => [loc.lat, loc.lon],
  ([lat, lon]) => {
    if (lat && lon) {
      restaurant.params.lat = lat
      restaurant.params.lon = lon
      const locationData = {
        default_lat: lat,
        default_lon: lon,
      }
      if (user.user) {
        try {
          user.updateUser(locationData)
        } catch {
          console.error('Erro ao atualizar lat e lon do usuario')
        };
      }
      // search(true);
    }
  },
  { immediate: true }
)

watch(() => restaurant.params.keyword, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    restaurant.openPlaces = [];
    restaurant.closedPlaces = [];
    restaurant.nextPageToken = null;
    restaurant.allPagesLoaded = false;
  }
});

// Usar o getter do restaurant para determinar quais lugares mostrar
const placesToDisplay = computed(() => restaurant.placesToDisplay);

function search(initial) {
  restaurant.fetch(initial);
}



let intervalId = null;

function isSentinelaVisible() {
  if (!sentinela.value) return false;
  const rect = sentinela.value.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

function startSentinelaInterval() {
  stopSentinelaInterval(); // limpa se já estiver rodando
  intervalId = setInterval(() => {
    if (
      isSentinelaVisible() &&
      restaurant.nextPageToken &&
      !restaurant.loading
    ) {
      search(false); // busca mais
    }
  }, 2000);
}

function stopSentinelaInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function setupObserver() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && restaurant.nextPageToken && !restaurant.loading) {
        search(false);
      }
    },
    { threshold: 0.1 }
  );
  if (sentinela.value) observer.observe(sentinela.value);
}

onMounted(() => {
  setupObserver();
  startSentinelaInterval();
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  stopSentinelaInterval();
});


// ação para salvar preferências de busca
async function saveSearchPreferences({ mode, radius }) {
  try {
    // Preparar dados para atualização
    const preferencesData = {
      default_mode: mode,
      default_radius: radius
    };

    // Chamar a API para atualizar o usuário
    await user.updateUser(preferencesData);

    // Emitir evento de sucesso
    toast.success('Preferências salvas com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar preferências:', err);
    toast.error('Falha ao salvar preferências.');
  }
}

// 1) Função que copia defaults do userStore para restaurantStore
function initParamsFromUser() {
  if (!user.user) return;
  if (user.user.default_radius != null) {
    restaurant.params.radius = user.user.default_radius;
  }
  if (user.user.default_type) {
    restaurant.params.type = user.user.default_type;
  }
  if (user.user.default_mode) {
    restaurant.params.mode = user.user.default_mode;
  }
}

</script>