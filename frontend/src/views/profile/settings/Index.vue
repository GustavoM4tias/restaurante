<template>
    <TopReturn>Configurações</TopReturn>

    <div class="text-gray-600">
        <RouterLink to="/profile/settings/version" class="flex items-center p-5 border-b hover:bg-gray-100">
            <div class="flex justify-between w-full">
                <h2 class="text-xl">Sobre esta versão</h2><i class="fas fa-chevron-right my-auto"></i>
            </div>
        </RouterLink>
        <a @click="onLogout()" class="flex items-center p-5 border-b hover:bg-gray-100">
            <div class="flex justify-between w-full">
                <h2 class="text-xl">Sair</h2><i class="fas fa-chevron-right my-auto"></i>
            </div>
        </a>
    </div>
</template>

<script setup>
import TopReturn from '@/components/ui/TopReturnRed.vue';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function onLogout() {
    auth.logout()
    router.push('/')
}
</script>