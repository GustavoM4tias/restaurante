import { log } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
    log.error('Erro não tratado:', err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
}