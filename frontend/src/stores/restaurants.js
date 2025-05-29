// src/stores/restaurants.js
import { defineStore } from 'pinia';
import api from '../services/api';
import { useAuthStore } from './auth';

export const useRestaurantsStore = defineStore('restaurants', {
    state: () => ({
        openPlaces: [],
        closedPlaces: [],
        nextPageToken: null,
        loading: false,
        allPagesLoaded: false, // controla quando todas as páginas foram carregadas
        params: { lat: null, lon: null, radius: null, type: '', keyword: '', mode: 'walking' },
        details: null,
        loadingDetails: false,
    }),

    getters: {
        isLogged: () => Boolean(useAuthStore().token),

        // Calcula os lugares a serem exibidos
        placesToDisplay() {
            if (!this.allPagesLoaded) {
                // Enquanto há páginas, mostra apenas os realmente abertos
                return this.openPlaces;
            }
            // Quando todas as páginas carregadas, mostra abertos + fechados
            return [...this.openPlaces, ...this.closedPlaces];
        }
    },

    actions: {
        async fetch(initial = false) {
            if (this.loading) return;
            this.loading = true;

            try {
                const auth = useAuthStore();
                const qs = {};

                if (initial) {
                    this.allPagesLoaded = false;
                }

                if (initial && !auth.token) {
                    const missing = ['lat', 'lon', 'radius'].filter(k => !this.params[k]);
                    if (missing.length) {
                        console.warn('[Restaurants] Faltando parâmetros:', missing.join(','));
                        this.loading = false;
                        return;
                    }
                }

                // Monta query
                Object.assign(qs, this.params);
                if (!initial && this.nextPageToken) qs.nextToken = this.nextPageToken;

                console.log('[FETCH] Params enviados:', qs); // <- AQUI

                const { data } = await api.get('/restaurantes', { params: qs });

                console.log(data)

                // Filtra somente abertos explicitos (open_now === true)
                const newOpen = data.places.filter(p => p.open_now === true);
                // Filtra somente fechados (open_now === false)
                const newClosed = data.places.filter(p => p.open_now === false);

                if (initial) {
                    this.openPlaces = newOpen;
                    this.closedPlaces = newClosed;
                } else {
                    this.openPlaces.push(...newOpen);
                    this.closedPlaces.push(...newClosed);
                }

                this.nextPageToken = data.nextPageToken || null;

                if (!this.nextPageToken) {
                    this.allPagesLoaded = true;
                }

            } catch (err) {
                if (err.response?.status === 401) {
                    this.openPlaces = [];
                    this.closedPlaces = [];
                    this.nextPageToken = null;
                    this.allPagesLoaded = false;
                }
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchDetails(placeId) {
            if (this.loadingDetails) return;
            this.loadingDetails = true;
            this.details = null;
            try {
                const { data } = await api.get(`/restaurantes/${placeId}`);
                this.details = data;
            } catch (err) {
                console.error('[Restaurants] Erro ao buscar detalhes:', err);
                throw err;
            } finally {
                this.loadingDetails = false;
            }
        }
    }
});