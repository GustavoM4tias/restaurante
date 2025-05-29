// src/services/restaurantes.js
import fetch from 'node-fetch';
import { GOOGLE_API_KEY } from '../config/index.js';
import { log } from '../utils/logger.js';

const PHOTO_MAX_WIDTH = 400;
function makePhotoUrl(ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${PHOTO_MAX_WIDTH}` +
        `&photoreference=${ref}&key=${GOOGLE_API_KEY}`;
}

export async function buscarRestaurantesService({ lat, lon, radius, type, keyword, nextToken, mode }) {
    log.info('--- INÍCIO service buscarRestaurantes ---');

    const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const params = new URLSearchParams();
    params.set('location', `${lat},${lon}`);
    params.set('radius', String(radius));
    params.set('type', type);
    if (keyword) params.set('keyword', keyword);
    params.set('key', GOOGLE_API_KEY);
    if (nextToken) params.set('pagetoken', nextToken);

    const url = `${baseUrl}?${params.toString()}`;
    log.info(`Request → ${url}`);

    const resp = await fetch(url);
    const data = await resp.json();
    log.info(`Google retornou ${data.results?.length || 0}, next_token=${data.next_page_token}`);

    // Filtra apenas com foto e separa abertos/fechados
    const openPlaces = [];
    const closedPlaces = [];

    // ...
    (data.results || []).forEach(p => {
        if (!p.photos?.length) return;
        const formatted = {
            place_id: p.place_id,
            name: p.name,
            photo_url: makePhotoUrl(p.photos[0].photo_reference),
            rating: p.rating,
            price_level: p.price_level,
            vicinity: p.vicinity,
            open_now: p.opening_hours?.open_now ?? null,
            types: p.types
        };
        if (formatted.open_now) openPlaces.push(formatted);
        else closedPlaces.push(formatted);
    });

    const allPlaces = [...openPlaces, ...closedPlaces];
    const matrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?` +
        `origins=${lat},${lon}&destinations=${allPlaces.map(p => `place_id:${p.place_id}`).join('|')}` +
        `&mode=${mode}&key=${GOOGLE_API_KEY}`;
    log.info(`Distance Matrix URL: ${matrixUrl}`);

    const matrixResp = await fetch(matrixUrl);
    const matrixData = await matrixResp.json();

    if (matrixData.status === 'OK') {
        matrixData.rows[0]?.elements.forEach((el, i) => {
            if (el.status === 'OK') {
                allPlaces[i].distance = el.distance.text;
                allPlaces[i].duration = el.duration.text;
            }
        });
    } else {
        log.warn('Distance Matrix API falhou:', matrixData.status);
    }

    log.info(`Filtrados fotos: abertos=${openPlaces.length}, fechados=${closedPlaces.length}`);
    log.info('--- FIM service buscarRestaurantes ---');

    return {
        places: [...openPlaces, ...closedPlaces],
        nextPageToken: data.next_page_token || null
    };
}

export async function buscarDetalhesService({ placeId }) {
    const fields = [
        'name', 'formatted_address', 'formatted_phone_number', 'geometry',
        'opening_hours', 'photos', 'website', 'rating', 'price_level', 'reviews', 'types', 'url'
    ].join(',');
    const params = new URLSearchParams({ place_id: placeId, fields, key: GOOGLE_API_KEY });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?${params}`;
    log.info(`→ DETAILS REQUEST: ${url}`);

    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== 'OK') {
        const err = new Error(data.status);
        err.status = 502;
        throw err;
    }

    const p = data.result;
    return {
        place_id: p.place_id,
        name: p.name,
        address: p.formatted_address,
        phone: p.formatted_phone_number,
        location: p.geometry.location,
        opening_hours: p.opening_hours,
        website: p.website,
        rating: p.rating,
        price_level: p.price_level,
        types: p.types,
        reviews: p.reviews,
        url: p.url,
        photos: (p.photos || []).map(ph => makePhotoUrl(ph.photo_reference))
    };
}
