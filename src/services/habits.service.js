import { Habits } from '../models/habits.js';

function getUserHabits(email) {
  return Habits.findAll({
    where: {
      email: email,
    },
    order: [['createdAt', 'ASC']],
  });
}

function normalize({ title, id, streak, status }) {
  return { title, id, streak, status };
}

function getHabitById(id) {
  return Habits.findOne({ where: { id } });
}

function removeHabit(id) {
  Habits.destroy({
    where: { id },
  });
}

export const habitsService = {
  getUserHabits,
  normalize,
  getHabitById,
  removeHabit,
};
