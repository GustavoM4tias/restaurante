<template>
    <BaseInput v-model="email" placeholder="Email" />
    <BaseInput v-model="password" type="password" placeholder="Password" />
    <BaseButton @click="onLogin">Login</BaseButton>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/config/authModal'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const modalStore = useModalStore()

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

async function onLogin() {
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
    modalStore.closeModal()
}

</script>