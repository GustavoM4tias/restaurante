// controllers/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET, GOOGLE_CLIENT_ID } from '../config/index.js';
import { OAuth2Client } from 'google-auth-library';
import { getUserByEmail } from '../models/users.js'; // função que busca no DB
import { User } from '../models/users.js';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user || !(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Atualiza último login
        user.last_login = new Date();
        await user.save();

        const token = jwt.sign(
            { sub: user.id, roles: user.roles },
            JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.json({ token });
    } catch (err) {
        next(err);
    }
}

export async function register(req, res, next) {
  try {
    const {
      name, email, password,
      roles, picture, locale, gender, birthdate,
      default_lat, default_lon, default_radius, default_type
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Os campos name, email e password são obrigatórios'
      });
    }

    const user = await User.create({
      email,
      password_hash: password,
      roles,
      name, picture, locale, gender, birthdate,
      default_lat, default_lon, default_radius, default_type
    });

    const token = jwt.sign(
      { sub: user.id, roles: user.roles },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      token,
      user: {
        id:           user.id,
        email:        user.email,
        roles:        user.roles,
        name:         user.name,
        picture:      user.picture,
        locale:       user.locale,
        gender:       user.gender,
        birthdate:    user.birthdate,
        default_lat:  user.default_lat,
        default_lon:  user.default_lon,
        default_radius: user.default_radius,
        default_type:   user.default_type,
        createdAt:    user.createdAt
      }
    });
  } catch (err) {
    console.error('REGISTER ERROR →', err);

    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({
        error:   'Dados inválidos',
        details: err.errors.map(e => e.message)
      });
    }
    // Se cair aqui, é outro tipo de erro
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// controllers/auth.js
export async function loginWithGoogle(req, res) {
  try {
    // 1) Obter token de duas possíveis props
    const idToken = req.body.id_token || req.body.credential
    if (!idToken) {
      return res.status(400).json({ error: 'id_token ou credential é obrigatório' })
    }

    // 2) Verificar o token com Google
    let ticket
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID
      })
    } catch (err) {
      console.error('Erro ao verificar idToken:', err)
      return res.status(401).json({ error: 'Token inválido ou expirado' })
    }

    // 3) Extrair payload e aplicar valores padrão
    const payload = ticket.getPayload() || {}
    const {
      sub,
      email,
      name = '',
      picture = null,
      locale = null
    } = payload

    if (!email) {
      return res.status(400).json({ error: 'Email não encontrado no payload do token' })
    }

    // 4) Encontrar ou criar usuário
    let user = await User.findOne({ where: { email } })
    if (!user) {
      user = await User.create({
        email,
        google_id: sub,
        name,
        picture,
        locale,
        password_hash: bcrypt.hashSync(Math.random().toString(36), 10),
        roles: ['user']
      })
    } else {
      // Sincronizar apenas campos faltantes
      user.google_id = user.google_id || sub
      user.name      = user.name      || name
      user.picture   = user.picture   || picture
      user.locale    = user.locale    || locale
    }

    // 5) Atualizar último login e salvar
    user.last_login = new Date()
    await user.save()

    // 6) Gerar JWT
    const token = jwt.sign(
      { sub: user.id, roles: user.roles },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // 7) Responder com token + dados de usuário
    return res.json({
      token,
      user: {
        id:      user.id,
        email:   user.email,
        name:    user.name,
        picture: user.picture,
        roles:   user.roles
      }
    })

  } catch (err) {
    console.error('Erro no loginWithGoogle:', err)
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}


