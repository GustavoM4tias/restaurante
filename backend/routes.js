import express from "express";
import { cadastrarUsuario, login, obterConta, editarConta } from "./controllers/authController.js";
import { buscarRestaurantes } from "./controllers/googleController.js";
import { autenticar } from "./middleware/authMiddleware.js";

const router = express.Router();

// Rotas de Autenticação
router.post("/register", cadastrarUsuario);
router.post("/login", login);
router.get("/account", autenticar, obterConta);
router.put("/account", autenticar, editarConta);

// Nova rota para buscar restaurantes via Google Places
router.get("/restaurantes", buscarRestaurantes);

export default router;
