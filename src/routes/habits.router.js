import express from 'express';
import { habitsController } from '../controllers/habits.controller.js';
import { catchError } from '../utils/catchError.js';

export const habitsRounter = new express.Router();

habitsRounter.get('/getHabits', catchError(habitsController.getHabits));
habitsRounter.post('/addHabit', catchError(habitsController.addHabit));
habitsRounter.post('/toggleHabit', catchError(habitsController.toggleHabit));
habitsRounter.post('/deleteHabit', catchError(habitsController.deleteHabit));
