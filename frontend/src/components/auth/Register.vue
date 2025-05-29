<template>
    <BaseInput v-model="name" placeholder="Nome" />
    <BaseInput v-model="email" placeholder="Email" />
    <BaseInput v-model="password" type="password" placeholder="Password" />

    <BaseButton @click="onRegister" :disabled="loading">
        <span v-if="loading">Registrando…</span>
        <span v-else>Register</span>
    </BaseButton>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/config/authModal'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)     // flag local de loading
const auth = useAuthStore()
const router = useRouter()
const modalStore = useModalStore()

async function onRegister() {
    if (loading.value) return
    loading.value = true
    try {
        await auth.register({
            name: name.value,
            email: email.value,
            password: password.value
        })
        router.push('/')
        modalStore.closeModal()
    } catch (err) {
        console.error('Erro ao registrar:', err.response?.status, err.response?.data)
        alert(`Falha no registro: ${err.response?.data?.error || err.message}`)
    } finally {
        loading.value = false
    }
}
</script>