<!-- Profile.vue -->
<template>
    <TopReturn>Informações pessoais</TopReturn>

    <form @submit.prevent="saveChanges()">
        <div class="flex flex-col h-[calc(100vh-6.5rem)] bg-white">
            <div class="my-auto px-4">
                <Avatar class="avatar m-auto my-12 h-32 w-32" :picture="editForm.picture" :name="editForm.name" />
                <Input class="input-avatar" v-model="editForm.picture" label="Foto de perfil"
                    placeholder="Inserir url" />
                <Input v-model="editForm.name" label="Nome" placeholder="Digite seu nome" />
                <Input v-model="editForm.locale" label="Cidade" placeholder="Qual sua cidade?" />
                <Select v-model="editForm.gender" :options="generos" label="Qual seu gênero? "
                    placeholder="Selecione..." />
                <Input v-model="editForm.birthdate" type="date" label="Data de Nascimento"
                    placeholder="Quando nasceu?" />
            </div>

            <ButtonBottom type="submit" :disabled="!isSaveEnabled">
                Salvar
            </ButtonBottom>

        </div>
    </form>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import Avatar from '@/components/profile/Avatar.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import ButtonBottom from '@/components/ui/ButtonBottom.vue'
import TopReturn from '@/components/ui/TopReturnRed.vue'

const userStore = useUserStore();
const authStore = useAuthStore();
const toast = useToast();

const isLogged = computed(() => Boolean(authStore.token));
const user = computed(() => userStore.userInfo || {});

onMounted(async () => {
    if (isLogged.value) {
        try {
            await userStore.fetchUserInfo();
        } catch (err) {
            console.error('Erro ao carregar usuário:', err);
        }
    }
});

const generos = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
    { label: 'Prefiro não dizer', value: 'Prefiro não dizer' },
]

// Formulário de edição
const editForm = reactive({
    picture: '',
    name: '',
    locale: '',
    gender: '',
    birthdate: ''
});

// guardamos o original pra comparar depois
let originalForm = ref({})

// Inicializar o formulário de edição com os dados do usuário 
watch(user, (u) => {
    const formattedBirth = u.birthdate
        ? new Date(u.birthdate).toISOString().split('T')[0]
        : ''

    editForm.picture = u.picture || ''
    editForm.name = u.name || ''
    editForm.locale = u.locale || ''
    editForm.gender = u.gender || ''
    editForm.birthdate = formattedBirth

    // snapshot (clonando pra não ficar referenciando o mesmo objeto)
    originalForm.value = {
        picture: editForm.picture,
        name: editForm.name,
        locale: editForm.locale,
        gender: editForm.gender,
        birthdate: editForm.birthdate
    }
}, { immediate: true })

// Computed que diz se houve alguma modificação
const isDirty = computed(() => {
    return Object.keys(originalForm.value).some(key =>
        editForm[key] !== originalForm.value[key]
    )
})
// Computed que valida campos obrigatórios (ex: nome não pode ficar vazio)
const isValid = computed(() => {
    return editForm.name.trim().length > 0
})
// botão só habilita se o formulário for válido **e** tiver pelo menos uma mudança
const isSaveEnabled = computed(() => isDirty.value && isValid.value)

async function saveChanges() {
    // Validar formulário
    if (!editForm.name.trim()) {
        toast.error('O nome é obrigatório');
        return;
    }

    try {
        // Preparar dados para atualização
        const updateData = {
            picture: editForm.picture,
            name: editForm.name,
            locale: editForm.locale || null,
            gender: editForm.gender || null,
            birthdate: editForm.birthdate || null
        };

        // Chamar a API para atualizar o usuário
        await userStore.updateUserInfo(updateData);

        // Emitir evento de sucesso
        toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        toast.error('Erro ao atualizar perfil!');
    }
}
</script>