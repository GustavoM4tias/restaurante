<template>
    <img :src="props.picture || avatarUrl" alt="Avatar" class="w-20 h-20 rounded-full object-cover shadow-sm" />
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    picture: String,
    name: String,
});

const avatarUrl = computed(() => {
    const name = props.name || '';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
});

</script>