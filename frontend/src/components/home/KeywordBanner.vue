<script setup>
defineProps({
    keywordsBanner: Array
});

defineEmits(['select-keyword']);
</script>

<template>
    <div class="flex flex-col gap-2">
        <!-- Linha superior com os 2 primeiros -->
        <div class="flex gap-2">
            <button v-for="keyword in keywordsBanner.slice(0, 2)" :key="keyword.value"
                @click="$emit('select-keyword', keyword)"
                class="h-28 w-full relative rounded-xl flex group bg-gray-100 shadow-sm hover:shadow hover:-translate-y-0.5 duration-300">
                <div :class="[keyword.padding, 'flex', 'h-full', 'z-20']">
                    <img :src="keyword.image"
                        class="img w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p class="text-sm text-gray-600 absolute bottom-0 right-0 py-1 pe-2 group-hover:text-gray-700">{{
                    keyword.label
                    }}</p>
            </button>
        </div>

        <!-- Linha inferior com os restantes -->
        <div class="flex gap-2">
            <button v-for="keyword in keywordsBanner.slice(2)" :key="keyword.value"
                @click="$emit('select-keyword', keyword)"
                class="h-16 w-full relative rounded-lg flex group bg-gray-100 shadow-sm hover:shadow hover:-translate-y-0.5 duration-300">
                <div :class="[keyword.padding, 'flex', 'h-full', 'z-20']">
                    <img :src="keyword.image"
                        class="img w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p class="text-xs text-gray-600 absolute bottom-0 right-0 py-1 pe-2 group-hover:text-gray-700">{{
                    keyword.label }}</p>
            </button>
        </div>
    </div>
</template>

<style scoped>
.img {
    filter: drop-shadow(6px 6px 0px rgba(0, 0, 0, .2));
}
</style>
