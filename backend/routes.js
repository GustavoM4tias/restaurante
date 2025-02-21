// routes.js
import express from "express";
import { cadastrarUsuario, login, obterConta } from "./controllers/authController.js";
import { listarProdutos, criarProduto, obterProduto } from "./controllers/produtoController.js";
import { autenticar } from "./middleware/authMiddleware.js";

const router = express.Router();

// Rotas de Autenticação
router.post("/register", cadastrarUsuario);
router.post("/login", login);

// Rota protegida para obter as informações da conta do usuário logado
router.get("/account", autenticar, obterConta);

// Outras rotas de produtos...
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", obterProduto);
router.post("/produtos", autenticar, criarProduto);

export default router;
