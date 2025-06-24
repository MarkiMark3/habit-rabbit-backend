import { client } from '../utils/db.js';
import { DataTypes } from 'sequelize';

export const Todos = client.define('todos', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
});
