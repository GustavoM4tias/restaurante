<!-- src/components/home/TransportMode.vue -->
<template>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
        class="mb-2 px-2 py-1 border rounded">
        <option value="walking">A pé</option>
        <option value="bicycling">Bicicleta</option>
        <option value="driving">Carro</option>
        <option value="transit">Transporte público</option>
    </select>
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
        required: true
    }
});

defineEmits(['update:modelValue']);
</script>