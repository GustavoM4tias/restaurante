import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

export const autenticar = (req, res, next) => {
  const tokenHeader = req.header("Authorization");
  if (!tokenHeader) {
    console.warn("[AUTH] Acesso negado: nenhum token fornecido");
    return res.status(401).json({ msg: "Acesso negado" });
  }

  const token = tokenHeader.startsWith("Bearer ") ? tokenHeader.slice(7).trim() : tokenHeader;

  try {
    const decodificado = jwt.verify(token, jwtSecret);
    req.usuario = decodificado;
    console.log("[AUTH] Token verificado com sucesso:", decodificado);
    next();
  } catch (err) {
    console.error("[AUTH] Token inválido:", err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: "Token expired" });
    }
    res.status(401).json({ msg: "Token inválido" });
  }
};




