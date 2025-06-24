import { client } from '../utils/db.js';
import { DataTypes } from 'sequelize';

export const Habits = client.define('habits', {
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
  streak: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
  lastCompleted: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
