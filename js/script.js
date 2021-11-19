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
//functions
function addTask(e) {
  if (taskInput.value === "") alert("Eneter task");
  else {
    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    taskList.appendChild(li);
    taskInput.value = "";
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
  }
  e.preventDefault(); // prevent page from being auto refresh on event 'e'
}
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    confirm("Are you sure? ");
    let ele = e.target.parentElement;
    ele.remove();
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
