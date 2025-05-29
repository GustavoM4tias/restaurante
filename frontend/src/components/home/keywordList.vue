<!-- KeywordList.vue -->
<script setup>
import KeywordCard from '@/components/home/KeywordCard.vue';
defineProps({
  keywords: Array
});
defineEmits(['select-keyword']);
</script>

<template>
  <div class="overflow-x-auto scroll-wrapper ps-4 pb-2">
    <KeywordCard :keywords="keywords" @select-keyword="(kw) => $emit('select-keyword', kw)" />
  </div>
</template>

<style scoped>
.scroll-wrapper {
  overflow-x: auto;
  scrollbar-width: none;
  /* Firefox */
}

.scroll-wrapper::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari */
}
</style>
