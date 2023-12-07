const todoListEl = document.querySelector("#todo-list");
const todoInputEl = document.querySelector("#todo-input");
const todoFormEl = document.querySelector("#todo-form");

const state = {
  taskName: "",
  tasks: [
    {
      id: "todo-0",
      name: "Love my self"
    }
  ]
};

function init() {
  todoInputEl.addEventListener("change", handleInputChange);
  todoFormEl.addEventListener("submit", handleFormSubmit);
  renderInput();
  renderTodoList();
}

function renderInput() {
  todoInputEl.value = state.taskName;
}

function renderTodoList() {
  const frag = document.createDocumentFragment();

  state.tasks.forEach((task) => {
    // create task element
    const item = createTaskEl(task.id, task.name);
    frag.appendChild(item);
  });

  // clear todo list
  while (todoListEl.firstChild) {
    todoListEl.removeChild(todoListEl.firstChild);
  }

  todoListEl.appendChild(frag);
}

function createTaskEl(id, name) {
  const item = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = name;

  item.id = id;
  item.appendChild(span);
  item.appendChild(createTaskDeleteEl(id));

  return item;
}

function createTaskDeleteEl(id) {
  const button = document.createElement("button");

  button.textContent = "Delete";
  button.setAttribute("type", "button");
  button.addEventListener("click", handleTaskDeleteButtonClick.bind(null, id));

  return button;
}

function handleTaskDeleteButtonClick(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  renderTodoList();
}

function handleInputChange(e) {
  state.taskName = e.target.value;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const newItem = createTask(state.taskName);

  state.tasks = [...state.tasks, newItem];

  state.taskName = "";

  renderInput();
  renderTodoList();
}

function createTask(name) {
  return {
    id: generateUniqueId("todo"),
    name
  };
}

function generateUniqueId(prefix = "prefix") {
  return prefix + "-" + Math.floor(Math.random() * Date.now());
}

document.addEventListener("DOMContentLoaded", init);