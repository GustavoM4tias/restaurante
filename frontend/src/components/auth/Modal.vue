<template>
    <div v-if="modalStore.modal" @click="close" class="fixed flex flex-col z-50 top-0 h-screen w-full bg-gray-900/40">
        <div class="relative m-auto mx-4 shadow z-50" @click.stop>
            <div class="flex">
                <p :class="{ 'bg-white': login, 'bg-gray-100': !login }" class="w-full p-1 text-center rounded-t-lg"
                    @click="onLogin()">Login</p>
                <p :class="{ 'bg-white': !login, 'bg-gray-100': login }" class="w-full p-1 text-center rounded-t-lg"
                    @click="onRegister()">Registrar</p>
            </div>
            <div class="flex flex-col justify-between bg-white rounded-b-lg p-4 gap-4">
                <Login v-if="login" />
                <Register v-else />
                <GoogleLoginButton @google-login="onGoogleLogin" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useModalStore } from '@/stores/config/authModal'
import GoogleLoginButton from '@/components/ui/GoogleLoginButton.vue'
import Login from './Login.vue'
import Register from './Register.vue'

const modalStore = useModalStore()

async function onGoogleLogin(id_token) {
    try {
        const { data } = await auth.loginWithGoogle(id_token);
        console.log(data)
        router.push('/');
        modalStore.closeModal()
    } catch (err) {
        console.error('Erro no login Google:', err);
    }
}

const login = ref(true)

const onLogin = () => {
    login.value = true;
};

const onRegister = () => {
    login.value = false;
};

const close = () => {
    modalStore.closeModal()
}

</script>