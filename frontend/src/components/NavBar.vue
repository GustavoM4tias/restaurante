<template>
    <nav class="fixed bottom-0 border-t w-full flex h-16 pt-2 text-gray-700 bg-white z-30">
        <RouterLink class="w-full flex flex-col items-center my-auto gap-1" to="/">
            <i class="fas fa-home text-2xl"></i>
            <p class="text-center font-semibold text-xs">Início</p>
        </RouterLink>
        <RouterLink class="w-full flex flex-col items-center my-auto gap-1" to="/">
            <i class="fas fa-magnifying-glass text-2xl"></i>
            <p class="text-center font-semibold text-xs">Busca</p>
        </RouterLink>
        <RouterLink class="w-full flex flex-col items-center my-auto gap-1" to="/profile">
            <i class="fa-regular fa-newspaper text-2xl"></i>
            <p class="text-center font-semibold text-xs">Pedidos</p>
        </RouterLink>
        <RouterLink class="w-full flex flex-col items-center my-auto gap-1" to="/profile">
            <i class="fa-regular fa-user text-2xl"></i>
            <p class="text-center font-semibold text-xs">Perfil</p>
        </RouterLink>
        <!-- <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink> -->
    </nav>
</template>