<!-- src/components/RestaurantList.vue -->
<template>

    <div class="p-4">
        <p class="font-medium text-2xl pb-2 text-gray-700">Estabelecimentos</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RestaurantCard v-for="place in places" :key="place.place_id" :place="place" />
        </div>
    </div>
</template>

<script setup>
import RestaurantCard from './RestaurantCard.vue';

defineProps({
    places: {
        type: Array,
        required: true
    }
});
</script>