import dotenv from 'dotenv';
dotenv.config();

// CORRIJA typo em process.env
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;

// Outras variáveis
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [];
