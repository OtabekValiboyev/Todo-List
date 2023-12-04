const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let newTodoText;
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) {
  showTodos();
}

// set local storage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

//time
function getTime() {
  const now = new Date();
  const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  const month_title = now.getMonth();

  fullDay.textContent = `${day}, ${months[month_title]}, ${year}`;
  hourEl.textContent = hours;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  return `${hours}:${minute}, ${day}.${month}.${year}`;
}

setInterval(getTime, 1000);

//show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick=(setCompleted(${i})) class="list-group-item d-flex justify-content-between ${
      item.complited == true ? "complated" : ""
    }">
        ${item.text}
      <div class="todo-icons">
        <span class="opacity-50 me-2">${item.time}</span>
        <img onclick=(editTodo(${i})) src="img/edit.svg" alt="edit logo" width="25" height="25">
        <img onclick=(deleteTodo(${i})) src="img/delete.svg" alt="delete logo" width="25" height="25">
      </div>
    </li>`;
  });
}

function showMessage(item, message) {
  document.getElementById(item).textContent = message;
  setTimeout(() => {
    document.getElementById(item).textContent = "";
  }, 2500);
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputMessage = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (inputMessage.length) {
    todos.push({
      text: inputMessage,
      time: getTime(),
      complited: false,
    });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please, enter some text");
  }
});

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputMessage = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (inputMessage.length) {
    todos.splice(newTodoText, 1, {
      text: inputMessage,
      time: getTime(),
      complited: false,
    });
    setTodos();
    showTodos();
    close();
  } else {
    showMessage("message-edit", "Please, enter some text");
  }
});

function deleteTodo(id) {
  const deleteTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deleteTodos;
  setTodos();
  showTodos();
}

//setCompleted
function setCompleted(id) {
  const complitedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, complited: item.complited == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = complitedTodos;
  setTodos();
  showTodos();
}

closeEl.addEventListener("click", close);
overlay.addEventListener("click", close);

window.addEventListener("keydown", (e) => {
  if (e.which == 27) {
    close();
  }
});

function editTodo(id) {
  open(id);
  newTodoText = id;
}

function open(id) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
