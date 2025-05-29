
// src/routes/users.js
import { Router } from 'express';
import {
    listUsers,
    listUsersrInfo,
    listUsersPreferences,
    getAllUser,
    getUserInfo,
    getUserPreferences,
    updateUser,
    deleteUser
} from '../controllers/users.js';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { isOwnerOrRole } from '../middlewares/permission.js';

const router = Router();

// Buscas exclusivas para admin (todos os usuarios)
router.get('/', authenticate, authorize(['admin']), listUsers); // busca todos os usuarios (todas informacoes)
router.get('/infos', authenticate, authorize(['admin']), listUsersrInfo); // busca todos os usuarios (infos)
router.get('/preferences', authenticate, authorize(['admin']), listUsersPreferences); // busca todos os usuarios (preferencias)

// Buscas exclusivas para usuario autenticado sem passar parametros id
router.get('/me', authenticate, getAllUser); 
router.get('/me/info', authenticate, getUserInfo); 
router.get('/me/preferences', authenticate, getUserPreferences); 

// Buscas exclusivas para admin (usuarios especificos)
router.get('/:id', authenticate, authorize(['admin']), getAllUser); // busca o usuario por id (todas informacoes)
router.get('/:id/info', authenticate, authorize(['admin']), getUserInfo); // busca o usuario por id (infos)
router.get('/:id/preferences', authenticate, authorize(['admin']), getUserPreferences); // busca o usuario por id (preferencias)


router.patch('/:id', authenticate, isOwnerOrRole(['admin']), updateUser); 
router.delete('/:id', authenticate, isOwnerOrRole(['admin']), deleteUser);

export default router;