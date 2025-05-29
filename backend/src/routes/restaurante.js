// src/routes/restaurantes.js
import express from 'express';
import { optionalAuth } from '../middlewares/optionalAuth.js';
import { loadUser }     from '../middlewares/loadUser.js';
import { buscarRestaurantesController, buscarDetalhesController } from '../controllers/restaurantes.js';

const router = express.Router();

router.get(
  '/',
  optionalAuth,
  loadUser,
  buscarRestaurantesController
);
 
router.get('/:id', optionalAuth, buscarDetalhesController);

export default router;