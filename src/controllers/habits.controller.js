import { Habits } from '../models/habits.js';
import { habitsService } from '../services/habits.service.js';
import { jwtService } from '../services/jwt.service.js';
import { v4 as uuidv4 } from 'uuid';

const getHabits = async (req, res) => {
  const { refreshToken } = req.cookies;
  const userToken = jwtService.verifyRefresh(refreshToken);
  const habits = await habitsService.getUserHabits(userToken.email);
  habits.forEach((habit) => {
    const current = habit.lastCompleted;
    const now = new Date();

    const calcMs = now - current;
    const timeDiff = Math.floor(calcMs / (1000 * 60 * 60));
    if (timeDiff >= 1) {
      habit.status = false;
    }

    if (timeDiff >= 2) {
      habit.streak = 0;
    }

    habit.save();
  });

  res.send(habits.map(habitsService.normalize));
};

const addHabit = async (req, res) => {
  const { title } = req.body;

  const { refreshToken } = req.cookies;
  const userToken = jwtService.verifyRefresh(refreshToken);

  await Habits.create({
    id: uuidv4(),
    title,
    email: userToken.email,
    status: false,
    streak: 0,
    lastCompleted: null,
  });

  res.sendStatus(200);
};

const toggleHabit = async (req, res) => {
  const { id } = req.body;

  const habit = await habitsService.getHabitById(id);

  habit.status = !habit.status;
  const oldDate = habit.lastCompleted;
  if (habit.status) {
    habit.lastCompleted = new Date();
    habit.streak++;
  } else {
    habit.streak--;
    habit.lastCompleted = oldDate;
  }

  await habit.save();

  res.status(200).json({ message: 'Habit updated', habit });
};

const deleteHabit = async (req, res) => {
  const { id } = req.body;
  habitsService.removeHabit(id);
  res.status(204).end();
};

export const habitsController = {
  getHabits,
  addHabit,
  toggleHabit,
  deleteHabit,
};
