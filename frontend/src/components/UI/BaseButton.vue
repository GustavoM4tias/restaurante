<template>
    <button @click="$emit('click')" class="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        <slot />
    </button>
</template>
