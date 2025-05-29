<template>
    <nav class="flex justify-center relative h-14">
        <i class="fas fa-chevron-left text-red-500 cursor-pointer absolute left-2 p-2 top-1/2 transform -translate-y-1/2"
            @click="$router.back()"></i>
        <p class="font-medium my-auto">
            <slot />
        </p>
    </nav>
</template>