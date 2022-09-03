// selectors
const addButton = document.querySelector(".form-button");
const todo_list = document.querySelector(".todo-list");
const todo_input = document.querySelector(".form-input");
const todo_filter = document.querySelector(".todo-filter");
const todo_remove = document.getElementById("remove-all");

// EVENT LISTENERS
addButton.addEventListener("click", addTodo);
todo_list.addEventListener("click", checkDelete);
todo_filter.addEventListener("change", filterTodo);
todo_remove.addEventListener("click", function () {
  todo_list.forEach(function (todo) {
    todo.remove();
  });
});

// FUNCTIONS
function addTodo(event) {
  event.preventDefault();

  // create todo div
  const todo = document.createElement("div");
  todo.classList.add("todo");

  //create li
  const todo_li = document.createElement("li");
  todo_li.innerText = todo_input.value;
  todo_input.value = "";
  todo.appendChild(todo_li);

  //create the 2 buttons
  const check = document.createElement("button");
  check.classList.add("check-btn");
  check.innerHTML = "<b>&checkmark;</b>";
  todo.appendChild(check);

  const delete_btn = document.createElement("button");
  delete_btn.classList.add("delete-btn");
  delete_btn.innerHTML = "<b>X</b>";
  todo.appendChild(delete_btn);

  todo_list.appendChild(todo);
}

function checkDelete(event) {
  const item = event.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("checked");
    console.log("IT'S WORKING!!!");
  }
}
function filterTodo(event) {
  console.log(event.target.value);
  const todos = todo_list.childNodes;
  todos.forEach(function (todo) {
    const myval = event.target.value;
    if (myval === "All") {
      todo.style.display = "flex";
    } else if (myval === "Completed") {
      if (todo.classList.contains("checked")) todo.style.display = "flex";
      else todo.style.display = "none";
    } else {
      if (!todo.classList.contains("checked")) todo.style.display = "flex";
      else todo.style.display = "none";
    }
  });
}
