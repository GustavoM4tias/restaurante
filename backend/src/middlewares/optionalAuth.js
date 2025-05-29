// src/middlewares/optionalAuth.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import { log } from '../utils/logger.js';

export function optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();            // sem token, segue em frente
    const token = authHeader.split(' ')[1] || authHeader;
    try {
        req.user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        log.warn('Token inválido em optionalAuth:', err.message);
        // mesmo token inválido, não cabe 401 aqui; apenas ignora
    }
    return next();
}
