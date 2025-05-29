<!-- src/components/Input.vue -->
<template>
    <div class="relative py-2">
        <label class="absolute top-0 left-2 text-sm bg-white px-0.5 text-gray-500">
            {{ label }}
        </label>
        <input :type="type" :placeholder="placeholder" :value="modelValue" :disabled="disabled"
            @input="!disabled && $emit('update:modelValue', $event.target.value)" @blur="$emit('blur', $event)"
            class="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-white disabled:text-gray-300" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    type: { type: String, default: 'text' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
</script>
