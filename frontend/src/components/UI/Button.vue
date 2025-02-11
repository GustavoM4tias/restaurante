<!-- src/components/UI/Button.vue -->
<template>
    <button :type="type" :disabled="disabled"
        class="px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none w-full"
        :class="computedClass" @click="$emit('click', $event)">
        <slot></slot>
    </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    type: { type: String, default: "button" },
    disabled: { type: Boolean, default: false },
    variant: { type: String, default: "primary" } // primary, secondary, success, danger
});

const computedClass = computed(() => {
    switch (props.variant) {
        case "primary":
            return "bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-800";
        case "secondary":
            return "bg-gray-500 dark:bg-gray-700 text-white hover:bg-gray-600 dark:hover:bg-gray-800";
        case "success":
            return "bg-green-500 dark:bg-green-700 text-white hover:bg-green-600 dark:hover:bg-green-800";
        case "danger":
            return "bg-red-500 dark:bg-red-700 text-white hover:bg-red-600 dark:hover:bg-red-800";
        default:
            return "bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-800";
    }
});
</script>