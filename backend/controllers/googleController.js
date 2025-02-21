import fetch from "node-fetch";

export const buscarRestaurantes = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ msg: "Latitude e Longitude são obrigatórios." });
    }

    const radius = 3000;
    const type = "restaurant";
    const apiKey = process.env.GOOGLE_API_KEY; // Certifique-se de configurar sua variável de ambiente

    if (!apiKey) {
        return res.status(500).json({ msg: "Chave de API do Google não configurada." });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=${type}&key=${apiKey}`;
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
