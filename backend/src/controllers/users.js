// src/controllers/users.js
import { User } from '../models/users.js';

// Atualiza todo o perfil (email, senha, roles)
export async function updateUser(req, res, next) {
    try {
        const {
            email,
            currentPassword,
            newPassword, roles,
            name, picture, locale, gender, birthdate, default_mode,
            default_lat, default_lon,
            default_radius, default_type 
        } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        if (email) user.email = email;

        // 1) Troca de senha (se solicitada)
        if (newPassword) {
            await user.changePassword(currentPassword, newPassword);
        }
        if (roles && req.user.roles.includes('admin')) {
            user.roles = roles;
        }

        // novos campos
        if (name) user.name = name;
        if (picture) user.picture = picture;
        if (locale) user.locale = locale;
        if (gender) user.gender = gender;
        if (birthdate) user.birthdate = birthdate;
        if (default_mode !== undefined) user.default_mode = default_mode;
        if (default_lat !== undefined) user.default_lat = default_lat;
        if (default_lon !== undefined) user.default_lon = default_lon;
        if (default_radius !== undefined) user.default_radius = default_radius;
        if (default_type !== undefined) user.default_type = default_type;

        await user.save();
        return res.json({
            email: user.email, roles: user.roles,
            name: user.name, picture: user.picture,
            locale: user.locale, gender: user.gender,
            birthdate: user.birthdate,
            default_mode: user.default_mode,
            default_lat: user.default_lat,
            default_lon: user.default_lon,
            default_radius: user.default_radius,
            default_type: user.default_type
        });
    } catch (err) {
        next(err);
    }
}

// Admin deleta qualquer conta
export async function deleteUser(req, res, next) {
    try {
        const count = await User.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ error: 'Usuário não encontrado' });
        return res.status(204).end();
    } catch (err) {
        next(err);
    }
}

export async function listUsers(req, res, next) {
    try {
        const users = await User.findAll({ attributes: ['id', 'google_id', 'email', 'roles', 'name', 'picture', 'locale', 'gender', 'birthdate', 'createdAt', 'last_login'] });
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function listUsersrInfo(req, res, next) {
    try {
        const users = await User.findAll({ attributes: ['id', 'google_id', 'email', 'roles', 'name', 'picture', 'locale', 'gender', 'birthdate', 'createdAt', 'last_login' /*, 'min_price', 'max_price' */] });
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function listUsersPreferences(req, res, next) {
    try {
        const users = await User.findAll({ attributes: ['id', 'google_id', 'default_mode', 'default_lat', 'default_lon', 'default_radius', 'default_type' /*, 'min_price', 'max_price' */] });
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function getAllUser(req, res, next) {
    try {
        const targetId = req.params.id ?? req.user.sub;

        const user = await User.findByPk(targetId, {
            attributes: ['id', 'google_id', 'email', 'roles', 'name', 'picture', 'locale', 'gender', 'birthdate', 'createdAt', 'last_login', 'default_mode', 'default_lat', 'default_lon', 'default_radius', 'default_type' /*, 'min_price', 'max_price' */]
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function getUserInfo(req, res, next) {
    try {
        const targetId = req.params.id ?? req.user.sub;

        const user = await User.findByPk(targetId, {
            attributes: ['id', 'google_id', 'email', 'roles', 'name', 'picture', 'locale', 'gender', 'birthdate', 'createdAt', 'last_login']
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function getUserPreferences(req, res, next) {
    try {
        const targetId = req.params.id ?? req.user.sub;

        const user = await User.findByPk(targetId, {
            attributes: ['id', 'google_id', 'default_mode', 'default_lat', 'default_lon', 'default_radius', 'default_type' /*, 'min_price', 'max_price' */]
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        next(err);
    }
}