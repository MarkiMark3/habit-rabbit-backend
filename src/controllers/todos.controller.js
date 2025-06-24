import { Todos } from '../models/todo.js';
import { jwtService } from '../services/jwt.service.js';
import { v4 as uuidv4 } from 'uuid';
import { todosService } from '../services/todos.service.js';

const getTodos = async (req, res) => {
  const { refreshToken } = req.cookies;
  const userToken = jwtService.verifyRefresh(refreshToken);
  const todos = await todosService.getUserTodos(userToken.email);

  res.send(todos.map(todosService.normalize));
};

const addTodo = async (req, res) => {
  const { title } = req.body;

  const { refreshToken } = req.cookies;
  const userToken = jwtService.verifyRefresh(refreshToken);

  await Todos.create({
    id: uuidv4(),
    title,
    email: userToken.email,
    status: false,
  });

  res.sendStatus(200);
};

const toggleTodo = async (req, res) => {
  const { id } = req.body;

  const todo = await todosService.getTodoById(id);

  todo.status = !todo.status;
  await todo.save();

  res.status(200).end();
};

const deleteTodo = async (req, res) => {
  console.log('SHITTTS');
  const { id } = req.body;
  todosService.removeTodo(id);
  res.status(204).end();
};

export const todosController = {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
};
