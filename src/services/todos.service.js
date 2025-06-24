import { Todos } from '../models/todo.js';

function getUserTodos(email) {
  return Todos.findAll({
    where: {
      email: email,
    },
    order: [['createdAt', 'ASC']],
  });
}

function normalize({ title, id, status }) {
  return { title, id, status };
}

function getTodoById(id) {
  return Todos.findOne({ where: { id } });
}

function removeTodo(id) {
  Todos.destroy({
    where: { id },
  });
}

export const todosService = {
  getUserTodos,
  normalize,
  getTodoById,
  removeTodo,
};
