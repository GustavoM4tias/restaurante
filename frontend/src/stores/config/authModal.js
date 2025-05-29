// src/stores/authModal.js
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user'

export const useModalStore = defineStore('modal', {
    state: () => ({
        modal: false,
    }),
    actions: {
        openModal() {
            this.modal = true;
        },
        closeModal() {
            const userStore = useUserStore()
            userStore.fetchUser()
            this.modal = false;
        },
    },
});