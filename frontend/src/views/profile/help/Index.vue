<template>
    <TopReturn>Ajuda</TopReturn>

    <div class="text-gray-600">
        <!-- <h1 class="text-xl px-4 p-1 text-gray-900">Categorias</h1> -->
        <RouterLink to="/profile/account" class="flex items-center p-4 border-b hover:bg-gray-100">
            <i class="far fa-user text-2xl p-3 me-2"></i>
            <div>
                <h2 class="text-xl">Conta</h2>
                <span class="text-gray-400">Dados cadastrais, senha...</span>
            </div>
        </RouterLink>
        <RouterLink to="/profile" class="flex items-center p-4 border-b hover:bg-gray-100">
            <i class="far fa-file-lines text-2xl p-3 me-2"></i>
            <div>
                <h2 class="text-xl">Sobre o Eatzy</h2>
                <span class="text-gray-400">Acessoria, trabalhe conosco...</span>
            </div>
        </RouterLink>
        <RouterLink to="/profile" class="flex items-center p-4 border-b hover:bg-gray-100">
            <i class="fas fa-bag-shopping text-2xl p-2.5 me-2"></i>
            <div>
                <h2 class="text-xl">Produtos e Serviços</h2>
                <span class="text-gray-400">Conheça nossos produtos</span>
            </div>
        </RouterLink>
        <RouterLink to="/profile" class="flex items-center p-4 border-b hover:bg-gray-100">
            <i class="fas fa-scale-balanced text-2xl p-1.5 me-2"></i>
            <div>
                <h2 class="text-xl">Políticas e termos</h2>
                <span class="text-gray-400">Cancelamento, termo de uso...</span>
            </div>
        </RouterLink>
        <RouterLink to="/profile/account/security" class="flex items-center p-4 border-b hover:bg-gray-100">
            <i class="fas fa-shield-halved text-2xl p-2 me-2"></i>
            <div>
                <h2 class="text-xl">Privacidade e dados</h2>
                <span class="text-gray-400">Compartilhamento, alterar dados...</span>
            </div>
        </RouterLink>
    </div>
</template>

<script setup>
import TopReturn from '@/components/ui/TopReturnRed.vue';
</script>