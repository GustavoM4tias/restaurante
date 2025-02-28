import fetch from "node-fetch";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function loadImageForRestaurant(restaurante, apiKey) {
    if (restaurante.photos && restaurante.photos.length > 0) {
        const photoReference = restaurante.photos[0].photo_reference;
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        try {
            // Faz uma requisição HEAD para verificar se a imagem está disponível
            const headResponse = await fetch(photoUrl, { method: 'HEAD' });
            if (headResponse.ok) {
                restaurante.imageUrl = photoUrl;
            } else {
                console.error("Erro HEAD para imagem de", restaurante.name);
                restaurante.imageUrl = "/noimg.jpeg";
            }
        } catch (error) {
            console.error("Erro ao carregar imagem para", restaurante.name, error);
            restaurante.imageUrl = "/noimg.jpeg";
        }
    } else {
        restaurante.imageUrl = "/noimg.jpeg";
    }
    return restaurante;
}

export const buscarRestaurantes = async (req, res) => {
    const { lat, lon, radius, type } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ msg: "Latitude e Longitude são obrigatórios." });
    }

    const effectiveRadius = radius || 3000;
    const effectiveType = type || "restaurant";
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ msg: "Chave de API do Google não configurada." });
    }

    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${effectiveRadius}&type=${effectiveType}&key=${apiKey}`;
    let allResults = [];

    try {
        // Configura o cabeçalho para resposta em chunked (se desejar enviar aos poucos)
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Transfer-Encoding", "chunked");

        while (url) {
            console.log("🌍 URL da requisição:", url);

            const response = await fetch(url);
            const data = await response.json();

            if (data.status !== "OK") {
                res.write(JSON.stringify({ status: "error", msg: "Erro ao buscar restaurantes", data }) + "\n");
                return res.end();
            }

            if (data.results.length > 0) {
                // Para cada restaurante, aguarda o carregamento da imagem antes de enviar o lote
                const loadedResults = await Promise.all(
                    data.results.map(restaurante => loadImageForRestaurant(restaurante, apiKey))
                );
                allResults = [...allResults, ...loadedResults];

                // Envia este lote já processado (com imageUrl definido) para o frontend
                res.write(JSON.stringify({ status: "OK", results: loadedResults }) + "\n");
            }

            if (data.next_page_token) {
                console.log("⏳ Aguardando token para próxima página...");
                await delay(2000); // Tempo necessário para o next_page_token ficar ativo
                url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${data.next_page_token}&key=${apiKey}`;
            } else {
                url = null;
            }
        }

        res.end();
    } catch (error) {
        console.error("[GOOGLE] Erro ao buscar restaurantes:", error);
        res.write(JSON.stringify({ status: "error", msg: "Erro ao buscar restaurantes", error: error.toString() }) + "\n");
        res.end();
    }
};
