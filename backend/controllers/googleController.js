import fetch from "node-fetch";

export const buscarRestaurantes = async (req, res) => {
    const { lat, lon, radius, type } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ msg: "Latitude e Longitude são obrigatórios." });
    }

    // Define valores padrão caso os parâmetros não sejam passados
    const effectiveRadius = radius || 3000;
    const effectiveType = type || "restaurant";

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ msg: "Chave de API do Google não configurada." });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${effectiveRadius}&type=${effectiveType}&key=${apiKey}`;
    console.log("🌍 URL da requisição:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("📡 Dados da API:", data);

        if (data.status !== "OK") {
            return res.status(400).json({ msg: "Erro ao buscar restaurantes", data });
        }

        return res.json(data);
    } catch (error) {
        console.error("[GOOGLE] Erro ao buscar restaurantes:", error);
        return res.status(500).json({ msg: "Erro ao buscar restaurantes", error: error.toString() });
    }
};
