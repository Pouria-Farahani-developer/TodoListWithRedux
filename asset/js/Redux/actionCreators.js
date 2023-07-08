import { addTodo, removeTodo, doTodo, getAllTodos } from "../Redux/actions.js";

function addTodoAction(title) {
  return {
    type: addTodo,
    title,
  };
}

function removeTodoAction(id) {
  return {
    type: removeTodo,
    id,
  };
}

function doTodoAction(id) {
  return {
    type: doTodo,
    id,
  };
}

function getALLTodosAction() {
  return {
    type: getAllTodos,
  };
}

export { addTodoAction, removeTodoAction, doTodoAction, getALLTodosAction };
