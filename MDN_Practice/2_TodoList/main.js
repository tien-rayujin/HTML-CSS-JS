const todoFormEl = document.querySelector("#todo-form");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector("#todo-list");

// utilities
function generateUniqueId(prefix = "prefix") {
  return prefix + "-" + Math.floor(Math.random() * Date.now());
}

function createTask(name) {
  return {
    id: generateUniqueId("todo"),
    name
  };
}

// state
const state = {
  taskName: "",
  tasks: [
    {
      id: "todo-0",
      name: "Introduction Client-side framework"
    }
  ]
};

function init() {
  todoInputEl.addEventListener("change", handleInputChange);
  todoFormEl.addEventListener("submit", handleFormSubmit);
  renderInput();
  renderTodoList();
}

// rendering
function renderInput() {
  todoInputEl.value = state.taskName;
}

function renderTodoList() {
  const frag = document.createDocumentFragment();

  state.tasks.forEach((task) => {
    const item = buildTodoItemEl(task.id, task.name);
    frag.appendChild(item);
  });

  // clear the todolist element (avoid duplicate previous data)
  while (todoListEl.firstChild) {
    todoListEl.removeChild(todoListEl.firstChild);
  }

  todoListEl.appendChild(frag);
}

// event handling
function handleInputChange(e) {
  state.taskName = e.target.value;
}

function handleFormSubmit(e) {
  e.preventDefault();
  state.tasks = [...state.tasks, createTask(state.taskName)];

  state.taskName = "";
  renderInput();
  renderTodoList();
}

// build element on DOM
function buildTodoItemEl(id, name) {
  const item = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = name;

  item.id = id;
  item.appendChild(span);
  item.appendChild(buildDeleteButtonEl(id));

  return item;
}

function buildDeleteButtonEl(id) {
  const button = document.createElement("button");

  button.textContent = "Delete";
  // button.type = "button";
  button.setAttribute("type", "button");
  button.addEventListener("click", handleTodoDeleteButtonClick.bind(null, id));

  return button;
}

// event handling
function handleTodoDeleteButtonClick(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  renderTodoList();
}

// when DOM at loaded state, start the init function
document.addEventListener("DOMContentLoaded", init);