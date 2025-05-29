<template>
    <TopReturn>Dados da conta</TopReturn>

    <div class="text-gray-600">
        <RouterLink to="/profile/account/personal" class="flex items-center px-5 py-4 border-b hover:bg-gray-100">
            <div class="flex justify-between w-full">
                <div>
                    <h2 class="text-lg truncate">Informações pessoais e contato</h2>
                    <span class="text-gray-400 text-sm truncate">Preencha seus detalhes</span>
                </div>
            </div>
            <i class="fas fa-chevron-right my-auto"></i>
        </RouterLink>
        <RouterLink to="/profile/account/security" class="flex items-center px-5 py-4 border-b hover:bg-gray-100">
            <div class="flex justify-between w-full">
                <div>
                    <h2 class="text-lg truncate">Informações de acesso</h2>
                    <span class="text-gray-400 text-sm truncate">Email senha e segurança...</span>
                </div>
                <i class="fas fa-chevron-right my-auto"></i>
            </div>
        </RouterLink>
        <RouterLink to="" class="flex items-center px-5 py-4 border-b hover:bg-gray-100">
            <div class="flex justify-between w-full relative">
                <div>
                    <h2 class="text-lg truncate">Aúncios e Propagandas</h2>
                    <span class="text-gray-400 text-sm truncate">Gerencie suas permissões</span>
                </div>
                <!-- <i class="fas fa-chevron-right my-auto"></i> Aparece somente quando houver redirecionamento -->
                <span
                    class="absolute right-3 p-1 px-2 rounded-full text-xs shadow-sm top-1/2 transform -translate-y-1/2 bg-amber-300 group-hover:bg-amber-400">Em
                    Breve</span>
            </div>
        </RouterLink>
    </div>

</template>

<script setup>
import TopReturn from '@/components/ui/TopReturnRed.vue';
</script>