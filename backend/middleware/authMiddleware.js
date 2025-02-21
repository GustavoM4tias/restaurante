// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

export const autenticar = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.warn("[AUTH] Acesso negado: nenhum token fornecido");
    return res.status(401).json({ msg: "Acesso negado" });
  }

  try {
    const decodificado = jwt.verify(token, jwtSecret);
    req.usuario = decodificado; // Ex: { id: 1, role: 'user' }
    console.log("[AUTH] Token verificado com sucesso:", decodificado);
    next();
  } catch (err) {
    console.error("[AUTH] Token inválido:", err);
    res.status(401).json({ msg: "Token inválido" });
  }
};
