<script setup>
defineProps({
    keywords: Array
});

defineEmits(['select-keyword']);
</script>

<template>
    <div class="flex gap-2">
        <button v-for="keyword in keywords" :key="keyword.value" @click="$emit('select-keyword', keyword)"
            class="h-24 min-w-24 relative flex gap-2">
            <div :class="[keyword.color, 'absolute', 'h-1/2', 'w-full', 'rounded-t-lg']">
            </div>
            <div :class="[keyword.padding, 'flex', 'h-20', 'z-20', 'm-auto', 'mb-10']">
                <img :src="keyword.image" class="img w-full h-full object-cover duration-300 hover:-translate-y-0.5" />
            </div>
            <span class="absolute text-xs text-gray-500 drop-shadow-sm bottom-0 text-center w-full">
                {{ keyword.label }}
            </span>

        </button>
    </div>
</template>

<style scoped>
.img {
    filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, .15));
}

.img:hover {
    filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, .2));
}
</style>