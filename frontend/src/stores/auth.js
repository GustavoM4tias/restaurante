import { defineStore } from 'pinia'
import api from '../services/api'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        async login(payload) {
            const { data } = await api.post('/auth/login', payload)
            this.token = data.token
            localStorage.setItem('token', data.token)
        },
        async register(payload) {
            const { data } = await api.post('/auth/register', payload)
            this.token = data.token
            localStorage.setItem('token', data.token)
        },
        async loginWithGoogle(id_token) {
            try {
                const { data } = await api.post('/auth/login/google', { id_token })
                this.token = data.token
                localStorage.setItem('token', data.token)
                return { data }
            } catch (err) {
                console.error('Erro no store loginWithGoogle:', err)
                return { data: { token: '', user: null } }
            }
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
            const userStore = useUserStore()
            userStore.$reset()
        }
    }
})
