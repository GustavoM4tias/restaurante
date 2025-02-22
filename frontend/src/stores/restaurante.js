import { defineStore } from "pinia";

export const useRestaurantesStore = defineStore("restaurantes", {
    state: () => ({
        restaurantes: [],
        carregando: false,
        erro: false,
    }),
    actions: {
        async buscarRestaurantes(lat, lon) {
            console.log("📍 Buscando restaurantes para LAT:", lat, "LON:", lon);

            // Utiliza o endpoint do backend para buscar os restaurantes
            const url = `https://restaurante-api-gules.vercel.app/api/restaurantes?lat=${lat}&lon=${lon}`;
            console.log("🌍 URL da requisição:", url);

            try {
                this.carregando = true;
                this.erro = false;
                console.log("⏳ Fazendo requisição para o backend...");

                const response = await fetch(url);
                console.log("✅ Resposta recebida, status:", response.status);

                const data = await response.json();
                console.log("📡 Dados do backend:", data);

                if (data.status !== "OK") {
                    throw new Error(`Erro ao buscar locais: ${data.status}`);
                }

                this.restaurantes = data.results;
                console.log("🍽️ Restaurantes encontrados:", this.restaurantes);
            } catch (error) {
                console.error("❌ Erro ao buscar restaurantes:", error);
                this.erro = true;
            } finally {
                this.carregando = false;
                console.log("🔄 Processo finalizado.");
            }
        },
    },
});
