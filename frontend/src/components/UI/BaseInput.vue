<!-- src/components/BaseInput.vue -->
<template>
    <input :type="type" :placeholder="placeholder" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" class="p-2 border rounded w-full" />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: String,
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
</script>