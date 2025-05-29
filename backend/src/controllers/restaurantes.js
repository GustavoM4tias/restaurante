// src/controllers/restaurantes.js
import { buscarRestaurantesService, buscarDetalhesService } from '../services/restaurantes.js';
import { log } from '../utils/logger.js';

// Cache simples em memória: chave => { places, nextPageToken, timestamp }
const cache = new Map();
// TTL para cache padrão (sem keyword) em ms (ex.: 10 minutos)
const DEFAULT_TTL = 10 * 60 * 1000;

function makeCacheKey({ lat, lon, radius, type, keyword, nextToken }) {
  // keyword vazio => padrão do sistema
  const key = [lat, lon, radius, type, keyword || 'DEFAULT', nextToken || 'START'].join('|');
  return key;
}

export async function buscarRestaurantesController(req, res, next) {
  try {
    log.info('=== INÍCIO /restaurantes ===');

    const mode = req.query.mode || 'walking'; // walking (padrão), bicycling, driving, transit
    const isLogged = Boolean(req.user?.default_lat);
    const lat = isLogged ? req.user.default_lat : parseFloat(req.query.lat);
    const lon = isLogged ? req.user.default_lon : parseFloat(req.query.lon);
    const radius = isLogged ? req.user.default_radius : parseInt(req.query.radius, 10);
    const type = 'restaurant'; // fixo
    const keyword = req.query.keyword?.trim() || '';
    const nextToken = req.query.nextToken;

    log.info(`Params → lat:${lat}, lon:${lon}, radius:${radius}, keyword:${keyword}, nextToken:${nextToken}`);

    if ([lat, lon, radius].some(v => v == null || isNaN(v))) {
      return res.status(400).json({ error: 'Parâmetros inválidos ou faltando' });
    }

    const cacheKey = makeCacheKey({ lat, lon, radius, type, keyword, nextToken });
    const isDefaultQuery = !keyword;
    const now = Date.now();

    // Verifica cache
    if (cache.has(cacheKey)) {
      const entry = cache.get(cacheKey);
      if (!entry.nextPageToken && isDefaultQuery && now - entry.timestamp < DEFAULT_TTL) {
        log.info('Retornando do cache padrão');
        return res.json({ 
          places: entry.places,
          nextPageToken: entry.nextPageToken 
        });
      }
      if (keyword) {
        log.info('Retornando do cache para keyword');
        return res.json({ 
          places: entry.places,
          nextPageToken: entry.nextPageToken 
        });
      }
    }

    log.info('Chamando service buscarRestaurantesService...');
    const { places, nextPageToken } = await buscarRestaurantesService({ 
      lat, lon, radius, type, keyword, nextToken, mode
    });
    log.info(`Service retornou ${places.length} lugares; nextPageToken=${nextPageToken}`);

    // Salva no cache se padrão ou keyword
    cache.set(cacheKey, { places, nextPageToken, timestamp: now });

    log.info('=== FIM /restaurantes ===');
    res.json({ places, nextPageToken });
  } catch (err) {
    log.error('Erro em buscarRestaurantesController:', err);
    next(err);
  }
}

export async function buscarDetalhesController(req, res, next) {
  try {
    const detalhes = await buscarDetalhesService({ placeId: req.params.id });
    res.json(detalhes);
  } catch (err) {
    log.error('Erro em buscarDetalhesController:', err);
    res.status(err.status || 500).json({ error: err.message });
  }
}