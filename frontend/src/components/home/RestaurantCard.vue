<!-- src/components/RestaurantCard.vue -->
<template>
    <RouterLink :to="{ name: 'RestauranteDetalhes', params: { id: place.place_id } }"
        class="group rounded-lg overflow-hidden shadow h-full relative">
        <div class="gradient bg-gradient-to-b to-black/80 via-transparent from-transparent group-hover:to-black/65
                transition-all duration-300 absolute w-full h-full"></div>

        <div class="gradient bg-gradient-to-t to-black/60 via-transparent from-transparent group-hover:to-black/40
                transition-all duration-300 absolute w-full h-full"></div>

        <img :src="place?.photo_url" alt="Foto" class="h-72 w-full object-cover" />

        <div class="text px-4 pb-3 w-full absolute z-10 bottom-0 text-white filter drop-shadow">
            <p class="text-sm mb-1">
                <span v-if="place.open_now === true"
                    class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-600">
                    Aberto
                </span>
                <span v-else class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-500">
                    Fechado
                </span>
            </p>
            <h2 class="text-xl font-semibold mb-1 truncate">{{ place.name }}</h2>
            <p class="text-sm mb-1 text-white">
                {{ place.distance }} • {{ place.duration }}
                <i class="fas" :class="[transportIcon, 'ps-1', 'text-lg']"></i>
            </p>

            <p class="text-sm mb-1 truncate">{{ place.vicinity }}</p>
        </div>

        <div class="absolute top-0 left-0 flex p-3 text-xl drop-shadow-md">
            <i class="fas fa-star mt-0.5 text-amber-400 hover:text-amber-500"></i>
            <p class="text-gray-100 font-medium ps-1">{{ place.rating ?? '—' }}</p>
        </div>

        <div class="absolute top-0 right-0 flex p-3 text-2xl drop-shadow-md">
            <i class="far fa-heart mt-0.5 text-white hover:text-rose-500"></i>
            <!-- <i class="fas fa-heart mt-0.5 text-rose-500"></i> -->
        </div>
    </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user';

const store = useUserStore()

defineProps({
    place: {
        type: Object,
        required: true
    }
});
// Ícone baseado no modo de transporte
const transportIcon = computed(() => {
    const mode = store.user?.default_mode || 'walking';
    switch (mode) {
        case 'walking':
            return 'fa-person-walking';
        case 'bicycling':
            return 'fa-person-biking';
        case 'driving':
            return 'fa-car';
        case 'transit':
            return 'fa-bus';
        default:
            return 'fa-location-arrow';
    }
});
</script>