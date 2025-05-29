import { Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import restaurantesRoutes from './restaurante.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Eatzy backend API está rodando 🐱‍🏍' });
});

// prefixo /api/auth → login, register, etc.
router.use('/auth', authRoutes);

// prefixo /api/restaurantes → busca de restaurantes
router.use('/restaurantes', restaurantesRoutes);

// prefixo /api/users → CRUD de usuários
router.use('/users', userRoutes);

export default router;
