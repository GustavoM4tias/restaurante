<!-- src/components/home/SearchBar.vue -->
<template>
    <nav :class="['z-40 w-full transition-all duration-300', isSticky ? 'fixed top-0' : 'relative']">
        <div class="nav p-3 relative flex justify-between">
            <div @click="toggleMenu()" to="/"
                class="text-4xl font-bold z-20 bg-gray-100 shadow-sm dark:bg-gray-700 px-2 py-1.5 rounded-full cursor-pointer">
                <i class="fas fa-burger dark:text-white text-black"></i>
            </div>

            <button
                class="text-2xl focus:outline-none transform z-20 rounded-full bg-gray-100 shadow-sm dark:bg-gray-700 px-3.5">
                <i class="far fa-bell dark:text-white text-black relative">
                    <span class="notification h-2.5 w-2.5 bg-red-500 absolute rounded-full right-0"></span>
                </i>
            </button>
        </div>

        <div :class="{ 'translate-x-0': menuOpen, '-translate-x-full': !menuOpen }"
            class="menu-hover flex fixed w-[100vw] h-[100vh] top-0 z-50 transform transition-transform duration-300 ease-in-out filter drop-shadow-md">
            <div class="bg-white dark:bg-gray-700 w-full h-full drop-shadow-lg relative">
                <div class="absolute top-0 right-0 p-3">
                    <!-- <i class="fas fa-xmark cursor-pointer text-5xl" @click="toggleMenu()"></i> -->
                </div>

                <!-- Conteúdo do menu lateral que será animado junto -->
                <div class="flex flex-col p-4 gap-4 text-black dark:text-white">
                    Filtros
                    <input :value="radius" @input="$emit('update:radius', Number($event.target.value))"
                        placeholder="Radius (m)" class="border px-2 py-1 rounded" />

                    <TransportMode :modelValue="mode" @update:modelValue="$emit('update:mode', $event)" />

                    <button @click="onSave" class="bg-blue-500 text-white px-4 py-1 rounded">
                        Salvar
                    </button>
                </div>
                <span class="text-gray-400 text-sm absolute w-full text-center bottom-0 p-2">{{ new Date().getFullYear()
                    }} &copy Eatzy</span>
            </div>
            <div class="w-4/12 flex h-full cursor-pointer" @click="toggleMenu()"></div>
        </div>


    </nav>
</template>


<script setup>
import { ref } from 'vue'
import TransportMode from '@/components/home/TransportMode.vue';

const props = defineProps({
    mode: {
        type: String,
        required: true
    },
    radius: {
        type: Number,
        default: null
    }
});

const emit = defineEmits([
    'update:lat',
    'update:lon',
    'update:radius',
    'update:keyword',
    'update:mode',
    'save'        // evento save
]);

function onSave() {
    // emite os valores atuais para o pai
    emit('save', { mode: props.mode, radius: props.radius });
}

const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const isSticky = ref(true); // por padrão, fica fixo
defineExpose({ isSticky }); // para o componente pai conseguir acessar

</script>