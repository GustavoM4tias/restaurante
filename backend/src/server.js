import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { PORT, CORS_ORIGINS } from './config/index.js';
import { sequelize } from './config/database.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { log } from './utils/logger.js';

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.set('trust proxy', true); // <--- ESSENCIAL

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(
    rateLimit({ windowMs: 60_000, max: 100, message: { error: 'Too many requests' } })
);

app.use(routes);

// captura 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use(errorHandler);

// Primeiro sincroniza todos os models (cria tabelas que não existem)
sequelize.sync({ force: false /* ou true, alter: true */ })
  .then(() => {
    app.listen(PORT, () => {
      log.info(`API rodando em ${CORS_ORIGINS}:${PORT}/`);
    });
  })
  .catch(err => {
    log.error('Falha ao sincronizar o DB:', err);
  });
//   force: false (padrão) → cria tabelas que não existam; não apaga nada.

//   force: true → apaga e recria todas as tabelas (útil em testes/dev, mas perigoso em produção).
  
//   alter: true → tenta ajustar o esquema para se alinhar aosx modelos (cuidado: em schemas complexos pode falhar).
