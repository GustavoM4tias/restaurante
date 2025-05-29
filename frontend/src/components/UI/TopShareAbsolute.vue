<template>
    <nav class="flex justify-center absolute top-0 right-0 h-20 z-20">
        <i class="fas fa-share text-xl text-red-500 cursor-pointer absolute right-4 p-2 top-1/2 transform -translate-y-1/2"
            @click="$router.back()"></i>
        <p class="font-medium my-auto">
            <slot />
        </p>
    </nav>
</template>