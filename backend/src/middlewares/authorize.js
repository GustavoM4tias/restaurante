// middlewares/authorize.js
export function authorize(allowedRoles = []) {
    return (req, res, next) => {
        const roles = req.user.roles || [];
        const hasRole = roles.some(r => allowedRoles.includes(r));
        if (!hasRole) {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        next();
    };
}
