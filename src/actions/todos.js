import { GET_TODOS, DELETE_TODO, UPDATE_TODO, CREATE_TODO } from './type';

export const getTodos = () => ({
  type: GET_TODOS
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id: id
});

export const updateTodo = (payload) => ({
  type: UPDATE_TODO,
  update: payload
});

export const createTodo = (payload) => ({
  type: CREATE_TODO,
  create: payload
});