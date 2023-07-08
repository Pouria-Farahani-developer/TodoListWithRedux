import {
  addTodo,
  removeTodo,
  doTodo,
  getAllTodos,
} from "../js/Redux/actions.js";

import {
  addTodoAction,
  doTodoAction,
  getALLTodosAction,
  removeTodoAction,
} from "../js/Redux/actionCreators.js";

const todoInputElem = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".todo-button");
const todosContainer = document.querySelector(".todo-list");
const todoFilteringElem = document.querySelector(".filter-todo");

// Create Todolist Reducer
function todolistReducer(state = [], action) {
  switch (action.type) {
    case addTodo: {
      let newState = [...state];
      let newTodoObj = {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false,
      };
      newState.push(newTodoObj);

      return newState;
    }
    case removeTodo: {
      const copyState = [...state];
      const newState = copyState.filter((item) => item.id !== action.id);
      return newState;
    }
    case doTodo: {
      let newState = [...state];
      newState.some((item) => {
        if (item.id == action.id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      return newState;
    }

    case getAllTodos: {
      return state;
    }

    default: {
      return state;
    }
  }
}

// Create Store
const store = Redux.createStore(todolistReducer);

const removeTodoHandler = (todoID) => {
  store.dispatch(removeTodoAction(todoID));
  let todos = store.getState();
  generateTodosInDom(todos);
};

const doTodoHandler = (todoID) => {
  store.dispatch(doTodoAction(todoID));
  let todos = store.getState();
  generateTodosInDom(todos);
};

todoFilteringElem.addEventListener("change", (e) => {
  store.dispatch(getALLTodosAction());
  let todos = store.getState();
  if (e.target.value === "all") {
    generateTodosInDom(todos);
  } else if (e.target.value === "completed") {
    let completedTodo = todos.filter((item) => item.isCompleted);
    generateTodosInDom(completedTodo);
  } else if (e.target.value === "incomplete") {
    let inCompletedTodo = todos.filter((item) => !item.isCompleted);
    generateTodosInDom(inCompletedTodo);
  }
});

addTodoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newTodoTitle = todoInputElem.value.trim();
  store.dispatch(addTodoAction(newTodoTitle));
  const todos = store.getState();
  todoInputElem.value = "";
  generateTodosInDom(todos);
});

function generateTodosInDom(todos) {
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div class="todo ${todo.isCompleted && "completed"}">
                <li class="todo-item">${todo.title}</li>
                <button class="complete-btn" onclick=doTodoHandler("${
                  todo.id
                }") >
                    <i class="fas fa-check-circle"></i>
                </button>
                <button class="trash-btn" onclick=removeTodoHandler("${
                  todo.id
                }")>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
    );
  });
}

window.removeTodoHandler = removeTodoHandler;
window.doTodoHandler = doTodoHandler;
