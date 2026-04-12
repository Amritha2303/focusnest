// ---------- TO DO LIST ----------

let tasks = [];

function addTask(){
let input = document.getElementById("taskInput");
if(!input) return;

let task = input.value;

if(task === "") return;

tasks.push({
text: task,
done: false
});

input.value = "";

saveTasks();
renderTasks();
}

function renderTasks(){
let list = document.getElementById("taskList");
if(!list) return;

list.innerHTML = "";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

let checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.done;

checkbox.onchange = function(){
tasks[index].done = checkbox.checked;
saveTasks();
};

let span = document.createElement("span");
span.textContent = task.text;

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.onclick = function(){
tasks.splice(index,1);
saveTasks();
renderTasks();
};

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(deleteBtn);

list.appendChild(li);

});
}

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
let stored = localStorage.getItem("tasks");

if(stored){
tasks = JSON.parse(stored);
}

renderTasks();
}

loadTasks();



// ---------- POMODORO TIMER ----------

let time = 1500;
let timer;

function startTimer(){

if(timer) return;

timer = setInterval(function(){

let display = document.getElementById("time");
if(!display) return;

let minutes = Math.floor(time / 60);
let seconds = time % 60;

display.textContent =
minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

time--;

if(time < 0){
clearInterval(timer);
timer = null;
alert("Time's up!");
}

},1000);

}

function pauseTimer(){
clearInterval(timer);
timer = null;
}

function resetTimer(){
clearInterval(timer);
timer = null;

time = 1500;

let display = document.getElementById("time");
if(display){
display.textContent = "25:00";
}
}