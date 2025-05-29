// src/stores/user.js
import { defineStore } from 'pinia'
import api from '../services/api'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        userInfo: null,
        userPreferences: null,
        isInitialized: false
    }),
    actions: {
        async fetchUser() {
            try {
                const { data } = await api.get('/users/me');
                this.user = data;
                // console.log(data)
            } catch {
                this.user = null;
            } finally {
                this.isInitialized = true;
            }
        },
        async fetchUserInfo() {
            const { data } = await api.get('/users/me/info');
            this.userInfo = data;
            // console.log(data)
        },
        async fetchUserPreferences() {
            const { data } = await api.get('/users/me/preferences');
            this.userPreferences = data;
            // console.log(data)
        },
        async updateUser(payload) {
            // payload deve conter só campos que vieram do form
            const { data } = await api.patch(`/users/${this.user.id}`, payload)
            console.log('update para', this.user.id, 'e', payload)
            this.user = { ...this.user, ...data }
            return data
        },
        async updateUserInfo(payload) {
            // payload deve conter só campos que vieram do form
            const { data } = await api.patch(`/users/${this.userInfo.id}`, payload)
            console.log('update para', this.userInfo.id, 'e', payload)
            this.user = { ...this.user, ...data }
            return data
        },
        async updateUsePreferences(payload) {
            // payload deve conter só campos que vieram do form
            const { data } = await api.patch(`/users/${this.userPreferences.id}`, payload)
            this.user = { ...this.user, ...data }
            return data
        }
    }
}) 