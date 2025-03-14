<template>
  <div class="min-h-screen flex flex-col">
    <!-- Conteúdo principal -->
    <div class="flex-grow relative">
      <!-- Mapa -->
      <iframe :src="mapUrl" class="w-full h-[0vh] border-0 z-0" allowfullscreen loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>

      <!-- Carrossel de filtros (responsivo com rolagem horizontal no mobile) -->
      <div class="absolute top-[25vh] left-5 right-5 mx-4 z-20 overflow-x-auto whitespace-nowrap">
        <div class="flex space-x-5 p-4">
          <!-- Filtro: Tipo de Estabelecimento -->
          <div class="relative flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-48">
            <i class="fas fa-store text-gray-700 dark:text-gray-300 text-xl"></i>
            <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Tipo de Estabelecimento</span>
            <i class="fas fa-plus text-gray-700 dark:text-gray-300 mt-2 cursor-pointer" @click="toggleDropdown('tipoEstabelecimento')"></i>
            <!-- Dropdown -->
            <div v-if="dropdownAtivo === 'tipoEstabelecimento'" class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-30">
              <div class="p-2">
                <div v-for="(tipo, index) in tiposEstabelecimento" :key="index" class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  @click="toggleSubfiltro('tipoEstabelecimento', tipo)">
                  <span>{{ tipo }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Filtro: Raio de Localização -->
          <div class="relative flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-48">
            <i class="fas fa-map-marker-alt text-gray-700 dark:text-gray-300 text-xl"></i>
            <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Raio de Localização</span>
            <i class="fas fa-plus text-gray-700 dark:text-gray-300 mt-2 cursor-pointer" @click="toggleDropdown('raioLocalizacao')"></i>
            <!-- Dropdown -->
            <div v-if="dropdownAtivo === 'raioLocalizacao'" class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-30">
              <div class="p-2">
                <div v-for="(raio, index) in raiosLocalizacao" :key="index" class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  @click="toggleSubfiltro('raioLocalizacao', raio)">
                  <span>{{ raio }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Filtro: Tipo de Comida -->
          <div class="relative flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-48">
            <i class="fas fa-utensils text-gray-700 dark:text-gray-300 text-xl"></i>
            <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Tipo de Comida</span>
            <i class="fas fa-plus text-gray-700 dark:text-gray-300 mt-2 cursor-pointer" @click="toggleDropdown('tipoComida')"></i>
            <!-- Dropdown -->
            <div v-if="dropdownAtivo === 'tipoComida'" class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-30">
              <div class="p-2">
                <div v-for="(comida, index) in tiposComida" :key="index" class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  @click="toggleSubfiltro('tipoComida', comida)">
                  <span>{{ comida }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Filtro: Horário de Funcionamento -->
          <div class="relative flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-48">
            <i class="fas fa-clock text-gray-700 dark:text-gray-300 text-xl"></i>
            <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Horário de Funcionamento</span>
            <i class="fas fa-plus text-gray-700 dark:text-gray-300 mt-2 cursor-pointer" @click="toggleDropdown('horarioFuncionamento')"></i>
            <!-- Dropdown -->
            <div v-if="dropdownAtivo === 'horarioFuncionamento'" class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-30">
              <div class="p-2">
                <div v-for="(horario, index) in horariosFuncionamento" :key="index" class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  @click="toggleSubfiltro('horarioFuncionamento', horario)">
                  <span>{{ horario }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Filtro: Faixa de Preço -->
          <div class="relative flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-48">
            <i class="fas fa-dollar-sign text-gray-700 dark:text-gray-300 text-xl"></i>
            <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Faixa de Preço</span>
            <i class="fas fa-plus text-gray-700 dark:text-gray-300 mt-2 cursor-pointer" @click="toggleDropdown('faixaPreco')"></i>
            <!-- Dropdown -->
            <div v-if="dropdownAtivo === 'faixaPreco'" class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-30">
              <div class="p-2">
                <div v-for="(preco, index) in faixasPreco" :key="index" class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  @click="toggleSubfiltro('faixaPreco', preco)">
                  <span>{{ preco }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Filtro: Avaliação dos Usuários -->
          <div class="relative flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-48">
            <i class="fas fa-star text-gray-700 dark:text-gray-300 text-xl"></i>
            <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Avaliação dos Usuários</span>
            <i class="fas fa-plus text-gray-700 dark:text-gray-300 mt-2 cursor-pointer" @click="toggleDropdown('avaliacaoUsuarios')"></i>
            <!-- Dropdown -->
            <div v-if="dropdownAtivo === 'avaliacaoUsuarios'" class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-30">
              <div class="p-2">
                <div v-for="(avaliacao, index) in avaliacoesUsuarios" :key="index" class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  @click="toggleSubfiltro('avaliacaoUsuarios', avaliacao)">
                  <span>{{ avaliacao }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Container para exibir filtros selecionados (só aparece quando há filtros selecionados) -->
      <div v-if="filtrosSelecionadosFormatados.length > 0" class="absolute top-[55vh] left-0 right-0 mx-4 z-20 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <p class="font-bold mb-2">Filtros Selecionados:</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="(filtro, index) in filtrosSelecionadosFormatados" :key="index"
            class="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
            {{ filtro }}
            <i class="fas fa-times ml-2 cursor-pointer" @click="removerSubfiltro(filtro)"></i>
          </span>
        </div>
      </div>

      <!-- Listagem de restaurantes -->
      <div class="container mx-auto p-4 mt-[60vh]">
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
            @click="$router.push({ path: '/restaurante-detalhes', query: restaurante })"
            class="flex flex-col rounded-3xl shadow-sm my-3 overflow-hidden relative cursor-pointer hover:shadow-lg transition-all">
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
    </div>

    <!-- Footer no final da página -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRestaurantesStore } from "../stores/restaurante";
import { useRoute } from 'vue-router';
import Footer from '../components/Footer.vue';

const route = useRoute();
const restaurantesStore = useRestaurantesStore();

// Verifica se a página atual é a Home
const isHomePage = computed(() => route.path === '/');

// Variáveis reativas para armazenar as coordenadas (padrão inicial)
const currentLat = ref(-22.2136781);
const currentLon = ref(-49.9476783);

// Variáveis para os parâmetros da busca (aqui definidas apenas para uso na busca inicial)
const radius = ref(1000);
const type = ref("restaurant");

// Dropdown ativo
const dropdownAtivo = ref(null);

// Subfiltros selecionados
const subfiltrosSelecionados = ref({
  tipoEstabelecimento: [],
  raioLocalizacao: [],
  tipoComida: [],
  horarioFuncionamento: [],
  faixaPreco: [],
  avaliacaoUsuarios: [],
});

// Dados dos subfiltros
const tiposEstabelecimento = [
  "Restaurante", "Food Truck", "Barraca de Rua", "Lanchonete", "Cafeteria", "Bar/Pub", "Self-Service", "Temakeria", "Churrascaria", "Sorveteria/Açaíteria", "Doceria/Confeitaria"
];
const raiosLocalizacao = ["1 km", "3 km", "5 km", "10 km"];
const tiposComida = ["Fast Food", "Churrascaria", "Saudável", "Comidas Regionais", "Doces e Sobremesas"];
const horariosFuncionamento = ["Aberto agora", "24 horas", "Horário específico"];
const faixasPreco = ["Econômico ($)", "Médio ($$)", "Alto ($$$)"];
const avaliacoesUsuarios = ["4 estrelas ou mais", "3 estrelas ou mais", "2 estrelas ou mais"];

// Função para alternar dropdown
const toggleDropdown = (filtro) => {
  dropdownAtivo.value = dropdownAtivo.value === filtro ? null : filtro;
};

// Função para adicionar/remover subfiltros
const toggleSubfiltro = (categoria, valor) => {
  if (subfiltrosSelecionados.value[categoria].includes(valor)) {
    subfiltrosSelecionados.value[categoria] = subfiltrosSelecionados.value[categoria].filter(item => item !== valor);
  } else {
    subfiltrosSelecionados.value[categoria].push(valor);
  }
};

// Função para remover subfiltro
const removerSubfiltro = (filtro) => {
  for (const categoria in subfiltrosSelecionados.value) {
    subfiltrosSelecionados.value[categoria] = subfiltrosSelecionados.value[categoria].filter(item => item !== filtro);
  }
};

// Filtros selecionados formatados para exibição
const filtrosSelecionadosFormatados = computed(() => {
  const filtros = [];
  for (const categoria in subfiltrosSelecionados.value) {
    filtros.push(...subfiltrosSelecionados.value[categoria]);
  }
  return filtros;
});

// Função para obter a localização do usuário e disparar a busca de restaurantes
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

// Função que usa as coordenadas recebidas e os inputs para buscar restaurantes
const searchRestaurants = () => {
  restaurantesStore.buscarRestaurantes(currentLat.value, currentLon.value, radius.value, type.value);
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

// Dispara a busca de restaurantes ao carregar a página
onMounted(() => {
  getLocation();
});
</script>

<style scoped>
/* Estilos personalizados para o carrossel de filtros */
.carrossel-filtros {
  scrollbar-width: thin; 
  scrollbar-color: #cbd5e0 #f3f4f6; /* Cor da barra de rolagem */
}

.carrossel-filtros::-webkit-scrollbar {
  height: 8px; 
}

.carrossel-filtros::-webkit-scrollbar-track {
  background: #f3f4f6; /* Cor de fundo da barra de rolagem */
  border-radius: 4px;
}

.carrossel-filtros::-webkit-scrollbar-thumb {
  background: #cbd5e0; /* Cor do "puxador" da barra de rolagem */
  border-radius: 4px;
}

.carrossel-filtros::-webkit-scrollbar-thumb:hover {
  background: #a0aec0; /* Cor do "puxador" ao passar o mouse */
}
</style>