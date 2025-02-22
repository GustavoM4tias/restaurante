import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

console.log("[SERVER] Configurando rotas...");
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`[SERVER] Servidor rodando na porta ${PORT}`));
