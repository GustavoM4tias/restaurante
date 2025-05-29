<template>
    <Header :user="user" />

    <div class="links min-h-[calc(100vh-11rem)] flex flex-col justify-between">
        <nav class="menus text-gray-700">
            <RouterLink to="/profile/account" class="flex items-center p-4 border-b hover:bg-gray-100 relative group">
                <i class="far fa-file-lines text-3xl p-3 me-2"></i>
                <div>
                    <h2 class="text-xl">Dados da conta</h2>
                    <span class="text-gray-500 text-sm">Minhas informações da conta</span>
                </div>
            </RouterLink>
            <RouterLink to="" class="flex items-center p-4 border-b hover:bg-gray-100 relative group">
                <i class="far fa-heart text-3xl px-2 p-3 me-2"></i>
                <div>
                    <h2 class="text-xl">Favoritos</h2>
                    <span class="text-gray-500 text-sm">Meus locais favoritos</span>
                    <span
                        class="absolute right-3 p-1 px-2 rounded-full text-xs shadow-sm top-1/2 transform -translate-y-1/2 bg-amber-300 group-hover:bg-amber-400">Em
                        Breve</span>
                </div>
            </RouterLink>
            <RouterLink to="" class="flex items-center p-4 border-b hover:bg-gray-100 relative group">
                <i class="far fa-star text-3xl px-2 p-3 me-2"></i>
                <div>
                    <h2 class="text-xl">Clube Eatzy</h2>
                    <span class="text-gray-500 text-sm">Nosso clube de vantagens</span>
                    <span
                        class="absolute right-3 p-1 px-2 rounded-full text-xs shadow-sm top-1/2 transform -translate-y-1/2 bg-amber-300 group-hover:bg-amber-400">Em
                        Breve</span>
                </div>
            </RouterLink>
            <RouterLink to="" class="flex items-center p-4 border-b hover:bg-gray-100 relative group">
                <i class="fas fa-mug-hot text-3xl px-2 p-3 me-2"></i>
                <div>
                    <h2 class="text-xl">Compre-nos um café</h2>
                    <span class="text-gray-500 text-sm">Ajude nosso projeto a crescer</span>
                </div>
            </RouterLink>
        </nav>


        <div class="mt-16 text-gray-500 text-xl">
            <RouterLink to="/profile/help" class="flex items-center p-3 px-4 border-b hover:bg-gray-100">
                <i class="far fa-circle-question p-2 me-2"></i>
                <div class="flex justify-between w-full">
                    <h2 class="text-xl">Ajuda</h2><i class="fas fa-chevron-right my-auto"></i>
                </div>
            </RouterLink>
            <RouterLink to="/profile/settings" class="flex items-center p-3 px-4 border-b hover:bg-gray-100">
                <i class="fas fa-store p-2 me-1.5"></i>
                <div class="flex justify-between w-full">
                    <h2 class="text-xl">Estabelecimentos</h2><i class="fas fa-chevron-right my-auto"></i>
                </div>
            </RouterLink>
            <RouterLink to="/profile/settings" class="flex items-center p-3 px-4 border-b hover:bg-gray-100">
                <i class="fas fa-handshake p-2 pe-1 me-1.5"></i>
                <div class="flex justify-between w-full">
                    <h2 class="text-xl">Quero ser parceiro</h2><i class="fas fa-chevron-right my-auto"></i>
                </div>
            </RouterLink>
            <RouterLink to="/profile/settings" class="flex items-center p-3 px-4 border-b hover:bg-gray-100">
                <i class="fas fa-gear p-2 me-2"></i>
                <div class="flex justify-between w-full">
                    <h2 class="text-xl">Configurações</h2><i class="fas fa-chevron-right my-auto"></i>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import Header from '@/components/profile/Header.vue'

const userStore = useUserStore()
const user = computed(() => userStore.userInfo || {})

onMounted(() => userStore.fetchUserInfo())
</script>
