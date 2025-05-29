<!-- src/components/StatusMessage.vue -->
<template>
    <div class="text-center z-30 gap-4">
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            <div class="group rounded-lg overflow-hidden shadow h-72 relative bg-gray-200 fa-fade">
            </div>
            <div class="group rounded-lg overflow-hidden shadow h-72 relative bg-gray-200 fa-fade">
            </div>
        </div>
        <div v-else-if="!allPagesLoaded && openPlacesCount === 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            <div class="group rounded-lg overflow-hidden shadow h-72 relative bg-gray-200 fa-fade">
            </div>
            <div class="group rounded-lg overflow-hidden shadow h-72 relative bg-gray-200 fa-fade">
            </div>
        </div>
        <p v-else-if="allPagesLoaded && openPlacesCount === 0 && closedPlacesCount === 0" class="text-gray-600">
            Nenhum estabelecimento encontrado.
        </p>
        <p v-else-if="allPagesLoaded" class="text-gray-600">
            Mostrando {{ openPlacesCount + closedPlacesCount }} estabelecimentos.
        </p>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            <div class="group rounded-lg overflow-hidden shadow h-72 relative bg-gray-200 fa-fade">
            </div>
            <div class="group rounded-lg overflow-hidden shadow h-72 relative bg-gray-200 fa-fade">
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    allPagesLoaded: {
        type: Boolean,
        default: false
    },
    openPlacesCount: {
        type: Number,
        required: true
    },
    closedPlacesCount: {
        type: Number,
        required: true
    }
});
</script>