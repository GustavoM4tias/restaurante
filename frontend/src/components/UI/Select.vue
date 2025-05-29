<template>
    <div class="w-full relative py-2">
        <label v-if="label" class="absolute top-0 left-2 text-sm bg-white px-0.5 text-gray-500 z-10 ">{{
            label
            }}</label>
        <div class="relative">
            <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" :disabled="disabled"
                class="appearance-none p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-100 disabled:text-gray-300">
                <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array,
        required: true,
        // expected format: [{ label: 'Opção 1', value: '1' }, ...]
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])
</script>
