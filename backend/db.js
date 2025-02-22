import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente do `.env`

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345678',
  database: process.env.DB_NAME || 'restaurante',
  waitForConnections: true,  // Espera por conexões disponíveis
  connectionLimit: 10, // Número máximo de conexões simultâneas
  queueLimit: 0 // Limite da fila de conexões
});

// Exemplo de uso de pool
pool.query('SELECT * FROM usuarios', (err, results) => {
  if (err) {
    console.error('[DB] Erro na consulta:', err);
  } else {
    console.log('[DB] Dados:', results);
  }
});

export default pool;
