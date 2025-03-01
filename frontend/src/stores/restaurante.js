import { defineStore } from "pinia";

export const useRestaurantesStore = defineStore("restaurantes", {
    state: () => ({
        restaurantes: [],
        carregando: false,
        erro: false,
    }),
    actions: {
        async buscarRestaurantes(lat, lon, radius = 3000, type = "restaurant") {
            console.log("Buscando restaurantes para", lat, lon, radius, type);
            // Altere o URL para o seu endpoint backend (exemplo abaixo)
            const url = `https://restaurante-api-gules.vercel.app/api/restaurantes?lat=${lat}&lon=${lon}&radius=${radius}&type=${type}`;
            try {
                this.carregando = true;
                this.erro = false;
                // Usando a API Fetch com streaming para processar chunks
                const response = await fetch(url);
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop(); // mantém o que sobrar
                    for (const line of lines) {
                        if (line.trim() === "") continue;
                        try {
                            const chunkData = JSON.parse(line);
                            if (chunkData.status === "OK" && chunkData.results) {
                                // Adiciona os resultados recebidos ao array
                                this.restaurantes.push(...chunkData.results);
                                console.log("Novos restaurantes adicionados:", chunkData.results.length);
                            }
                        } catch (err) {
                            console.error("Erro ao processar chunk:", err);
                        }
                    }
                }
                console.log("Total de restaurantes:", this.restaurantes.length);
            } catch (error) {
                console.error("Erro ao buscar restaurantes:", error);
                this.erro = true;
            } finally {
                this.carregando = false;
            }
        },
    },
});
