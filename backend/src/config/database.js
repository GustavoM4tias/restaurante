import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import { DB_HOST, DB_NAME, DB_USER, DB_PASS } from './index.js';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false,      // ou uma função de log customizada
    define: {
        timestamps: true,  // createdAt e updatedAt automáticos
        underscored: true, // colunas snake_case
    },
});

// Teste de conexão
sequelize.authenticate()
    .then(() => console.log('[DB] Conectado com sucesso'))
    .catch(err => console.error('[DB] Falha ao conectar:', err));
