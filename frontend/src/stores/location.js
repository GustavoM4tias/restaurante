// src/stores/location.js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useLocationStore = defineStore('location', {
    state: () => ({
        lat: null,
        lon: null,
        permission: 'prompt',   // 'granted' | 'denied' | 'prompt'
        error: null,
        timerId: null,
    }),
    actions: {
        // chama no mounted da aplicação / página
        async init() {
            if (!navigator.geolocation) {
                this.error = 'Geolocalização não suportada pelo navegador'
                return
            }

            // observa mudanças no estado de permissão
            const perm = await navigator.permissions.query({ name: 'geolocation' })
            this.permission = perm.state
            perm.onchange = () => { this.permission = perm.state }

            // tenta obter localização imediatamente
            try {
                await this.requestLocation()
            } catch (err) {
                this.error = err.message || 'Erro ao solicitar localização'
                // tenta de novo em 30s se negado ou erro
                setTimeout(() => this.init(), 30000)
                return
            }

            // agenda nova leitura a cada 10 minutos
            this.startInterval()
        },

        // dispara getCurrentPosition para obter coords
        requestLocation() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        this.lat = pos.coords.latitude
                        this.lon = pos.coords.longitude
                        this.error = null
                        this._syncProfile()
                        resolve()
                    },
                    err => reject(err),
                    { enableHighAccuracy: true, timeout: 10000 }
                )
            })
        },

        // inicia intervalo de 10 minutos para atualizar localização
        startInterval() {
            if (this.timerId) clearInterval(this.timerId)
            // 10 minutos = 600000 ms
            this.timerId = setInterval(() => {
                this.requestLocation().catch(e => {
                    console.warn('[LocationStore] erro ao atualizar localização:', e)
                })
            }, 600000)
        },

        stopInterval() {
            if (this.timerId) {
                clearInterval(this.timerId)
                this.timerId = null
            }
        },

        // envia lat/lon para o perfil do usuário
        async _syncProfile() {
            const userStore = useUserStore()
            if (userStore.userInfo?.id) {
                try {
                    await userStore.updateUserInfo({
                        default_lat: this.lat,
                        default_lon: this.lon,
                    })
                } catch (e) {
                    console.error('[LocationStore] falha ao atualizar perfil:', e)
                }
            }
        },
    },
})
