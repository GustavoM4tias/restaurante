// src/models/users.js
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

export class User extends Model {
  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  async changePassword(currentPasswod, newPassword) {
    if (!currentPasswod) {
      const err = new Error('É preciso informar a senha atual para alterá-la.');
      err.status = 400;
      throw err;
    }
    const ok = await this.checkPassword(currentPasswod);
    if (!ok) {
      const err = new Error('Senha atual incorreta.');
      err.status = 401;
      throw err;
    }
    this.password_hash = newPassword;
    await this.save();               // gatilha o hook beforeUpdate para re‐hashear
  }
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  google_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    comment: 'sub do Google para este usuário'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'URL da foto do Google ou do usuário'
  },
  locale: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: ['user'],
  },
  gender: { type: DataTypes.STRING, allowNull: true },
  birthdate: { type: DataTypes.DATE, allowNull: true },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  default_mode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'walking',
  },
  default_lat: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  default_lon: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  default_radius: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2000,
  },
  default_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'restaurant',
  },
  // min_price: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0,
  //   validate: { min: 0, max: 4 },
  // },
  // max_price: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   defaultValue: 4,
  //   validate: { min: 0, max: 4 },
  // },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  hooks: {
    beforeCreate: async (user) => {
      user.password_hash = await bcrypt.hash(user.password_hash, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password_hash')) {
        user.password_hash = await bcrypt.hash(user.password_hash, 10);
      }
    },
  }
});

export async function getUserByEmail(email) {
  return User.findOne({ where: { email } });
}
