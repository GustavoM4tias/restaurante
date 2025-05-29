import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import { log } from '../utils/logger.js';

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        log.warn('Nenhum token fornecido');
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1] || authHeader;
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        log.error('Token inválido:', err.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}