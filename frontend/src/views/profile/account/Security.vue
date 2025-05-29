<template>
    <TopReturn>Informações de acesso</TopReturn>

    <form @submit.prevent="saveChanges()">
        <div class="flex flex-col h-[calc(100vh-6.5rem)] bg-white">
            <div class="px-4">
                <div class="py-4">
                    <h3 class="text-gray-800 text-xl font-medium">Dados de acesso</h3>
                    <p class="text-gray-500 text-sm">Usados para acessar a conta e garantir segurança</p>
                </div>

                <!-- Email -->
                <div class="relative mb-6">
                    <Input v-model="editForm.email" label="Email" placeholder="Digite seu email"
                        :disabled="isGoogleUser" @blur="errors.email = validateEmail(editForm.email)" />
                    <i v-if="isGoogleUser"
                        class="fab fa-google text-sky-500 text-xl absolute right-3 top-1/2 transform -translate-y-1/2"></i>
                    <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <div v-if="isGoogleUser" class="border-t border-gray-200">
                    <div class="py-4">
                        <h3 class="text-gray-800 text-xl font-medium">Google</h3>
                        <p class="text-gray-500 text-sm">
                            Contas google já vem com email verificado e não precisam de senhas
                        </p>
                    </div>
                </div>

                <div v-else class="border-t border-gray-200">
                    <div class="py-4">
                        <h3 class="text-gray-800 text-xl font-medium">Alterar Senha</h3>
                        <p class="text-gray-500 text-sm">
                            Garantir uma senha completa é importante para evitar vazamentos de informações
                        </p>
                    </div>

                    <!-- Senha Atual -->
                    <div class="mb-4">
                        <Input type="password" v-model="passwordForm.currentPassword" label="Senha Atual"
                            placeholder="Insira sua senha atual" @blur="errors.currentPassword = validateCurrent()" />
                        <p v-if="errors.currentPassword" class="text-red-500 text-sm mt-1">
                            {{ errors.currentPassword }}
                        </p>
                    </div>

                    <!-- Nova Senha -->
                    <div class="mb-4">
                        <Input type="password" v-model="passwordForm.newPassword" label="Nova Senha"
                            placeholder="Insira a nova senha" @blur="touched.newPassword = true" />
                        <p v-if="touched.newPassword && newPasswordErrors" class="text-red-500 text-sm mt-1">
                            {{ newPasswordErrors }}
                        </p>

                    </div>

                    <!-- Confirmar Nova Senha -->
                    <div class="mb-4">
                        <Input type="password" v-model="passwordForm.confirmPassword" label="Confirmar Nova Senha"
                            placeholder="Repita a nova senha" @blur="touched.confirmPassword = true" />
                        <p v-if="touched.confirmPassword && confirmPasswordError" class="text-red-500 text-sm mt-1">
                            {{ confirmPasswordError }}
                        </p>
                    </div>
                </div>
            </div>

            <ButtonBottom v-if="!isGoogleUser" type="submit" :disabled="!isSaveEnabled">
                Salvar
            </ButtonBottom>
        </div>
    </form>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import Input from '@/components/ui/Input.vue'
import ButtonBottom from '@/components/ui/ButtonBottom.vue'
import TopReturn from '@/components/ui/TopReturnRed.vue'

const toast = useToast()
const userStore = useUserStore()
const authStore = useAuthStore()

const isLogged = computed(() => !!authStore.token)
const user = computed(() => userStore.userInfo || {})

const editForm = reactive({ email: '' })
const passwordForm = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })

const touched = reactive({ newPassword: false, confirmPassword: false })

const errors = reactive({ email: '', currentPassword: '' })

const originalEmail = ref('')

watch(user, (u) => {
    editForm.email = u.email || ''
    originalEmail.value = editForm.email
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    touched.newPassword = false
    touched.confirmPassword = false
    errors.email = ''
    errors.currentPassword = ''
}, { immediate: true })

// Validators
const validateEmail = (v) => {
    if (!v.trim()) return 'Email é obrigatório'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(v) ? '' : 'Email inválido'
}
const validateCurrent = () => {
    if (!passwordForm.currentPassword && (passwordForm.newPassword || passwordForm.confirmPassword)) {
        return 'Senha atual é obrigatória'
    }
    return ''
}

// Password error arrays (always computed)
const newPasswordErrors = computed(() => {
    const v = passwordForm.newPassword
    if (!v) return 'Nova senha é obrigatória'
    if (v.length < 8) return 'Mínimo 8 caracteres'
    if (!/[A-Z]/.test(v)) return 'Deve conter ao menos uma letra maiúscula'
    if (!/\d/.test(v)) return 'Deve conter ao menos um número'
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(v)) return 'Deve conter ao menos um caractere especial'
    return ''
})

const confirmPasswordError = computed(() => {
    if (!passwordForm.confirmPassword) return 'Confirme a nova senha'
    if (passwordForm.confirmPassword !== passwordForm.newPassword) return 'Senhas não coincidem'
    return ''
})

// Flags
const isGoogleUser = computed(() => !!user.value.google_id)
const isEmailDirty = computed(() => !isGoogleUser.value && editForm.email !== originalEmail.value && !validateEmail(editForm.email))
const isPasswordDirty = computed(() => passwordForm.currentPassword || passwordForm.newPassword || passwordForm.confirmPassword)
const isProfileValid = computed(() => !errors.email)
const isPasswordValid = computed(() =>
    !errors.currentPassword &&
    newPasswordErrors.value.length === 0 &&
    !confirmPasswordError.value
)


const isSaveEnabled = computed(() =>
    isGoogleUser.value
        ? (isPasswordDirty.value && isPasswordValid.value)
        : ((isEmailDirty.value || isPasswordDirty.value) && isProfileValid.value && isPasswordValid.value)
)

onMounted(async () => {
    if (isLogged.value) await userStore.fetchUserInfo().catch(console.error)
})

async function saveChanges() {
    errors.email = validateEmail(editForm.email)
    errors.currentPassword = validateCurrent()
    // ensure touched to show errors
    touched.newPassword = true
    touched.confirmPassword = true
    if (!isSaveEnabled.value) return

    const payload = { email: editForm.email }
    if (passwordForm.newPassword) {
        payload.currentPassword = passwordForm.currentPassword
        payload.newPassword = passwordForm.newPassword
    }

    try {
        await userStore.updateUserInfo(payload)
        toast.success('Perfil atualizado com sucesso!')
        await userStore.fetchUserInfo()
    } catch (err) {
        const apiErrs = err.response?.data?.errors
        if (apiErrs) Object.entries(apiErrs).forEach(([f, m]) => (errors[f] = m))
        else toast.error(err.response?.data?.message || 'Erro ao salvar')
    }
}
</script>
