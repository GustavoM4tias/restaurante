// src/middlewares/loadUser.js
import { User } from '../models/users.js';

export async function loadUser(req, res, next) {
  if (!req.user?.sub) return next();

  try {
    const user = await User.findByPk(req.user.sub, {
      attributes: [
        'id','roles',
        'default_lat','default_lon',
        'default_radius','default_type'
      ]
    });
    if (!user) return next();

    req.user = {
      id:            user.id,
      roles:         user.roles,
      default_lat:   user.default_lat,
      default_lon:   user.default_lon,
      default_radius:user.default_radius,
      default_type:  user.default_type
    };
    next();
  } catch (err) {
    next(err);
  }
}
