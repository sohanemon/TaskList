// default ui element
let form = document.querySelector("#task_form");
let taskList = document.querySelector("#tasks");
let clearBtn = document.querySelector("#clear_task_btn");
let filter = document.querySelector("#task_filter");
let taskInput = document.querySelector("#new_task");

//define event listener
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", removeAllTask);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", loadTask);
//functions
function addTask(e) {
  if (taskInput.value === "") alert("Eneter task");
  else {
    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    taskList.appendChild(li);
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    storeTaskInLS(taskInput.value);
    taskInput.value = "";
  }
  e.preventDefault(); // prevent page from being auto refresh on event 'e'
}
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    confirm("Are you sure? ");
    let li = e.target.parentElement;
    let items = li.childNodes;
    try {
      removeTaskInLS(li);
    } catch (err) {
    } finally {
      li.remove();
    }
  }
}
function removeAllTask(e) {
  taskList.innerHTML = "";
}
function filterTask(e) {
  let text = filter.value.toLowerCase();
  document.querySelectorAll(".list-item").forEach((task) => {
    if (task.textContent.indexOf(text) != -1) {
      task.style.display = "block";
    } else task.style.display = "none";
  });
  console.log(text);
  e.preventDefault;
}

//Local Storage
function storeTaskInLS(task) {
  let fntasks;
  if (localStorage.getItem("tasks") === null) {
    fntasks = [];
  } else {
    fntasks = JSON.parse(localStorage.getItem("tasks"));
  }
  fntasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(fntasks));
}
function loadTask() {
  let fntasks;
  if (localStorage.getItem("tasks") === null) {
    fntasks = [];
  } else {
    fntasks = JSON.parse(localStorage.getItem("tasks"));
  }
  fntasks.forEach((oldtask) => {
    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.appendChild(document.createTextNode(oldtask + " "));
    taskList.appendChild(li);
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
  });
}
function removeTaskInLS(taskItem) {
  let fntasks;
  if (localStorage.getItem("tasks") === null) {
    fntasks = [];
  } else {
    fntasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let li = taskItem;
  li.removeChild(li.lastChild);
  fntasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      fntasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(fntasks));
}
