import express from 'express';
import { catchError } from '../utils/catchError.js';
import { todosController } from '../controllers/todos.controller.js';

export const todosRounter = new express.Router();

todosRounter.get('/getTodos', catchError(todosController.getTodos));
todosRounter.post('/addTodo', catchError(todosController.addTodo));
todosRounter.post('/toggleTodo', catchError(todosController.toggleTodo));
todosRounter.post('/deleteTodo', catchError(todosController.deleteTodo));
