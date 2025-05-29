<template>
    <nav class="flex justify-center absolute top-0 left-0 h-20 z-20">
        <i class="fas fa-chevron-left text-xl text-red-500 cursor-pointer absolute left-4 p-2 top-1/2 transform -translate-y-1/2"
            @click="$router.back()"></i>
        <p class="font-medium my-auto">
            <slot />
        </p>
    </nav>
</template>