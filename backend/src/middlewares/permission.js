
// src/middlewares/permission.js

/**
 * Middleware para verificar se o usuário é o dono do recurso ou possui alguma role permitida.
 * @param {string[]} roles - lista de roles que também têm permissão (opcional).
 */
export function isOwnerOrRole(roles = []) {
    return (req, res, next) => {
        const userId = String(req.user.sub || req.user.id);
        const targetId = String(req.params.id);

        // Se for o próprio usuário
        if (userId === targetId) {
            return next();
        }

        // Se tiver alguma role permitida
        const userRoles = Array.isArray(req.user.roles) ? req.user.roles : [];
        const hasRole = roles.some(role => userRoles.includes(role));
        if (hasRole) {
            return next();
        }

        return res.status(403).json({ error: 'Acesso negado' });
    };
}