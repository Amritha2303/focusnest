let time = 1500;
let timer;

function startTimer() {
    const timeElement = document.getElementById("time");
    if (!timeElement) return;

    timer = setInterval(() => {
        time--;
        
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timeElement.innerText =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (time <= 0) {
            clearInterval(timer);
        }

    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    const timeElement = document.getElementById("time");
    if (!timeElement) return;

    clearInterval(timer);
    time = 1500;
    timeElement.innerText = "25:00";
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if (taskText === "") return;

    createTask(taskText);
    saveTasks();

    taskInput.value = "";
}

function createTask(taskText) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.className = "delete-btn";

    span.onclick = function() {
        span.style.textDecoration = "line-through";
        saveTasks();
    };

    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList span").forEach(task => {
        tasks.push({
            text: task.innerText,
            done: task.style.textDecoration === "line-through"
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    if (!taskList) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text);

        if (task.done) {
            let lastTask = document.querySelector("#taskList li:last-child span");
            lastTask.style.textDecoration = "line-through";
        }
    });
}

window.onload = loadTasks;