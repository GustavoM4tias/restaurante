import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "segredo";
export const saltRounds = 10;
console.log("[CONFIG] Configurações carregadas. jwtSecret:", jwtSecret, "saltRounds:", saltRounds);
