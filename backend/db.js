import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // Carrega variáveis de ambiente do `.env`

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "12345678",
  database: process.env.DB_NAME || "restaurante",
});

connection.connect((err) => {
  if (err) {
    console.error("[DB] Erro ao conectar no MySQL:", err);
  } else {
    console.log("[DB] Conectado ao MySQL!");
  }
});

export default connection;
