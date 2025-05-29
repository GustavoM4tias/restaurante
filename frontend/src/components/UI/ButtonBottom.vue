<template>
    <button :type="type" :disabled="disabled" @click="$emit('click', $event)" :class="[
        'absolute bottom-0 left-0 right-0 w-full h-12 text-white transition cursor-pointer',
        disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
    ]">
        <slot />
    </button>
</template>


<script setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['click'])
</script>
