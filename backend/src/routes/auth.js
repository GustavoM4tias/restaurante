import { Router } from 'express';
import { register, login, loginWithGoogle } from '../controllers/auth.js'; 

const router = Router();

router.post('/login', login);
router.post('/register', register);

// novo endpoint para Google
router.post('/login/google', loginWithGoogle)

export default router;
